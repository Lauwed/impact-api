import { useEffect, useState } from "react";
import { Achievement } from "../../types";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import FormControl from "../form/FormControl";
import Label from "../form/Label";
import Modal from "../Modal";
import SourcesSelector from "../selectors/SourcesSelector";
import AddSourceModal from "./AddSourceModal";

const EditAchievementModal = ({
  modalOpen,
  setModalOpen,
  onClose,
  achievement,
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
  achievement: Achievement;
}) => {
  const { user } = useAuth();
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    content: achievement.content,
    source: achievement.source.id,
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
      const response = await fetch(`/achievements/${achievement.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          source: `/sources/${formData.source}`,
          person: achievement.person,
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
      <Heading level="h3">Edit an achievement</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          type="textarea"
          name="content"
          id="content"
          label="Content"
          value={formData.content}
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

        <Button type="submit">Edit achievement</Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
    </Modal>
  );
};

export default EditAchievementModal;
