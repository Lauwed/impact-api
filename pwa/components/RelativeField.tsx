import { FC, useState } from "react";
import { PersonRelative } from "../types";
import Button from "./Button";
// import EditPersonRelativeModal from "./modals/EditPersonRelativeModal";
import useSWR from "swr";
import Tag from "./Tag";
import { useAuth } from "./context/auth";
import DeletePersonRelativeModal from "./modals/DeletePersonRelativeModal";
import EditPersonRelativeModal from "./modals/EditPersonRelativeModal";
import { fetcher } from "./utils/fetcher";
import { useData } from "./utils/useData";
// import DeletePersonRelativeModal from "./modals/DeletePersonRelativeModal";

type RelativeFieldType = {
  uri: string;
  actions?: boolean;
};

const RelativeField: FC<RelativeFieldType> = ({ uri, actions = false }) => {
  const [identityFieldModalOpen, setRelativeModalOpen] =
    useState<boolean>(false);
  const [identityFieldModalDeleteOpen, setRelativeModalDeleteOpen] =
    useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useData<PersonRelative>({ url: uri });

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex gap-2 justify-between items-center">
      <p>
        <strong>{data.typeRelative.name}</strong>: {data.name}{" "}
        {data.biological ? <Tag label="Biological relative" /> : <></>}
      </p>

      {user && actions ? (
        <div className="">
          <Button onClick={() => setRelativeModalOpen(true)}>Edit</Button>
          <EditPersonRelativeModal
            relative={data}
            modalOpen={identityFieldModalOpen}
            setModalOpen={setRelativeModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setRelativeModalDeleteOpen(true)}>
            Delete
          </Button>
          <DeletePersonRelativeModal
            relative={data}
            modalOpen={identityFieldModalDeleteOpen}
            setModalOpen={setRelativeModalDeleteOpen as () => void}
            onClose={() => {
              setIsDeleted(true);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RelativeField;
