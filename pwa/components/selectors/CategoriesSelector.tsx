import { useEffect, useState } from "react";
import { Category, Response } from "../../types";
import Select from "../form/Select";
import { useData } from "../utils/useData";

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

  const { data, isLoading } = useData<Response<Category>>({ url: "/categories" });

  useEffect(() => {
    if (!isLoading && data) {
      setFields(data["hydra:member"]);
    }
  }, [data, isLoading]);

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
