import { useEffect, useState } from "react";
import useSWR from "swr";
import { School } from "../../types";
import SearchableCombobox from "../SearchableDropdown";
import { fetcher } from "../utils/fetcher";

const SchoolsSelector = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: number) => void;
  personId?: number;
}) => {
  const [fields, setFields] = useState<School[]>([]);

  const { data, isLoading } = useSWR("/schools", fetcher, {
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
        label: `${field.name}`,
      }))}
      // name="source"
      // id="source"
      // required
      value={value}
      onChange={onChange}
    />
  );
};

export default SchoolsSelector;
