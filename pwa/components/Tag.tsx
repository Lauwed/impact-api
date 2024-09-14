// components/Tag.tsx
import { X } from "lucide-react";
import React from "react";

interface TagProps {
  label: string;
  color?: string;
  deleteAction?: boolean;
  deleteURI?: string;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({
  deleteAction = false,
  deleteURI,
  onDelete,
  label,
  color = "#e2e8f0",
}) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex gap-2 items-center px-2 py-1 text-sm font-semibold text-gray-800 rounded"
    >
      {label}

      {deleteAction && deleteURI ? (
        <button
          className="cursor-pointer"
          onClick={async () => {
            const response = await fetch(deleteURI, {
              method: "DELETE",
            });

            if (response.ok) {
              onDelete();
            } else {
              console.error("Erreur lors de la suppression de l'élément");
            }
          }}
        >
          <X size={14} />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tag;
