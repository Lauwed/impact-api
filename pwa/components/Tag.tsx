// components/Tag.tsx
import { X } from "lucide-react";
import React from "react";

interface TagProps {
  label: string;
  color?: string;
  deleteAction?: boolean;
  deleteURI?: string;
  onDelete?: () => void;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({
  deleteAction = false,
  deleteURI,
  onDelete,
  label,
  color = "#e2e8f0",
  onClick,
}) => {
  const style = { backgroundColor: color };
  const classes =
    "flex gap-2 items-center px-2 py-1 text-sm font-semibold text-gray-800 rounded min-w-fit max-w-fit w-fit";
  const content = (
    <>
      {label}

      {deleteAction && deleteURI ? (
        <button
          className="cursor-pointer"
          onClick={async () => {
            const response = await fetch(deleteURI, {
              method: "DELETE",
            });

            if (response.ok) {
              if (onDelete) onDelete();
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
    </>
  );

  if (onClick)
    return (
      <button
        style={style}
        className={`${classes} cursor-pointer`}
        onClick={onClick}
      >
        {content}
      </button>
    );
  return (
    <div style={style} className={classes}>
      {content}
    </div>
  );
};

export default Tag;
