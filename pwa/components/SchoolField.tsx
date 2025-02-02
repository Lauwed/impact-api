import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { FC, useState } from "react";
import { PersonSchool } from "../types";
import Button from "./Button";
import { useAuth } from "./context/auth";
import DeletePersonSchoolModal from "./modals/DeletePersonSchoolModal";
import EditPersonSchoolModal from "./modals/EditPersonSchoolModal";
import { useData } from "./utils/useData";

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

  const { data, isLoading, mutate } = useData<PersonSchool>({ url: uri });

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
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
        <div className="min-w-fit w-fit flex gap-2">
          <Button onClick={() => setSchoolModalOpen(true)}>
            <Pencil1Icon />
            <span className="md:sr-only">Edit</span>
          </Button>
          <EditPersonSchoolModal
            school={data}
            modalOpen={schoolModalOpen}
            setModalOpen={setSchoolModalOpen as () => void}
            onClose={() => {
              mutate();
            }}
          />

          <Button onClick={() => setSchoolModalDeleteOpen(true)}>
            <TrashIcon />
            <span className="md:sr-only">Delete</span>
          </Button>
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
