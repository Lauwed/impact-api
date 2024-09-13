import { ReactNode } from "react";

type MainType = {
  children: ReactNode;
};

const Main: React.FC<MainType> = ({ children }) => {
  return <main className="p-4 max-w-5xl m-auto">{children}</main>;
};

export default Main;
