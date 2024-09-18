import { useEffect, useState } from "react";
import useSWR from "swr";
import { Company, Response } from "../../types";
import SearchableCombobox from "../SearchableDropdown";
import { fetcher } from "../utils/fetcher";
import { useData } from "../utils/useData";

const CompaniesSelector = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: number) => void;
  personId?: number;
}) => {
  const [fields, setFields] = useState<Company[]>([]);

  const { data, isLoading } = useData<Response<Company>>({ url: "/companies" });

  useEffect(() => {
    if (!isLoading && data) {
      setFields(data["hydra:member"]);
    }
  }, [data, isLoading]);

  return (
    <SearchableCombobox
      items={fields.map((field) => ({
        value: `${field.id}`,
        label: `${field.name}`,
      }))}
      label={fields.find((field) => field.id == value)?.name || ""}
      onChange={onChange}
    />
  );
};

export default CompaniesSelector;
