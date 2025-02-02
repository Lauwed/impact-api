import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import { PersonIdentifyField } from "../types";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeletePersonIdentityFieldModal from "./modals/DeletePersonIdentityFieldModal";
import EditPersonIdentityFieldModal from "./modals/EditPersonIdentityFieldModal";
import { useData } from "./utils/useData";

type IdentityFieldNodeType = {
  uri: string;
  actions?: boolean;
};

const IdentityField: FC<IdentityFieldNodeType> = ({ uri, actions = false }) => {
  const [identityFieldModalOpen, setIdentityFieldModalOpen] =
    useState<boolean>(false);
  const [identityFieldModalDeleteOpen, setIdentityFieldModalDeleteOpen] =
    useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useData<PersonIdentifyField>({
    url: uri,
  });

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
      <p>
        <strong>{data.typeIdentityField.name}</strong>: {data.value}
      </p>

      {user && actions ? (
        <div className="flex gap-2">
          <Button onClick={() => setIdentityFieldModalOpen(true)}>
            <Pencil1Icon />
            <span className="md:sr-only">Edit</span>
          </Button>
          <EditPersonIdentityFieldModal
            field={data}
            modalOpen={identityFieldModalOpen}
            setModalOpen={setIdentityFieldModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setIdentityFieldModalDeleteOpen(true)}>
            <TrashIcon />
            <span className="md:sr-only">Delete</span>
          </Button>
          <DeletePersonIdentityFieldModal
            field={data}
            modalOpen={identityFieldModalDeleteOpen}
            setModalOpen={setIdentityFieldModalDeleteOpen as () => void}
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

export default IdentityField;
