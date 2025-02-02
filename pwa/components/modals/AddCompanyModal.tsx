import { useEffect, useState } from "react";
import Button from "../Button";
import Heading from "../common/Heading";
import { useAuth } from "../context/auth";
import FormControl from "../form/FormControl";
import Modal from "../Modal";
import { toast } from "react-toastify";

const AddCompanyModal = ({
  modalOpen,
  setModalOpen,
  onClose,
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  onClose?: () => void;
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    country?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    url?: string;
  }>({
    name: "",
    country: "",
    city: "",
    postalCode: "",
    street: "",
    url: "",
  });

  useEffect(() => {
    if (!modalOpen && onClose) {
      // Reset form data when modal is closed
      setFormData({
        name: "",
        country: "",
        city: "",
        postalCode: "",
        street: "",
        url: "",
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
      const response = await fetch("/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Gestion du succès, redirection ou autre
        console.info("Added successfully", data);
        toast.success("Added successfully");
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
      <Heading level="h4" levelStyle="h3">
        Add a company
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

        <FormControl
          name="country"
          id="country"
          label="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <FormControl
          name="city"
          id="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
        />

        <FormControl
          name="postalCode"
          id="postalCode"
          label="Postal code"
          value={formData.postalCode}
          onChange={handleChange}
        />

        <FormControl
          name="street"
          id="street"
          label="Street"
          value={formData.street}
          onChange={handleChange}
        />

        <FormControl
          name="url"
          id="url"
          label="URL"
          value={formData.url}
          onChange={handleChange}
        />

        <Button type="submit">Add company</Button>
      </form>
    </Modal>
  );
};

export default AddCompanyModal;
