import { Person, Response as ResponseMany } from "@/types";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import LogoutButton from "../auth/LogoutButton";
import { useAuth } from "../context/auth";
import { Input } from "../ui/input";
import { fetcher } from "../utils/fetcher";

// import logo from "../public/logo.png";
import Image from "next/image";
import Button from "../Button";

export default () => {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [menuOpen, toggleMenuOpen] = useState<boolean>(false);

  // SWR hook for fetching search results
  const { data: searchResults, error } = useSWR<ResponseMany<Person>>(
    searchQuery ? `/people?q=${encodeURIComponent(searchQuery)}` : null,
    fetcher
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(
      typeof searchResults != "undefined" &&
        searchResults["hydra:member"] &&
        searchResults["hydra:member"].length > 0
    );
  }, [searchResults]);

  const handleProfileClick = (profileId: number) => {
    router.push(`/people/${profileId}`);
    setIsDropdownOpen(false);
  };

  const handleClickMenu = () => {
    toggleMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              className="w-40 h-8 object-contain"
              src="/logo.png"
              width={200}
              height={200}
              alt="Logo of IMPACT"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end mr-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative" ref={dropdownRef}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search profiles... (Ctrl+K)"
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
              />
              {isDropdownOpen &&
                searchResults &&
                searchResults["hydra:member"] &&
                searchResults["hydra:member"].length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {searchResults["hydra:member"].map((profile) => (
                      <div
                        key={profile.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleProfileClick(profile.id)}
                      >
                        <div className="font-medium">{profile.name}</div>
                        {/* <div className="text-sm text-gray-500">{profile.role}</div> */}
                      </div>
                    ))}
                  </div>
                )}
              {error && (
                <div className="absolute z-10 w-full mt-1 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md">
                  Error fetching results. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="">
          <Button onClick={handleClickMenu} customStyle="z-[100]">
            {menuOpen ? "Close menu" : "Open menu"}
          </Button>

          <ul className="flex flex-col justify-center bg-white gap-6 p-6 text-sm font-medium fixed top-0 left-0 w-full h-screen z-10">
            <li>
              <Link className="border p-8" href="/people">People</Link>
            </li>
            {user ? (
              <li>
                <Link className="border p-8" href="/people/create">Add a person</Link>
              </li>
            ) : (
              <></>
            )}
            {/* <Link href="/categories">Categories</Link> */}
            {/* <Link href="/about">About</Link> */}
            {/* <Link href="/contribute">Contribute</Link> */}

            {user && user.roles.includes("ROLE_ADMIN") ? (
              <li>
                <Button customStyle="border p-8" linkPath="/admin">Admin</Button>
              </li>
            ) : (
              <></>
            )}

            <li className="border p-8">
              {user ? (
                <div className="flex items-center gap-2">
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
                </div>
              ) : (
                <Button linkPath="/login">Login</Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
