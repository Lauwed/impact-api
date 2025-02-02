import { toast } from "react-toastify";
import { Achievement } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import Modal from "../Modal";

const DeleteAchievementModal = ({
  achievement,
  modalOpen,
  setModalOpen,
  onClose,
}: {
  achievement: Achievement;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`/achievements/${achievement.id}`, {
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
      <Heading level="h3">Delete an achievement</Heading>

      <p className="mb-4">Are you sure you want to delete this achievement ?</p>
      <p className="text-center text-sm">{achievement.content}</p>
      <p className="mb-8 text-center text-sm">{achievement.source.name}</p>

      <div className="flex gap-4 justify-center">
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete}>Delete this achievement</Button>
      </div>
    </Modal>
  );
};

export default DeleteAchievementModal;
