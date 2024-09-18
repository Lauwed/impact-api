import { toast } from "react-toastify";
import { PersonRelative } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import Modal from "../Modal";
import Tag from "../Tag";

const DeletePersonRelativeModal = ({
  relative,
  modalOpen,
  setModalOpen,
  onClose,
}: {
  relative: PersonRelative;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`/person_relatives/${relative.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.ok) {
        if (onClose) onClose();
        setModalOpen(false);
        toast.success("Deleted successfully");
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
      <Heading level="h3">Delete a relative</Heading>

      <p className="mb-4">Are you sure you want to delete this relative ?</p>
      <p className="mb-8 text-center text-sm flex items-center gap-2">
        <strong>{relative.typeRelative.name}:</strong> {relative.name}
        {relative.biological ? (
          <>
            {" "}
            - <Tag label="Biological relative" />
          </>
        ) : (
          <></>
        )}{" "}
        - {relative.source.name}
      </p>

      <div className="flex gap-4 justify-center">
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete}>Delete this relative</Button>
      </div>
    </Modal>
  );
};

export default DeletePersonRelativeModal;
