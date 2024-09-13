import { format } from "date-fns";
import { PersonJob, PersonSchool } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import Modal from "../Modal";

const DeletePersonJobModal = ({
  job,
  modalOpen,
  setModalOpen,
  onClose,
}: {
  job: PersonJob;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`/person_jobs/${job.id}`, {
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
      <Heading level="h3">Delete a job information</Heading>

      <p className="mb-4">
        Are you sure you want to delete this job inforation ?
      </p>
      <p className="mb-8 text-center text-sm">
        {job.company.name} - {job.job}{" "}
        {job.startDate ? (
          <>
            ({format(new Date(job.startDate), "yyyy")}
            {job.endDate ? (
              <>-{format(new Date(job.endDate), "yyyy")}</>
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

export default DeletePersonJobModal;