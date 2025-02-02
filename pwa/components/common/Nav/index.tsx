import LogoutButton from "@/components/auth/LogoutButton";
import Button from "@/components/Button";
import { useAuth } from "@/components/context/auth";

import { useState } from "react";
import NavItem from "./Item";

const Nav = () => {
  const { user } = useAuth();
  const [menuOpen, toggleMenuOpen] = useState<boolean>(false);

  const handleClickMenu = () => {
    toggleMenuOpen(!menuOpen);
  };

  return (
    <nav className="">
      <Button onClick={handleClickMenu} customStyle="relative z-20 md:hidden">
        {menuOpen ? "Close menu" : "Open menu"}
      </Button>

      <ul
        className={`${
          menuOpen ? "translate-y-0" : "translate-y-[-100%]"
        } transition flex flex-col justify-center bg-white gap-6 p-6 text-sm font-medium fixed top-0 left-0 w-full h-screen z-10 md:translate-y-0 md:relative md:w-auto md:h-auto md:flex-row md:bg-transparent md:p-0 md:gap-2`}
      >
        <NavItem path="/people">People</NavItem>
        {user ? <NavItem path="/people/create">Add a person</NavItem> : <></>}
        {/* <Link href="/categories">Categories</Link> */}
        {/* <Link href="/about">About</Link> */}
        {/* <Link href="/contribute">Contribute</Link> */}

        {user && user.roles.includes("ROLE_ADMIN") ? (
          <NavItem path="/admin">Admin</NavItem>
        ) : (
          <></>
        )}

        {user ? (
          <li className="flex justify-center items-center gap-2 border p-8 md:border-0 md:p-0">
            <svg
              className="w-6 h-6"
              viewBox="0 0 1206 1206"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1205.33 602.667c0 190.973-88.82 361.2-227.423 471.613-102.947 82.04-233.374 131.05-375.24 131.05-141.867 0-272.294-49.01-375.24-131.05C88.827 963.867 0 793.64 0 602.667 0 269.827 269.827 0 602.667 0c332.84 0 602.663 269.827 602.663 602.667Z"
                fill="#CAD5D5"
              />
              <path
                d="M837 489.495C837 641.279 732.08 692 602.667 692c-129.414 0-234.334-50.721-234.334-202.505 0-151.783 104.92-274.828 234.334-274.828C732.08 214.667 837 337.712 837 489.495ZM977.907 1074.28c-102.947 82.04-233.374 131.05-375.24 131.05-141.867 0-272.294-49.01-375.24-131.05 0-196.947 198.293-278.28 375.24-278.28 176.946 0 375.24 102.667 375.24 278.28Z"
                fill="#A1B0B1"
              />
            </svg>
            <p>{user.username}</p>
            <LogoutButton />
          </li>
        ) : (
          <NavItem path="/login">Login</NavItem>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
