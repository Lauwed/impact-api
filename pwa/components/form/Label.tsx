import { ReactNode } from "react";

const Label = (props: { htmlFor: string; children: ReactNode }) => {
  return <label htmlFor={props.htmlFor} className="block mb-2">{props.children}</label>;
};

export default Label;