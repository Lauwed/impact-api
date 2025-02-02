import { useEffect, useState } from "react";
import { Response, TypeRelative } from "../../types";
import Select from "../form/Select";
import { useData } from "../utils/useData";

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

  const { data, isLoading } = useData<Response<TypeRelative>>({url: "/type_relatives"});

  useEffect(() => {
    if (!isLoading && data) {
      setFields(data["hydra:member"]);
    }
  }, [data, isLoading]);

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
