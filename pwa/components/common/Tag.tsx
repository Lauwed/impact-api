import React, { ReactNode } from "react";

type TagType = {
  tagName: string;
  children: ReactNode;
  className: string;
};

const Tag: React.FC<TagType> = ({ tagName, children, ...props }) =>
  React.createElement(tagName, props, children);

export default Tag;
