import { useEffect, useState } from "react";
import useSWR from "swr";
import { Company, School } from "../../types";
import SearchableCombobox from "../SearchableDropdown";
import { fetcher } from "../utils/fetcher";

const CompaniesSelector = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: number) => void;
  personId?: number;
}) => {
  const [fields, setFields] = useState<Company[]>([]);

  const { data, isLoading } = useSWR("/companies", fetcher, {
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
      value={value}
      onChange={onChange}
    />
  );
};

export default CompaniesSelector;
