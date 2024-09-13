import { format } from "date-fns";
import { PersonSchool } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import Modal from "../Modal";

const DeletePersonSchoolModal = ({
  school,
  modalOpen,
  setModalOpen,
  onClose,
}: {
  school: PersonSchool;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`/person_schools/${school.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

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
      <Heading level="h3">Delete a school information</Heading>

      <p className="mb-4">
        Are you sure you want to delete this school inforation ?
      </p>
      <p className="mb-8 text-center text-sm">
        {school.school.name} - {school.degree}{" "}
        {school.startDate ? (
          <>
            ({format(new Date(school.startDate), "yyyy")}
            {school.endDate ? (
              <>-{format(new Date(school.endDate), "yyyy")}</>
            ) : (
              <></>
            )}
            )
          </>
        ) : (
          <></>
        )}
      </p>

      <div className="flex gap-4 justify-center">
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete}>Delete this identity school</Button>
      </div>
    </Modal>
  );
};

export default DeletePersonSchoolModal;
