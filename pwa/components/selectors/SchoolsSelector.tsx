import { useEffect, useState } from "react";
import useSWR from "swr";
import { Response, School } from "../../types";
import SearchableCombobox from "../SearchableDropdown";
import { fetcher } from "../utils/fetcher";
import { useData } from "../utils/useData";

const SchoolsSelector = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: number) => void;
  personId?: number;
}) => {
  const [fields, setFields] = useState<School[]>([]);

  const { data, isLoading } = useData<Response<School>>({url: "/schools"});

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
      // name="source"
      // id="source"
      // required
      label={fields.find((field) => field.id == value)?.name || ""}
      onChange={onChange}
    />
  );
};

export default SchoolsSelector;
