import CounterAnimation from "@/components/CounterAnimation";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Card from "../components/Card";
import IdentityField from "../components/IdentityField";
import Heading from "../components/common/Heading";
import Main from "../components/common/Main";
import Section from "../components/common/Section";
import { Person, Response } from "../types";
import Image from "next/image";
import Kbd from "@/components/common/Kbd";
import { BookType, Github } from "lucide-react";
import PersonItem from "@/components/PersonItem";

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
      <Section>
        <Heading>Welcome to IMPACT</Heading>
        <div className="flex flex-col md:flex-row gap-6 md:gap-20">
          <Image
            className="object-contain"
            src="/logo.png"
            width={200}
            height={200}
            alt="Logo of IMPACT"
          />
          <p>
            IMPACT, stands for{" "}
            <Kbd>Initiative for Minoritized Pioneers and Achievements in Computer
            Technology</Kbd>
            , is an open-source project that can be described as Wiki-like,
            focused on women. The goal is to gather as much information as
            possible about women who have influenced computing in order to
            create biographies and other content
          </p>
        </div>
      </Section>

      <Section customClass="flex flex-col items-center">
        <Heading level="h2" customStyle="mb-0">
          Number of women
        </Heading>
        <p>Encoded at the moment</p>
        <CounterAnimation target={count} />
      </Section>

      <Section customClass="flex flex-col items-center gap-2">
        <Heading level="h2" customStyle="mb-0">
          Want to contribute ?
        </Heading>
        <p className="text-center max-w-[500px]">
          You can contribute to the project either by submitting PRs to the
          Github repository, or by helping me completing the women&nbsp;profiles
        </p>
        <div className="flex gap-4">
          <a
            className="text-sm font-medium p-2 border hover:bg-slate-300 transition-all flex gap-2 items-center"
            href="https://github.com/Lauwed/impact-api"
          >
            <Github /> Github
          </a>
          <a
            className="text-sm font-medium p-2 border hover:bg-slate-300 transition-all flex gap-2 items-center"
            href="https://tally.so/r/waEAXW"
          >
            <BookType /> Register to the alpha
          </a>
        </div>
      </Section>

      <Section>
        <Heading level="h2">Women</Heading>

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
