import { format } from "date-fns";
import { FC, useState } from "react";
import useSWR from "swr";
import Button from "./Button";
import { useAuth } from "./context/auth";
import { fetcher } from "./utils/fetcher";
import { PersonJob } from "@/types";
import EditPersonJobModal from "./modals/EditPersonJobModal";
import DeletePersonJobModal from "./modals/DeletePersonJobModal";

type JobType = {
  uri: string;
  actions?: boolean;
};

const JobField: FC<JobType> = ({ uri, actions = false }) => {
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [jobModalDeleteOpen, setJobModalDeleteOpen] =
    useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<PersonJob>(uri, fetcher);

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex gap-2 justify-between items-center">
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
        <div className="min-w-fit w-fit">
          <Button onClick={() => setJobModalOpen(true)}>Edit</Button>
          <EditPersonJobModal
            job={data}
            modalOpen={jobModalOpen}
            setModalOpen={setJobModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setJobModalDeleteOpen(true)}>Delete</Button>
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
