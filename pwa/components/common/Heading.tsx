import React, { ReactNode } from "react";
import Tag from "./Tag";

export type headingLevel = "h1" | "h2" | "h3" | "h4" | "h5"

type HeadingType = {
  level?: headingLevel;
  children: ReactNode;
};

const Heading: React.FC<HeadingType> = ({ level = "h1", children }) => {
  const styles = {
    h1: "text-5xl font-black mb-4",
    h2: "text-3xl font-bold mb-4",
    h3: "text-xl font-bold mb-2",
    h4: "",
    h5: "",
  };

  return (
    <Tag tagName={level} className={styles[level]}>
      {children}
    </Tag>
  );
};

export default Heading;
