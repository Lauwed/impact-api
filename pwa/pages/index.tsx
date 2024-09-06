import { GetServerSideProps } from "next";
import Card from "../components/Card";
import Heading from "../components/common/Heading";
import Main from "../components/common/Main";
import Section from "../components/common/Section";
import { Person, Response } from "../types";
import IdentityField from "../components/IdentityField";

const Welcome = ({ repo }: { repo: Response<Person> }) => {
  console.log(repo);

  return (
    <Main>
      <Section>
        <Heading>Welcome to IMPACT</Heading>
        <p>
          IMPACT, stands for{" "}
          <span className="uppercase text-sm">
            Initiative for Minoritized Pioneers and Achievements in Computer
            Technology
          </span>
          , is an open-source project that can be described as Wiki-like,
          focused on women. The goal is to gather as much information as
          possible about women who have influenced computing in order to create
          biographies and other content
        </p>
      </Section>

      <Section>
        <Heading level="h2">Women</Heading>

        <ul>
          {repo["hydra:member"].map((woman: Person) => (
            <li>
              <Card
                titleLevel="h3"
                title={woman.name}
                url={`/people/${woman.id}`}
              >
                <ul>
                  {woman.personIdentityFields.map((identityField, index) => (
                    <li key={index}>
                      <IdentityField uri={identityField} />
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </Main>
  );
};
export default Welcome;

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch("http://php/people?page=1", {
    headers: {
      accept: "application/ld+json",
    },
  });
  let repo: Response<Person> = await res.json();

  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Response<Person> }>;
