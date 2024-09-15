import { PersonSocialStatus } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import Modal from "../Modal";

const DeletePersonSocialStatusModal = ({
  socialStatus,
  modalOpen,
  setModalOpen,
  onClose,
}: {
  socialStatus: PersonSocialStatus;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/person_social_statuses/${socialStatus.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.ok) {
        if (onClose) onClose();
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
      <Heading level="h3">Delete a social status</Heading>

      <p className="mb-4">
        Are you sure you want to delete this social status ?
      </p>
      <p className="mb-8 text-center text-sm">
        {socialStatus.typeSocialStatus.name}
      </p>

      <div className="flex gap-4 justify-center">
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete}>Delete this social status</Button>
      </div>
    </Modal>
  );
};

export default DeletePersonSocialStatusModal;
