import { useEffect, useState } from "react";
import { TypeSocialStatus } from "../../types";
import Select from "../form/Select";

const TypeSocialStatusesSelector = ({
  value,
  onChange,
  disabled = false,
}: {
  value: any;
  onChange: () => void;
  disabled?: boolean;
}) => {
  const [fields, setFields] = useState<TypeSocialStatus[]>([]);

  useEffect(() => {
    (async () => {
      const req = await fetch("/type_social_statuses");
      const data = await req.json();
      setFields(data["hydra:member"]);
    })();
  }, []);

  return (
    <Select
      name="typeSocialStatus"
      id="typeSocialStatus"
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

export default TypeSocialStatusesSelector;
