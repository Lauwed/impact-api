import { FC, useState } from "react";

import { PersonCategory } from "@/types";
import { useAuth } from "./context/auth";
import Tag from "./Tag";
import { useData } from "./utils/useData";
// import DeletePersonCategoryModal from "./modals/DeletePersonCategoryModal";

type CategoryFieldType = {
  uri: string;
  actions?: boolean;
};

const CategoryField: FC<CategoryFieldType> = ({ uri, actions = false }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useData<PersonCategory>({ url: uri });

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <Tag
      label={data.category.name}
      color={data.category.color}
      deleteAction={actions && user ? true : false}
      deleteURI={uri}
      onDelete={() => setIsDeleted(true)}
    />
  );
};

export default CategoryField;
