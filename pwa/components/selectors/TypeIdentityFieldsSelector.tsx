import { useEffect, useState } from "react";
import { Response, TypeIdentityField } from "../../types";
import Select from "../form/Select";
import { useData } from "../utils/useData";

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

  const { data, isLoading } = useData<Response<TypeIdentityField>>({url: "/type_identity_fields"});

  useEffect(() => {
    if (!isLoading && data) {
      setFields(data["hydra:member"]);
    }
  }, [data, isLoading]);

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
