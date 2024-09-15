import { useEffect, useState } from "react";
import { PersonIdentifyField, PersonRelative } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import FormControl from "../form/FormControl";
import Label from "../form/Label";
import Modal from "../Modal";
import SourcesSelector from "../selectors/SourcesSelector";
import TypeIdentityFieldsSelector from "../selectors/TypeIdentityFieldsSelector";
import AddSourceModal from "./AddSourceModal";
import TypeRelativesSelector from "../selectors/TypeRelativesSelector";

const EditPersonRelativeModal = ({
  modalOpen,
  setModalOpen,
  onClose,
  relative,
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
  relative: PersonRelative;
}) => {
  const { user } = useAuth();
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    typeRelative: relative.typeRelative.id,
    name: relative.name,
    biological: relative.biological,
    source: relative.source.id,
  });

  useEffect(() => {
    if (!modalOpen && onClose) {
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
      const response = await fetch(`/person_relatives/${relative.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          typeRelative: `/type_relatives/${formData.typeRelative}`,
          source: `/sources/${formData.source}`,
          person: relative.person,
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
      <Heading level="h3">Edit a relative information</Heading>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="typeRelative">Type relative</Label>
          <TypeRelativesSelector
            value={formData.typeRelative}
            onChange={handleChange as () => void}
            disabled
          />
        </div>

        <FormControl
          name="name"
          id="name"
          label="Value"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormControl
          name="biological"
          id="biological"
          label="Biological?"
          value={formData.biological}
          onChange={(value: boolean) => {
            setFormData((prevData) => ({
              ...prevData,
              biological: value,
            }));
          }}
          type="switch"
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

        <Button type="submit">Edit relative</Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
    </Modal>
  );
};

export default EditPersonRelativeModal;
