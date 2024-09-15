import { useEffect, useState } from "react";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import FormControl from "../form/FormControl";
import Label from "../form/Label";
import Modal from "../Modal";
import SourcesSelector from "../selectors/SourcesSelector";
import TypeIdentityFieldsSelector from "../selectors/TypeIdentityFieldsSelector";
import AddSourceModal from "./AddSourceModal";

const AddPersonIdentityFieldModal = ({
  modalOpen,
  setModalOpen,
  personId,
  onClose,
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  personId: number;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    typeIdentityField: 1,
    value: "",
    source: -1,
  });

  useEffect(() => {
    if (!modalOpen && onClose) {
      setFormData({
        typeIdentityField: 1,
        value: "",
        source: -1,
      });

      onClose();
    }
  }, [modalOpen]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/person_identity_fields", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          source: `/sources/${formData.source}`,
          person: `/people/${personId}`,
          typeIdentityField: `/type_identity_fields/${formData.typeIdentityField}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.info("Added successfully", data);
        setModalOpen(false);
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <Heading level="h3">Add an identity information</Heading>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="typeIdentityField">Type identity field</Label>
          <TypeIdentityFieldsSelector
            value={formData.typeIdentityField}
            onChange={handleChange as () => void}
          />
        </div>

        <FormControl
          name="value"
          id="value"
          label="Value"
          value={formData.value}
          onChange={handleChange}
          required
        />

        <div className="mb-4">
          <Label htmlFor="source">Source</Label>
          <SourcesSelector
            value={formData.source}
            onChange={(value: number) => {
              setFormData((prevData) => ({
                ...prevData,
                source: value,
              }));
            }}
          />

          <div className="flex gap-4 items-center mt-2">
            <p>The source doesn't exists ?</p>
            <Button type="button" onClick={() => setIsSourceModalOpen(true)}>
              Add a source
            </Button>
          </div>
        </div>

        <Button type="submit">Add identity field</Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
        onClose={onClose}
      />
    </Modal>
  );
};

export default AddPersonIdentityFieldModal;
