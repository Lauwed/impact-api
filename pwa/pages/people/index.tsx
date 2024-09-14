// pages/people.tsx
import Card from "@/components/Card";
import Heading from "@/components/common/Heading";
import Main from "@/components/common/Main";
import IdentityField from "@/components/IdentityField";
import Loading from "@/components/Loading";
import PersonItem from "@/components/PersonItem";
import Tag from "@/components/Tag";
import { fetcher } from "@/components/utils/fetcher";
import { Categories } from "@/enums";
import { Category, Person, Response } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function PeoplePage() {
  const router = useRouter();

  const [activePage, setActivePage] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const { data, error, mutate } = useSWR<Response<Person>>(
    `/people?page=${activePage}${
      selectedCategories.size > 0
        ? `&personCategories=${Array.from(selectedCategories).join(",")}`
        : ""
    }`,
    fetcher
  );
  const { data: categories, error: categoriesError } = useSWR<
    Response<Category>
  >(`/categories`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;

  const totalPages = Math.ceil(data["hydra:totalItems"] / 20);

  // Handle page change by updating the URL
  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
    router.push(`/people?page=${newPage}`, undefined, { shallow: true });
  };

  const handleCategoryClick = (name: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      const newSelectedCategories = new Set(prevSelectedCategories);
      if (newSelectedCategories.has(name)) {
        newSelectedCategories.delete(name);
      } else {
        newSelectedCategories.add(name);
      }
      return newSelectedCategories;
    });
  };

  return (
    <Main>
      <Heading>List of People</Heading>

      {/* Category filters */}
      {categories && !categoriesError ? (
        <ul className="flex flex-wrap gap-2 mb-8">
          {categories["hydra:member"].map((category) => (
            <Tag
              label={Categories[category.name as keyof typeof Categories]}
              onClick={() => handleCategoryClick(category.name)}
              color={
                selectedCategories.has(category.name) ? category.color : "#E2E8F0"
              }
            />
          ))}
        </ul>
      ) : (
        <></>
      )}

      {/* List of People */}
      <ul className="space-y-2">
        {data["hydra:member"].map((person) => (
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
