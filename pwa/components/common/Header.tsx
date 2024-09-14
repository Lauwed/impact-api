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

export default () => {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {user ? <Link href="/people/create">Add a person</Link> : <></>}
            {/* <Link href="/profiles">People</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/about">About</Link>
            <Link href="/contribute">Contribute</Link> */}
          </nav>

          {user && user.roles.includes("ROLE_ADMIN") ? (
            <Link
              className="text-sm font-medium p-2 border hover:bg-slate-300 transition-all ml-4"
              href="/admin"
            >
              Admin
            </Link>
          ) : (
            <></>
          )}
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

        {user ? (
          <div className="flex items-center gap-2">
            <p>{user.username}</p>
            <LogoutButton />
          </div>
        ) : (
          <Link
            className="text-sm font-medium p-2 border hover:bg-slate-300 transition-all"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
