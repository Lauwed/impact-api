import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import FormControl from "../form/FormControl";
import Label from "../form/Label";
import Modal from "../Modal";
import TypeIdentityFieldsSelector from "../selectors/TypeIdentityFieldsSelector";
import Button from "../Button";
import SourcesSelector from "../selectors/SourcesSelector";
import AddSourceModal from "./AddSourceModal";
import { useAuth } from "../context/auth";
import SchoolsSelector from "../selectors/SchoolsSelector";
import AddSchoolModal from "./AddSchoolModal";

const AddPersonSchoolModal = ({
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
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    degree: string;
    startDate: Date | null;
    endDate: Date | null;
    source: number;
    school: number;
  }>({
    degree: "",
    startDate: null,
    endDate: null,
    source: -1,
    school: -1,
  });

  useEffect(() => {
    if (!modalOpen && onClose) {
      setFormData({
        degree: "",
        startDate: null,
        endDate: null,
        source: -1,
        school: -1,
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
      const response = await fetch("/person_schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          source: `/sources/${formData.source}`,
          person: `/people/${personId}`,
          school: `/schools/${formData.school}`,
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
      <Heading level="h3">Add a school information</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          name="degree"
          id="degree"
          label="Degree"
          value={formData.degree}
          onChange={handleChange}
          required
        />

        <FormControl
          type="date"
          name="startDate"
          id="startDate"
          label="Start date"
          value={formData.startDate}
          onChange={handleChange}
        />

        <FormControl
          type="date"
          name="endDate"
          id="endDate"
          label="End date"
          value={formData.endDate}
          onChange={handleChange}
        />

        <div className="mb-4">
          <Label htmlFor="typeIdentityField">School</Label>
          <SchoolsSelector
            value={formData.school}
            onChange={(value: number) => {
              setFormData((prevData) => ({
                ...prevData,
                school: value,
              }));
            }}
          />
        </div>

        <div className="flex gap-4 items-center mt-2">
          <p>The school doesn't exists ?</p>
          <Button type="button" onClick={() => setIsSchoolModalOpen(true)}>
            Add a school
          </Button>
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

        <Button type="submit">Add school information</Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
      <AddSchoolModal
        modalOpen={isSchoolModalOpen}
        setModalOpen={setIsSchoolModalOpen as () => void}
      />
    </Modal>
  );
};

export default AddPersonSchoolModal;
