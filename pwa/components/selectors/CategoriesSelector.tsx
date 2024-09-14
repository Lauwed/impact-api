import { useEffect, useState } from "react";
import { Category } from "../../types";
import Select from "../form/Select";

const CategoriesSelector = ({
  value,
  onChange,
  disabled = false,
}: {
  value: any;
  onChange: () => void;
  disabled?: boolean;
}) => {
  const [fields, setFields] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const req = await fetch("/categories");
      const data = await req.json();
      setFields(data["hydra:member"]);
    })();
  }, []);

  return (
    <Select
      name="category"
      id="category"
      data={[
        { value: -1, label: "Select a category..." },
        ...fields.map((field) => ({
          value: field.id,
          label: field.name,
        })),
      ]}
      required
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default CategoriesSelector;
