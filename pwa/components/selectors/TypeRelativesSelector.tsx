import { useEffect, useState } from "react";
import { TypeRelative } from "../../types";
import Select from "../form/Select";

const TypeRelativesSelector = ({
  value,
  onChange,
  disabled = false,
}: {
  value: any;
  onChange: () => void;
  disabled?: boolean;
}) => {
  const [fields, setFields] = useState<TypeRelative[]>([]);

  useEffect(() => {
    (async () => {
      const req = await fetch("/type_relatives");
      const data = await req.json();
      setFields(data["hydra:member"]);
    })();
  }, []);

  return (
    <Select
      name="typeRelative"
      id="typeRelative"
      data={[
        { value: -1, label: "" },
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

export default TypeRelativesSelector;
