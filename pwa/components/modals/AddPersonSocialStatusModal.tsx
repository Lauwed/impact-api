import { useEffect, useState } from "react";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import Label from "../form/Label";
import Modal from "../Modal";
import SourcesSelector from "../selectors/SourcesSelector";
import TypeSocialStatusesSelector from "../selectors/TypeSocialStatusesSelector";
import AddSourceModal from "./AddSourceModal";
import { toast } from "react-toastify";

const AddPersonSocialStatusModal = ({
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
    typeSocialStatus: -1,
    source: -1,
  });

  useEffect(() => {
    if (!modalOpen && onClose) {
      setFormData({
        typeSocialStatus: -1,
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
      const response = await fetch("/person_social_statuses", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          source: `/sources/${formData.source}`,
          person: `/people/${personId}`,
          typeSocialStatus: `/type_social_statuses/${formData.typeSocialStatus}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.info("Added successfully", data);
        toast.success("Added successfully");
        setModalOpen(false);
      } else {
        console.error("Request failed");
        toast.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error:" + error);
    }
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <Heading level="h3">Add a social status information</Heading>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="typeSocialStatus">Type social status</Label>
          <TypeSocialStatusesSelector
            value={formData.typeSocialStatus}
            onChange={handleChange as () => void}
          />
        </div>

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

        <Button type="submit">Add social status</Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
    </Modal>
  );
};

export default AddPersonSocialStatusModal;
