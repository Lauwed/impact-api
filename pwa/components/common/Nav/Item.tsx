import Button from "@/components/Button";
import React, { ReactElement } from "react";

interface NavItemProps {
  path?: string;
  children: string | ReactElement;
}

const NavItem: React.FC<NavItemProps> = ({ children, path }) => {
  return (
    <li>
      <Button customStyle="!p-12 w-full md:!p-2" linkPath={path}>
        {children}
      </Button>
    </li>
  );
};

export default NavItem;
