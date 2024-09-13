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
import CompaniesSelector from "../selectors/CompaniesSelector";
import AddCompanyModal from "./AddCompanyModal";
import { PersonJob } from "@/types";

const EditPersonJobModal = ({
  modalOpen,
  setModalOpen,
  onClose,
  job
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
  job: PersonJob
}) => {
  const { user } = useAuth();
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    job: job.job,
    startDate: job.startDate,
    endDate: job.endDate,
    source: job.source.id,
    company: job.company.id,
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
      const response = await fetch(`/person_jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          source: `/sources/${formData.source}`,
          person: job.person,
          company: `/companies/${formData.company}`,
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
      <Heading level="h3">Edit a job information</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          name="job"
          id="job"
          label="Job"
          value={formData.job}
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
          <Label htmlFor="company">Company</Label>
          <CompaniesSelector
            value={formData.company}
            onChange={(value: number) => {
              setFormData((prevData) => ({
                ...prevData,
                company: value,
              }));
            }}
          />
        </div>

        <div className="flex gap-4 items-center mt-2">
          <p>The company doesn't exists ?</p>
          <Button type="button" onClick={() => setIsCompanyModalOpen(true)}>
            Add a company
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

        <Button type="submit">Edit job information</Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
      <AddCompanyModal
        modalOpen={isCompanyModalOpen}
        setModalOpen={setIsCompanyModalOpen as () => void}
      />
    </Modal>
  );
};

export default EditPersonJobModal;
