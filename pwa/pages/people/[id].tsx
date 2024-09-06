import { GetServerSideProps } from "next";
import Heading from "../../components/common/Heading";
import Main from "../../components/common/Main";
import Section from "../../components/common/Section";
import IdentityField from "../../components/IdentityField";
import { Person, ResponseSingle } from "../../types";

const PeopleDetail = ({ woman }: { woman: ResponseSingle<Person> }) => {
  return (
    <Main>
      <Section>
        <Heading>{woman.name}</Heading>
      </Section>

      <Section customClass="border border-black p-4 rounded w-fit">
        <Heading level="h2">Identity</Heading>

        <ul>
          {woman.personIdentityFields.map((identityField, index) => (
            <li key={index}>
              <IdentityField uri={identityField} />
            </li>
          ))}
        </ul>
      </Section>
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
