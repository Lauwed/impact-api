import { PersonJob } from "@/types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { FC, useState } from "react";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeletePersonJobModal from "./modals/DeletePersonJobModal";
import EditPersonJobModal from "./modals/EditPersonJobModal";
import { useData } from "./utils/useData";

type JobType = {
  uri: string;
  actions?: boolean;
};

const JobField: FC<JobType> = ({ uri, actions = false }) => {
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [jobModalDeleteOpen, setJobModalDeleteOpen] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useData<PersonJob>({ url: uri });

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
      <p>
        {data.company.name} - {data.job}{" "}
        {data.startDate ? (
          <>
            ({format(new Date(data.startDate), "yyyy")}
            {data.endDate ? (
              <>-{format(new Date(data.endDate), "yyyy")}</>
            ) : (
              <></>
            )}
            )
          </>
        ) : (
          <></>
        )}
      </p>

      {user && actions ? (
        <div className="min-w-fit w-fit flex gap-2">
          <Button onClick={() => setJobModalOpen(true)}>
            <Pencil1Icon />
            <span className="md:sr-only">Edit</span>
          </Button>
          <EditPersonJobModal
            job={data}
            modalOpen={jobModalOpen}
            setModalOpen={setJobModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setJobModalDeleteOpen(true)}>
            <TrashIcon />
            <span className="md:sr-only">Delete</span>
          </Button>
          <DeletePersonJobModal
            job={data}
            modalOpen={jobModalDeleteOpen}
            setModalOpen={setJobModalDeleteOpen as () => void}
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

export default JobField;
