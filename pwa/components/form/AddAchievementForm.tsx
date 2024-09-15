import { CirclePlus } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
import { useAuth } from "../context/auth";
import AddSourceModal from "../modals/AddSourceModal";
import SourcesSelector from "../selectors/SourcesSelector";
import FormControl from "./FormControl";
import Label from "./Label";

const AddAchievementForm = ({
  personId,
  onSubmit,
}: {
  personId: number;
  onSubmit?: () => void;
}) => {
  const { user } = useAuth();
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    source: -1,
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
      const response = await fetch("/achievements", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          source: `/sources/${formData.source}`,
          person: `/people/${personId}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.info("Added successfully", data);
        if (onSubmit) onSubmit();
        setFormData({
          content: "",
          source: -1,
        });
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <FormControl
          type="textarea"
          name="content"
          id="content"
          label="Content"
          value={formData.content}
          onChange={handleChange}
          customContainerStyle="flex-1"
          required
        />

        <div>
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
        </div>

        <Button type="submit">
          <CirclePlus />
          <span className="sr-only">Add achievement</span>
        </Button>
      </form>

      <AddSourceModal
        modalOpen={isSourceModalOpen}
        setModalOpen={setIsSourceModalOpen as () => void}
      />
    </>
  );
};

export default AddAchievementForm;
