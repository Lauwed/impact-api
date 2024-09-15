import { FC, useState } from "react";
import useSWR from "swr";
import { PersonSocialStatus } from "../types";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeletePersonSocialStatusModal from "./modals/DeletePersonSocialStatusModal";
import EditPersonSocialStatusModal from "./modals/EditPersonSocialStatusModal";
import { fetcher } from "./utils/fetcher";

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

  const { data, isLoading, mutate } = useSWR<PersonSocialStatus>(uri, fetcher);

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex gap-2 justify-between items-center">
      <p>{data.typeSocialStatus.name}</p>

      {user && actions ? (
        <div className="">
          <Button onClick={() => setSocialStatusModalOpen(true)}>Edit</Button>
          <EditPersonSocialStatusModal
            socialStatus={data}
            modalOpen={socialStatusModalOpen}
            setModalOpen={setSocialStatusModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setSocialStatusModalDeleteOpen(true)}>
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
