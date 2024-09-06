import { ReactNode } from "react";

type SectionType = {
  children: ReactNode;
  customClass?: string;
};

const Section: React.FC<SectionType> = ({ children, customClass = '' }) => {
  return <section className={`py-4 ${customClass}`}>{children}</section>;
};

export default Section;
