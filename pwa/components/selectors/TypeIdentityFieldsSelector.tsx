import { useEffect, useState } from "react";
import Select from "../form/Select";
import { TypeIdentityField } from "../../types";
import { IdentityFields } from "../../enums";

const TypeIdentityFieldsSelector = ({
  value,
  onChange,
}: {
  value: any;
  onChange: () => void;
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
      data={fields
        .map((field) => ({
          value: field.id,
          label: IdentityFields[field.name],
        }))}
      required
      value={value}
      onChange={onChange}
    />
  );
};

export default TypeIdentityFieldsSelector;
