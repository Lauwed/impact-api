import { FC, useEffect, useState } from "react";

import { PersonIdentifyField } from "../types";
import Button from "./Button";

import useSWR from "swr";
import { fetcher } from "./utils/fetcher";
import { useAuth } from "./context/auth";
import Tag from "./Tag";
import { Categories } from "@/enums";
// import DeletePersonCategoryModal from "./modals/DeletePersonCategoryModal";

type CategoryFieldType = {
  uri: string;
  actions?: boolean;
};

const CategoryField: FC<CategoryFieldType> = ({ uri, actions = false }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR(uri, fetcher);

  if (isLoading || !data || isDeleted) return <></>;
  return (
    <Tag
      label={Categories[data.category.name as keyof typeof Categories]}
      color={data.category.color}
      deleteAction={actions && user ? true : false}
      deleteURI={uri}
      onDelete={() => setIsDeleted(true)}
    />
  );
};

export default CategoryField;
