import { FC, useEffect, useState } from "react";
import { IdentityFields } from "../enums";
import { PersonIdentifyField, PersonSchool } from "../types";
import Button from "./Button";
import EditPersonIdentityFieldModal from "./modals/EditPersonIdentityFieldModal";
import useSWR from "swr";
import { fetcher } from "./utils/fetcher";
import { useAuth } from "./context/auth";
import DeletePersonIdentityFieldModal from "./modals/DeletePersonIdentityFieldModal";
import { format } from "date-fns";
import DeletePersonSchoolModal from "./modals/DeletePersonSchoolModal";
import EditPersonSchoolModal from "./modals/EditPersonSchoolModal";

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
