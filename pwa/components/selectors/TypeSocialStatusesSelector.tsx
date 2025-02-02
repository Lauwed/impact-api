import { useEffect, useState } from "react";
import { Response, TypeSocialStatus } from "../../types";
import Select from "../form/Select";
import { useData } from "../utils/useData";

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

  const { data, isLoading } = useData<Response<TypeSocialStatus>>({url: "/type_social_statuses"});

  useEffect(() => {
    if (!isLoading && data) {
      setFields(data["hydra:member"]);
    }
  }, [data, isLoading]);

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
