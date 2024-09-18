import { Achievement } from "@/types";
import { FC, useState } from "react";
import useSWR from "swr";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeleteAchievementModal from "./modals/DeleteAchievementModal";
import EditAchievementModal from "./modals/EditAchievementModal";
import { fetcher } from "./utils/fetcher";
import { useData } from "./utils/useData";

type AchievementType = {
  uri: string;
  actions?: boolean;
};

const AchievementField: FC<AchievementType> = ({ uri, actions = false }) => {
  const [editAchievementModelOpen, setEditAchievementModalOpen] =
    useState<boolean>(false);
  const [deleteAchievementModelOpen, setDeleteAchievementModalOpen] =
    useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useData<Achievement>({url: uri});

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex gap-2 justify-between items-center">
      <p>{data.content}</p>

      {user && actions ? (
        <div className="min-w-fit w-fit">
          <Button onClick={() => setEditAchievementModalOpen(true)}>
            Edit
          </Button>
          <EditAchievementModal
            achievement={data}
            modalOpen={editAchievementModelOpen}
            setModalOpen={setEditAchievementModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setDeleteAchievementModalOpen(true)}>
            Delete
          </Button>
          <DeleteAchievementModal
            achievement={data}
            modalOpen={deleteAchievementModelOpen}
            setModalOpen={setDeleteAchievementModalOpen as () => void}
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

export default AchievementField;
