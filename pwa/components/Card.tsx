import Link from "next/link";
import React, { ReactNode } from "react";
import Heading, { headingLevel } from "./common/Heading";

type CardType = {
  title: string;
  titleLevel?: headingLevel;
  children: ReactNode;
  url?: string;
};

const Card: React.FC<CardType> = ({
  title,
  titleLevel = "h2",
  url,
  children,
}) => {
  return (
    <article className="p-4 border border-black rounded relative">
      <Heading level={titleLevel}>{title}</Heading>
      {children}

      {url ? (
        <Link
          href={url}
          className="absolute top-0 left-0 block w-full h-full whitespace-nowrap indent-[-2000%] overflow-hidden"
        >
          Read mor about {title}
        </Link>
      ) : (
        <></>
      )}
    </article>
  );
};

export default Card;
