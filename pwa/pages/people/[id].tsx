import JobField from "@/components/JobField";
import AddPersonJobModal from "@/components/modals/AddPersonJobModal";
import AddPersonSchoolModal from "@/components/modals/AddPersonSchoolModal";
import SchoolField from "@/components/SchoolField";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../../components/Button";
import Heading from "../../components/common/Heading";
import Main from "../../components/common/Main";
import Section from "../../components/common/Section";
import { useAuth } from "../../components/context/auth";
import IdentityField from "../../components/IdentityField";
import AddPersonIdentityFieldModal from "../../components/modals/AddPersonIdentityFieldModal";
import EditMainPersonPicture from "../../components/modals/EditMainPersonPicture";
import { fetcher } from "../../components/utils/fetcher";
import { Person, ResponseSingle } from "../../types";
import Tag from "@/components/Tag";
import AddPersonCategoryModal from "@/components/modals/AddPersonCategoryModal";
import CategoryField from "@/components/CategoryField";

const PeopleDetail = ({ woman }: { woman: ResponseSingle<Person> }) => {
  const [identityFieldModalOpen, setIdentityFieldModalOpen] = useState(false);
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [mainPictureModalOpen, setMainPictureModalOpen] = useState(false);
  const [identityField, setIdentityFields] = useState<string[]>(
    woman.personIdentityFields
  );
  const [schools, setSchools] = useState<string[]>(woman.personSchools);
  const [jobs, setJobs] = useState<string[]>(woman.personJobs);

  const [categories, setCategories] = useState<string[]>(
    woman.personCategories
  );
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const { data, isLoading, mutate } = useSWR(`/people/${woman.id}`, fetcher);
  const { user } = useAuth();

  useEffect(() => {
    if (data) {
      setIdentityFields(data.personIdentityFields);
      setSchools(data.personSchools);
      setJobs(data.personJobs);
      setCategories(data.personCategories);
    }
  }, [data]);

  return (
    <Main>
      <Section>
        <Heading>{woman.name}</Heading>
        {woman.romanizedName ? <p>{woman.romanizedName}</p> : <></>}

        {/* Categories Section */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <CategoryField key={index} uri={category} actions />
            ))
          ) : (
            <p className="text-slate-700 text-sm">
              No categories assigned yet.
            </p>
          )}

          {/* Add Category Button */}
          {user && (
            <Button onClick={() => setIsAddCategoryModalOpen(true)}>+</Button>
          )}
        </div>

        <AddPersonCategoryModal
          personId={woman.id}
          modalOpen={isAddCategoryModalOpen}
          setModalOpen={setIsAddCategoryModalOpen as () => void}
          onClose={() => {
            mutate();
          }}
        />
      </Section>

      <div className="flex gap-10 mb-10">
        <section className="w-1/2 m-w-1/2">
          <Heading level="h2">Main Picture</Heading>

          {user ? (
            <>
              {/* <Button onClick={() => setMainPictureModalOpen(true)}>
                Edit main picture
              </Button>
              <EditMainPersonPicture
                personId={woman.id}
                modalOpen={mainPictureModalOpen}
                setModalOpen={setMainPictureModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              /> */}
            </>
          ) : (
            <></>
          )}
        </section>

        {/* IDENTITY FIELDS */}
        <Section customClass="border border-black p-4 rounded w-1/2 m-w-1/2">
          <Heading level="h2">Identity</Heading>

          {identityField.length > 0 ? (
            <ul className="mb-4">
              {identityField.map((identityField, index) => (
                <li key={index}>
                  <IdentityField actions uri={identityField} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4">No identity information yet.</p>
          )}

          {user ? (
            <>
              <Button onClick={() => setIdentityFieldModalOpen(true)}>
                Add an identity information
              </Button>
              <AddPersonIdentityFieldModal
                personId={woman.id}
                modalOpen={identityFieldModalOpen}
                setModalOpen={setIdentityFieldModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Section>
      </div>

      <div className="flex gap-10">
        {/* SCHOOLS */}
        <Section customClass="border border-black p-4 rounded w-1/2 m-w-1/2">
          <Heading level="h2">Schools</Heading>

          {schools.length > 0 ? (
            <ul className="mb-4">
              {schools.map((school, index) => (
                <li key={index}>
                  <SchoolField actions uri={school} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4">No school information yet.</p>
          )}

          {user ? (
            <>
              <Button onClick={() => setSchoolModalOpen(true)}>
                Add a school information
              </Button>
              <AddPersonSchoolModal
                personId={woman.id}
                modalOpen={schoolModalOpen}
                setModalOpen={setSchoolModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Section>

        {/* JOBS */}
        <Section customClass="border border-black p-4 rounded w-1/2 m-w-1/2">
          <Heading level="h2">Jobs</Heading>

          {jobs.length > 0 ? (
            <ul className="mb-4">
              {jobs.map((job, index) => (
                <li key={index}>
                  <JobField actions uri={job} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4">No job information yet.</p>
          )}

          {user ? (
            <>
              <Button onClick={() => setJobModalOpen(true)}>
                Add a job information
              </Button>
              <AddPersonJobModal
                personId={woman.id}
                modalOpen={jobModalOpen}
                setModalOpen={setJobModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Section>
      </div>
    </Main>
  );
};

export default PeopleDetail;

export const getServerSideProps = (async (req) => {
  // Fetch data from external API
  const res = await fetch(`http://php/people/${req.query.id}`, {
    headers: {
      accept: "application/ld+json",
    },
  });
  const repo: ResponseSingle<Person> = await res.json();

  // Pass data to the page via props
  return { props: { woman: repo } };
}) satisfies GetServerSideProps<{ woman: ResponseSingle<Person> }>;
