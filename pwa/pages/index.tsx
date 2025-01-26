import PersonItem from "@/components/PersonItem";
import ContributeCard from "@/components/cards/Contribute";
import WomenNumberCard from "@/components/cards/WomenNumber";
import Kbd from "@/components/common/Kbd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Heading from "../components/common/Heading";
import Main from "../components/common/Main";
import Section from "../components/common/Section";
import { Person, Response } from "../types";

const Welcome = ({
  repo,
  count,
}: {
  repo: Response<Person>;
  count: number;
}) => {
  return (
    <Main>
      <Head>
        <title>IMPACT project</title>
        <meta property="og:title" content="IMPACT project" key="title" />
      </Head>
      <Section customClass="mb-12">
        <Heading customStyle="text-center mb-8">Welcome to IMPACT</Heading>
        <div className="flex flex-col items-center md:flex-row gap-6 md:gap-20">
          <Image
            className="object-contain"
            src="/logo.png"
            width={200}
            height={200}
            alt="Logo of IMPACT"
          />
          <p>
            IMPACT, stands for{" "}
            <Kbd>
              Initiative for Minoritized Pioneers and Achievements in Computer
              Technology
            </Kbd>
            , is an open-source project that can be described as Wiki-like,
            focused on women. The goal is to gather as much information as
            possible about women who have influenced computing in order to
            create biographies and other content
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:justify-center md:gap-12">
          <WomenNumberCard count={count} />
          <ContributeCard />
        </div>
      </Section>

      <Section>
        <Heading level="h2" customStyle="mb-6">Women</Heading>

        <ul className="flex flex-col gap-6">
          {repo["hydra:member"].map((woman: Person, i) => (
            <li key={`woman-${i}`}>
              <PersonItem woman={woman} />
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

  const countRes = await fetch("http://php/count", {
    headers: {
      accept: "application/ld+json",
    },
  });
  let count: { total: number } = await countRes.json();

  // Pass data to the page via props
  return { props: { repo, count: count.total } };
}) satisfies GetServerSideProps<{ repo: Response<Person>; count: number }>;
