import { format } from "date-fns";
import { FC, useState } from "react";
import useSWR from "swr";
import { PersonSchool } from "../types";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeletePersonSchoolModal from "./modals/DeletePersonSchoolModal";
import EditPersonSchoolModal from "./modals/EditPersonSchoolModal";
import { fetcher } from "./utils/fetcher";

type SchoolType = {
  uri: string;
  actions?: boolean;
};

const SchoolField: FC<SchoolType> = ({ uri, actions = false }) => {
  const [schoolModalOpen, setSchoolModalOpen] = useState<boolean>(false);
  const [schoolModalDeleteOpen, setSchoolModalDeleteOpen] =
    useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<PersonSchool>(uri, fetcher);

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex gap-2 justify-between items-center">
      <p>
        {data.school.name} - {data.degree}{" "}
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
        <div className="">
          <Button onClick={() => setSchoolModalOpen(true)}>Edit</Button>
          <EditPersonSchoolModal
            school={data}
            modalOpen={schoolModalOpen}
            setModalOpen={setSchoolModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setSchoolModalDeleteOpen(true)}>Delete</Button>
          <DeletePersonSchoolModal
            school={data}
            modalOpen={schoolModalDeleteOpen}
            setModalOpen={setSchoolModalDeleteOpen as () => void}
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

export default SchoolField;
