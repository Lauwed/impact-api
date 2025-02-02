import { PersonSchool } from "@/types";
import { useEffect, useState } from "react";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import FormControl from "../form/FormControl";
import Label from "../form/Label";
import Modal from "../Modal";
import SchoolsSelector from "../selectors/SchoolsSelector";
import SourcesSelector from "../selectors/SourcesSelector";
import AddSchoolModal from "./AddSchoolModal";
import AddSourceModal from "./AddSourceModal";
import { toast } from "react-toastify";

const EditPersonSchoolModal = ({
  modalOpen,
  setModalOpen,
  onClose,
  school,
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
  school: PersonSchool;
}) => {
  const { user } = useAuth();
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    degree: school.degree,
    startDate: school.startDate,
    endDate: school.endDate,
    source: school.source.id,
    school: school.school.id,
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
      const response = await fetch(`/person_schools/${school.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          source: `/sources/${formData.source}`,
          person: school.person,
          school: `/schools/${formData.school}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.info("Added successfully", data);
        toast.success("Updated successfully");
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
      <Heading level="h3">Edit a school information</Heading>
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
          onChange={(date: Date | undefined) => {
            setFormData((prevData) => ({
              ...prevData,
              startDate: date,
            }));
          }}
        />

        <FormControl
          type="date"
          name="endDate"
          id="endDate"
          label="End date"
          value={formData.endDate}
          onChange={(date: Date | undefined) => {
            setFormData((prevData) => ({
              ...prevData,
              endDate: date,
            }));
          }}
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

        <Button type="submit">Edit school information</Button>
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

export default EditPersonSchoolModal;
