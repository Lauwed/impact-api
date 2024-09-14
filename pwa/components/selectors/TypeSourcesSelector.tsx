import { useEffect, useState } from "react";
import { TypeSource } from "../../types";
import Select from "../form/Select";

const TypeSourcesSelector = ({
  value,
  onChange,
}: {
  value: any;
  onChange: () => void;
}) => {
  const [fields, setFields] = useState<TypeSource[]>([]);

  useEffect(() => {
    (async () => {
      const req = await fetch("/type_sources");
      const data = await req.json();
      setFields(data["hydra:member"]);
    })();
  }, []);

  return (
    <Select
      name="typeSource"
      id="typeSource"
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
    />
  );
};

export default TypeSourcesSelector;
