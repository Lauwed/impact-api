import { FC, useState } from "react";
import { PersonSocialStatus } from "../types";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeletePersonSocialStatusModal from "./modals/DeletePersonSocialStatusModal";
import EditPersonSocialStatusModal from "./modals/EditPersonSocialStatusModal";
import { useData } from "./utils/useData";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

type SocialStatusNodeType = {
  uri: string;
  actions?: boolean;
};

const SocialStatusField: FC<SocialStatusNodeType> = ({
  uri,
  actions = false,
}) => {
  const [socialStatusModalOpen, setSocialStatusModalOpen] =
    useState<boolean>(false);
  const [socialStatusModalDeleteOpen, setSocialStatusModalDeleteOpen] =
    useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useData<PersonSocialStatus>({ url: uri });

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
      <p>{data.typeSocialStatus.name}</p>

      {user && actions ? (
        <div className="flex gap-2">
          <Button onClick={() => setSocialStatusModalOpen(true)}>
            <Pencil1Icon />
            Edit
          </Button>
          <EditPersonSocialStatusModal
            socialStatus={data}
            modalOpen={socialStatusModalOpen}
            setModalOpen={setSocialStatusModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setSocialStatusModalDeleteOpen(true)}>
            <TrashIcon />
            Delete
          </Button>
          <DeletePersonSocialStatusModal
            socialStatus={data}
            modalOpen={socialStatusModalDeleteOpen}
            setModalOpen={setSocialStatusModalDeleteOpen as () => void}
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

export default SocialStatusField;
