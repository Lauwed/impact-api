import { useEffect, useState } from "react";
import { Response, TypeSource } from "../../types";
import Select from "../form/Select";
import { useData } from "../utils/useData";

const TypeSourcesSelector = ({
  value,
  onChange,
}: {
  value: any;
  onChange: () => void;
}) => {
  const [fields, setFields] = useState<TypeSource[]>([]);

  const { data, isLoading } = useData<Response<TypeSource>>({url: "/type_sources"});

  useEffect(() => {
    if (!isLoading && data) {
      setFields(data["hydra:member"]);
    }
  }, [data, isLoading]);

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
