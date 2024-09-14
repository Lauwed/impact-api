// pages/people.tsx
import Card from "@/components/Card";
import Heading from "@/components/common/Heading";
import Main from "@/components/common/Main";
import IdentityField from "@/components/IdentityField";
import Loading from "@/components/Loading";
import PersonItem from "@/components/PersonItem";
import { fetcher } from "@/components/utils/fetcher";
import { Person } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function PeoplePage() {
  const router = useRouter();

  const [activePage, setActivePage] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );

  const { data, error } = useSWR(`/people?page=${activePage}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;

  const people: Person[] = data["hydra:member"]; // API Platform's default response format
  const totalPages = Math.ceil(data["hydra:totalItems"] / 20);

  // Handle page change by updating the URL
  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
    router.push(`/people?page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <Main>
      <Heading>List of People</Heading>

      {/* List of People */}
      <ul className="space-y-2">
        {people.map((person) => (
          <li key={person.id}>
            <PersonItem woman={person} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 mx-1 ${
                pageNumber === activePage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </Main>
  );
}
