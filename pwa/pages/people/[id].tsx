import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../../components/Button";
import Heading from "../../components/common/Heading";
import Main from "../../components/common/Main";
import Section from "../../components/common/Section";
import IdentityField from "../../components/IdentityField";
import AddPersonIdentityFieldModal from "../../components/modals/AddPersonIdentityFieldModal";
import EditMainPersonPicture from "../../components/modals/EditMainPersonPicture";
import { fetcher } from "../../components/utils/fetcher";
import { Person, ResponseSingle } from "../../types";
import { useAuth } from "../../components/context/auth";

const PeopleDetail = ({ woman }: { woman: ResponseSingle<Person> }) => {
  const [identityFieldModalOpen, setIdentityFieldModalOpen] = useState(false);
  const [mainPictureModalOpen, setMainPictureModalOpen] = useState(false);
  const [identityField, setIdentityFields] = useState<string[]>(
    woman.personIdentityFields
  );

  const { data, isLoading, mutate } = useSWR(`/people/${woman.id}`, fetcher);
  const { user } = useAuth();

  useEffect(() => {
    if (data) setIdentityFields(data.personIdentityFields);
  }, [data]);

  return (
    <Main>
      <Section>
        <Heading>{woman.name}</Heading>
      </Section>

      <div className="flex gap-10">
        <section className="w-full">
          <Heading level="h2">Main Picture</Heading>

          {user ? (
            <>
              <Button onClick={() => setMainPictureModalOpen(true)}>
                Edit main picture
              </Button>
              <EditMainPersonPicture
                personId={woman.id}
                modalOpen={mainPictureModalOpen}
                setModalOpen={setMainPictureModalOpen as () => void}
                onClose={() => {
                  mutate();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </section>

        <Section customClass="border border-black p-4 rounded w-fit min-w-fit">
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
