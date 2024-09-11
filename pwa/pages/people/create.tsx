import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import Heading from "../../components/common/Heading";
import Main from "../../components/common/Main";
import FormControl from "../../components/form/FormControl";

const CreatePerson = () => {
  const router = useRouter();
  // Gestion des états des champs du formulaire
  const [formData, setFormData] = useState({
    name: "",
    romanizedName: "",
  });

  // Fonction pour mettre à jour les données du formulaire
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Gestion du succès, redirection ou autre
        console.log("Person added successfully");
        router.push(`/people/${data.id}`, undefined, { shallow: true });
      } else {
        console.error("Failed to add person");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Main>
      <Heading>Add a woman to the project</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          label="Name:"
        />

        <FormControl
          type="text"
          id="romanizedName"
          name="romanizedName"
          value={formData.romanizedName}
          onChange={handleChange}
          label="Romanized Name:"
          hint="If the name of the person is written in another alphabet than latin, you can inform their name in latin letters."
        />

        <Button type="submit">Add person</Button>
      </form>
    </Main>
  );
};

export default CreatePerson;
