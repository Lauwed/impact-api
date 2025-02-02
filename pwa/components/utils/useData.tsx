import { useEffect } from "react";
import { toast } from "react-toastify";
import useSWR, { SWRResponse } from "swr";
import { fetcher } from "./fetcher";

interface UseDataProps {
  url: string;
}

// Typage générique du hook useData
export const useData = <T,>({ url }: UseDataProps): SWRResponse<T, Error> => {
  const { data, error, isLoading, mutate, isValidating } = useSWR<T>(url, fetcher);

  // Gestion de l'erreur : afficher un toast si une erreur survient
  useEffect(() => {
    if (error) {
      toast.error(
        "Une erreur est survenue lors de la récupération des données."
      );
    }
  }, [error]);

  return { data, isLoading, error, mutate, isValidating };
};
