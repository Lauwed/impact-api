// pages/people.tsx
import Heading from "@/components/common/Heading";
import Main from "@/components/common/Main";
import Loading from "@/components/Loading";
import PersonItem from "@/components/PersonItem";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetcher } from "@/components/utils/fetcher";
import { Category, Person, Response } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function PeoplePage() {
  const router = useRouter();

  const [activePage, setActivePage] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, error } = useSWR<Response<Person>>(
    `/people?page=${activePage}${
      selectedCategories.length > 0
        ? `&personCategories=${Array.from(selectedCategories).join(",")}`
        : ""
    }&order[name]=asc`,
    fetcher
  );
  const { data: categories, error: categoriesError } = useSWR<
    Response<Category>
  >(`/categories`, fetcher);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data["hydra:totalItems"] / 20));
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;

  // Handle page change by updating the URL
  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
    router.push(`/people?page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <Main>
      <Heading customStyle="mb-6">List of People</Heading>

      {/* Category filters */}
      {categories && !categoriesError ? (
        <Card className="mb-8 shadow-none p-2">
          <ToggleGroup
            type="multiple"
            onValueChange={(value: any) => {
              setSelectedCategories(value);
            }}
            value={selectedCategories}
            className="flex-wrap"
          >
            {categories["hydra:member"].map((category, index) => (
              <ToggleGroupItem
                key={index}
                value={category.name}
                aria-label={category.name}
                // TODO: FINDING A BETTER WAY TO ADD THE COLOR
                style={{
                  backgroundColor: selectedCategories.includes(category.name) ? category.color : undefined
                }}
                className={`data-[state=on]:bg-slate-200`}
              >
                {category.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Card>
      ) : (
        <></>
      )}

      {data ? (
        <>
          {/* List of People */}
          {data["hydra:member"].length > 0 ? <ul className="space-y-2">
            {data["hydra:member"].map((person) => (
              <li key={person.id}>
                <PersonItem woman={person} />
              </li>
            ))}
          </ul> : <p className="text-center">No one matching your research</p>}

          {/* Pagination */}
          {totalPages > 1 ? (
            <Pagination className="flex justify-center mt-6">
              <PaginationContent>
                {activePage > 1 ? (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(activePage - 1)}
                    />
                  </PaginationItem>
                ) : (
                  <></>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={pageNumber === activePage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                {activePage < totalPages ? (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(activePage + 1)}
                    />
                  </PaginationItem>
                ) : (
                  <></>
                )}
              </PaginationContent>
            </Pagination>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Main>
  );
}
