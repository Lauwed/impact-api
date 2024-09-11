import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import Heading from "../common/Heading";
import FormControl from "../form/FormControl";
import Label from "../form/Label";
import SourcesSelector from "../selectors/SourcesSelector";
import AddSourceModal from "./AddSourceModal";

const EditMainPersonPicture = ({
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
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    alt: string;
    sourceMedia: File | null;
    sourceMediaValue: string;
    source: number;
  }>({
    title: "",
    alt: "",
    sourceMedia: null,
    sourceMediaValue: "",
    source: -1,
  });

  useEffect(() => {
    if (!modalOpen && onClose) {
      // Reset form data when modal is closed
      setFormData({
        title: "",
        alt: "",
        sourceMedia: null, // Clear the file
        sourceMediaValue: "",
        source: -1,
      });

      onClose();
    }
  }, [modalOpen]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    console.log(files);

    if (name === "sourceMedia" && files.length > 0) {
      // Handle file input
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        sourceMedia: file, // Set the selected file
        sourceMediaValue: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(formData);
      const bodyData = new FormData();

      bodyData.append("title", formData.title);
      bodyData.append("alt", formData.alt);
      bodyData.append("source", `/sources/${formData.source}`);
      bodyData.append("person", `/people/${personId}`);
      bodyData.append("main", 'true');

      // Append the file to the FormData
      if (formData.sourceMedia) {
        bodyData.append("file", formData.sourceMedia); // Add the file as a blob
      }

      const response = await fetch("/person_pictures", {
        method: "POST",
        body: bodyData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Person added successfully", data);
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
      <Heading level="h3">Edit main picture</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          name="title"
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <FormControl
          name="alt"
          id="alt"
          label="Alternative text"
          value={formData.alt}
          onChange={handleChange}
          required
        />

        <FormControl
          name="sourceMedia"
          id="sourceMedia"
          label="Media"
          type="file"
          onChange={handleChange}
          value={formData.sourceMediaValue}
          required
        />

        <div className="mb-4">
          <Label htmlFor="source">Source</Label>
          <SourcesSelector
            value={formData.source}
            onChange={handleChange as () => void}
          />

          <div className="flex gap-4 items-center mt-2">
            <p>The source doesn't exists ?</p>
            <Button type="button" onClick={() => setIsSourceModalOpen(true)}>
              Add a source
            </Button>
          </div>
        </div>

        <Button type="submit">Update main picture</Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
    </Modal>
  );
};

export default EditMainPersonPicture;
