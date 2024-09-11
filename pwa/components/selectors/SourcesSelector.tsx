import { useEffect, useState } from "react";
import useSWR from "swr";
import { TypeSources } from "../../enums";
import { Source } from "../../types";
import Select from "../form/Select";
import { fetcher } from "../utils/fetcher";

const SourcesSelector = ({
  value,
  onChange,
  personId,
}: {
  value: any;
  onChange: () => void;
  personId?: number;
}) => {
  const [fields, setFields] = useState<Source[]>([]);

  const { data, isLoading } = useSWR("/sources", fetcher, {
    revalidateOnFocus: true,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setFields(data["hydra:member"]);
    }
  }, [data, isLoading]);

  return (
    <Select
      name="source"
      id="source"
      data={[
        { value: -1, label: "" },
        ...fields.map((field) => ({
          value: field.id,
          label: `${field.name} - ${TypeSources[field.typeSource.name]}`,
        })),
      ]}
      required
      value={value}
      onChange={onChange}
    />
  );
};

export default SourcesSelector;
