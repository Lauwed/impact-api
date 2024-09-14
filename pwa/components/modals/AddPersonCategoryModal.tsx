import { useEffect, useState } from "react";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import FormControl from "../form/FormControl";
import Modal from "../Modal";
import Label from "../form/Label";
import SourcesSelector from "../selectors/SourcesSelector";
import AddSourceModal from "./AddSourceModal";
import CategoriesSelector from "../selectors/CategoriesSelector";

const AddPersonCategoryModal = ({
  modalOpen,
  setModalOpen,
  onClose,
  personId,
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
  personId: number;
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<{
    category: number;
    source: number;
  }>({
    category: -1,
    source: -1,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen && onClose) {
      // Reset form data when modal is closed
      setFormData({
        category: -1,
        source: -1,
      });

      onClose();
    }
  }, [modalOpen]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.category == -1) setErrorMessage("Category is mandatory");

    const body: { person: string; category: string; source?: string } = {
      person: `/people/${personId}`,
      category: `/categories/${formData.category}`,
    };
    if (formData.source != -1) body.source = `/sources/${formData.source}`;

    try {
      const response = await fetch("/person_categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        // Gestion du succès, redirection ou autre
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
      <Heading level="h4" levelStyle="h3">
        Add a category
      </Heading>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <CategoriesSelector
            value={formData.category}
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

        <Button type="submit">Add category</Button>

        {errorMessage ? (
          <p className="py-1 px-2 w-full bg-red-200 mt-4 text-sm">
            {errorMessage}
          </p>
        ) : (
          <></>
        )}
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
    </Modal>
  );
};

export default AddPersonCategoryModal;
