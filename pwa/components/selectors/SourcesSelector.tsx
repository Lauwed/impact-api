import { useEffect, useState } from "react";
import useSWR from "swr";
import { TypeSources } from "../../enums";
import { Source } from "../../types";
import Select from "../form/Select";
import { fetcher } from "../utils/fetcher";
import SearchableCombobox from "../SearchableDropdown";

const SourcesSelector = ({
  value,
  onChange,
  personId,
}: {
  value: any;
  onChange: (value: number) => void;
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
    <SearchableCombobox
      items={fields.map((field) => ({
        value: field.id,
        label: `${field.name} - ${TypeSources[field.typeSource.name]}`,
      }))}
      // name="source"
      // id="source"
      // required
      value={value}
      onChange={onChange}
    />
  );
};

export default SourcesSelector;
