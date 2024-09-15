import { useEffect, useState } from "react";
import { TypeIdentityField } from "../../types";
import Select from "../form/Select";

const TypeIdentityFieldsSelector = ({
  value,
  onChange,
  disabled = false,
}: {
  value: any;
  onChange: () => void;
  disabled?: boolean;
}) => {
  const [fields, setFields] = useState<TypeIdentityField[]>([]);

  useEffect(() => {
    (async () => {
      const req = await fetch("/type_identity_fields");
      const data = await req.json();
      setFields(data["hydra:member"]);
    })();
  }, []);

  return (
    <Select
      name="typeIdentityField"
      id="typeIdentityField"
      data={fields.map((field) => ({
        value: field.id,
        label: field.name,
      }))}
      required
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default TypeIdentityFieldsSelector;
