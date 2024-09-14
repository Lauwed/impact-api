import { useEffect, useState } from "react";
import useSWR from "swr";
import { Source } from "../../types";
import SearchableCombobox from "../SearchableDropdown";
import Tag from "../Tag";
import { fetcher } from "../utils/fetcher";

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
        label: field.name,
        renderedLabel: (
          <div>
            <div className="flex gap-2 items-center">
              <p>{field.name}</p>
              <Tag label={field.typeSource.name} />
            </div>
            {field.isDigital || field.isVerified ? (
              <ul>
                {field.isDigital ? (
                  <li>
                    <Tag label="Digital" />
                  </li>
                ) : (
                  <></>
                )}
                {field.isVerified ? (
                  <li>
                    <Tag label="Verified" />
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            ) : (
              <></>
            )}
            {field.url ? <p className="text-xs">{field.url}</p> : <></>}
          </div>
        ),
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
