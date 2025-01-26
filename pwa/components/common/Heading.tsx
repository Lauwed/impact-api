import React, { ReactNode } from "react";
import Tag from "./Tag";
// import Tag from "./Tag";

export type headingLevel = "h1" | "h2" | "h3" | "h4" | "h5";

type HeadingType = {
  level?: headingLevel;
  levelStyle?: headingLevel;
  customStyle?: string;
  children: ReactNode;
};

const Heading: React.FC<HeadingType> = ({
  level = "h1",
  children,
  levelStyle,
  customStyle = "",
}) => {
  const styles = {
    h1: "text-5xl font-black",
    h2: "text-3xl font-bold",
    h3: "text-xl font-bold",
    h4: "font-bold",
    h5: "",
  };

  return (
    <Tag
      tagName={level}
      className={`${styles[levelStyle || level]} ${customStyle}`}
    >
      {children}
    </Tag>
  );
};

export default Heading;
