import { useState } from "react";
import Heading from "../common/Heading";
import FormControl from "../form/FormControl";
import Label from "../form/Label";
import Modal from "../Modal";
import TypeIdentityFieldsSelector from "../selectors/TypeIdentityFieldsSelector";
import Button from "../Button";
import SourcesSelector from "../selectors/SourcesSelector";
import TypeSourcesSelector from "../selectors/TypeSourcesSelector";

const AddSourceModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: () => void;
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    typeSource: number;
    url: string;
    checkedAt: Date;
    sourceMedia: [];
    digital: string;
    verified: string;
  }>({
    name: "",
    typeSource: -1,
    url: "",
    checkedAt: new Date(),
    sourceMedia: [],
    digital: 'false',
    verified: 'false',
  });

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
      const response = await fetch("/sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          ...formData,
          typeSource: `/type_sources/${formData.typeSource}`,
          digital: formData.digital == "true",
          verified: formData.verified == "true",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Gestion du succès, redirection ou autre
        console.log("Person added successfully", data);
      } else {
        console.error("Failed to add person");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <Heading level="h4" levelStyle="h3">
        Add a Source
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl
          name="name"
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="mb-4">
          <Label htmlFor="source">Type source</Label>
          <TypeSourcesSelector
            value={formData.typeSource}
            onChange={handleChange as () => void}
          />
        </div>

        <FormControl
          name="url"
          id="url"
          label="URL"
          value={formData.url}
          onChange={handleChange}
        />

        {/* CHANGE TO GALLERY */}
        <FormControl
          name="sourceMedia"
          id="sourceMedia"
          label="Media"
          type="file"
          value={formData.sourceMedia}
          onChange={handleChange}
        />

        <FormControl
          name="checkedAt"
          id="checkedAt"
          label="Checked at"
          type="date"
          value={formData.checkedAt}
          onChange={handleChange}
          required
        />

        <FormControl
          name="digital"
          id="digital"
          label="Digital ?"
          type="checkbox"
          value={formData.digital}
          onChange={handleChange}
        />

        <FormControl
          name="verified"
          id="verified"
          label="Verified ?"
          type="checkbox"
          value={formData.verified}
          onChange={handleChange}
        />

        <Button type="submit">Add source</Button>
      </form>
    </Modal>
  );
};

export default AddSourceModal;
