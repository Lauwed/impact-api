import { PersonIdentifyField, Response } from "@/types";
import { EditableSection } from "./EditableSection";
import { TypeIdentityFieldSelector } from "./TypeIdentityFieldSelector";
import { useData } from "./utils/useData";

const EditableIdentityFields = ({
  URIs,
  onUpdate,
}: {
  URIs: string[];
  onUpdate: () => void;
}) => {
  const { data, error, mutate } = useData<Response<PersonIdentifyField>>({
    url: `/person_identity_fields?ids=${URIs.map(
      (uri) => uri.split("/")[2]
    ).join(",")}`,
  });

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
