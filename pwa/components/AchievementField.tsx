import { Achievement } from "@/types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeleteAchievementModal from "./modals/DeleteAchievementModal";
import EditAchievementModal from "./modals/EditAchievementModal";
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

  const { data, isLoading, mutate } = useData<Achievement>({ url: uri });

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
      <p>{data.content}</p>

      {user && actions ? (
        <div className="min-w-fit w-fit flex gap-2">
          <Button onClick={() => setEditAchievementModalOpen(true)}>
            <Pencil1Icon />
            <span className="md:sr-only">Edit</span>
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
            <TrashIcon />
            <span className="md:sr-only">Delete</span>
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
