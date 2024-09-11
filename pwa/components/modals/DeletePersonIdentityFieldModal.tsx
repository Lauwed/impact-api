import { useEffect } from "react";
import { IdentityFields } from "../../enums";
import { PersonIdentifyField } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import Modal from "../Modal";
import { useAuth } from "../context/auth";

const DeletePersonIdentityFieldModal = ({
  field,
  modalOpen,
  setModalOpen,
  onClose,
}: {
  field: PersonIdentifyField;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`/person_identity_fields/${field.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.ok) {
        if(onClose) onClose();
        setModalOpen(false);
      } else {
        console.error("Failed to add person");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <Heading level="h3">Delete an identity field</Heading>

      <p className="mb-4">
        Are you sure you want to delete this identity field ?
      </p>
      <p className="mb-8 text-center text-sm">
        <strong>{IdentityFields[field.typeIdentityField.name]}:</strong>{" "}
        {field.value} - {field.source.name}
      </p>

      <div className="flex gap-4 justify-center">
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete}>Delete this identity field</Button>
      </div>
    </Modal>
  );
};

export default DeletePersonIdentityFieldModal;
