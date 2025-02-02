import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "react-toastify";
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
        toast.success("Added successfully");
        if (onSubmit) onSubmit();
        setFormData({
          content: "",
          source: -1,
        });
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
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 md:gap-4 my-4"
      >
        <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 md:gap-y-0">
          <FormControl
            type="textarea"
            name="content"
            id="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
            customContainerStyle="md:flex-1 md:w-2/3 !mb-0"
            required
          />

          <div className="md:w-1/3">
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

            <div className="flex md:block lg:flex justify-between gap-4 items-center mt-2">
              <p className="md:mb-2 lg:mb-0 text-sm">The source doesn't exists ?</p>
              <Button type="button" onClick={() => setIsSourceModalOpen(true)}>
                Add a source
              </Button>
            </div>
          </div>
        </div>

        <Button type="submit" className="">
          <PlusCircledIcon />
          Add achievement
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
