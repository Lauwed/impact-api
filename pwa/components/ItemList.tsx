import { CirclePlus, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import Button from "./Button";
import ColorPicker from "./ColorPicker";
import { useAuth } from "./context/auth";
import Input from "./form/Input";
import Loading from "./Loading";

// Définition du type pour les éléments
interface Item {
  id: number;
  name: string;
  color?: string;
}

// Fonction de récupération des données (API simulée)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ItemsList: React.FC<{ url: string }> = ({ url }) => {
  const { user } = useAuth();
  // Utilisation de SWR pour la récupération des données
  const { data, error } = useSWR<{ "hydra:member": Item[] }>(url, fetcher);
  const [newItemName, setNewItemName] = useState("");
  const [newItemColor, setNewItemColor] = useState("");
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemColor, setEditItemColor] = useState("");

  // Fonction pour ajouter un nouvel élément
  const addItem = async () => {
    if (!newItemName.trim()) return;

    const body: { name: string; color?: string } = { name: newItemName };
    if (url == "/categories") body.color = newItemColor;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      mutate(url);
      setNewItemName(""); // Réinitialiser le champ de texte
      setNewItemColor("");
    } else {
      console.error("Erreur lors de l'ajout de l'élément");
    }
  };

  // Fonction pour mettre à jour un élément
  const updateItem = async () => {
    if (!editItemName.trim() || editItemId === null) return;

    const body: { name: string; color?: string } = { name: editItemName };
    if (url == "/categories") body.color = editItemColor;

    const response = await fetch(`${url}/${editItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      mutate(url);
      setEditItemId(null);
      setEditItemName(""); // Réinitialiser le champ de texte
      setEditItemColor(""); // Réinitialiser le champ de texte
    } else {
      console.error("Erreur lors de la mise à jour de l'élément");
    }
  };

  // Fonction pour supprimer un élément
  const deleteItem = async (id: number) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.ok) {
      mutate(url);
    } else {
      console.error("Erreur lors de la suppression de l'élément");
    }
  };

  if (error) return <div>Erreur de chargement des données.</div>;
  if (!data) return <Loading />;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editItemId !== null) {
            updateItem();
          } else {
            addItem();
          }
        }}
        className="flex items-center mb-4"
      >
        <label htmlFor="name" className="sr-only"></label>
        <Input
          id="name"
          name="name"
          type="text"
          value={editItemId !== null ? editItemName : newItemName}
          onChange={(e) => {
            if (editItemId !== null) {
              setEditItemName(e.target.value);
            } else {
              setNewItemName(e.target.value);
            }
          }}
          placeholder="Name"
        />
        {url === "/categories" ? (
          <ColorPicker
            color={editItemId !== null ? editItemColor : newItemColor}
            onChange={(value) => {
              if (editItemId !== null) {
                setEditItemColor(value);
              } else {
                setNewItemColor(value);
              }
            }}
          />
        ) : (
          <></>
        )}
        <Button type="submit">
          {editItemId !== null ? <Edit /> : <CirclePlus />}
          <span className="sr-only">
            {editItemId !== null ? "Save" : "Add"}
          </span>
        </Button>
      </form>
      <ul>
        {data["hydra:member"].map((item) => (
          <li key={item.id} className="flex border-b p-2 items-center">
            <p className="w-16">{item.id}</p>
            <p className="flex-1">{item.name}</p>
            {url === "/categories" ? (
              <div
                className="w-10 h-10 rounded-full border border-gray-300"
                style={{ backgroundColor: item.color }}
                aria-label="Selected color preview"
              />
            ) : (
              <></>
            )}
            <Button
              onClick={() => {
                setEditItemId(item.id);
                setEditItemName(item.name);
                if (url === "/categories") setEditItemColor(item.color || "");
              }}
              customStyle="ml-2"
            >
              <Edit />
              <span className="sr-only">Edit</span>
            </Button>
            <Button onClick={() => deleteItem(item.id)}>
              <Trash2 />
              <span className="sr-only">Delete</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
