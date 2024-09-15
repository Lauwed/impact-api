import { PersonIdentifyField, Response } from "@/types";
import useSWR from "swr";
import { EditableSection } from "./EditableSection";
import { TypeIdentityFieldSelector } from "./TypeIdentityFieldSelector";
import { fetcher } from "./utils/fetcher";

const EditableIdentityFields = ({
  URIs,
  onUpdate,
}: {
  URIs: string[];
  onUpdate: () => void;
}) => {
  const { data, error, mutate } = useSWR<Response<PersonIdentifyField>>(
    `/person_identity_fields?ids=${URIs.map((uri) => uri.split("/")[2]).join(
      ","
    )}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <EditableSection
      title="Identity"
      items={data["hydra:member"]}
      onUpdate={onUpdate}
      keyComponent={TypeIdentityFieldSelector}
    />
  );
};

export default EditableIdentityFields;
