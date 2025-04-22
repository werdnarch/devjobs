"use client";
import Image from "next/image";
import useTheme from "./Hooks/useTheme";
import { useState, useEffect } from "react";
import JobCard from "./Components/JobCard";
import FilterModal from "./Components/Modal/FilterModal";
import Link from "next/link";

type Job = {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: {
    content: string;
    items: string[];
  };
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState<string>("");
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any | null>(null);
  const [isFulltime, setIsFullTime] = useState<boolean>(false);
  const [filterMenuActive, setFilterMenuActive] = useState<boolean>(false);
  const [displayCount, setdisplayCount] = useState<number>(9);

  function LoadMoreButton() {
    setdisplayCount((prev) => prev + 9);
  }

  function handleLocationSearch() {
    const normalized = locationInput.trim().replace(/\s+/g, " "); // collapse multiple spaces into one

    if (normalized === "") return setdisplayCount(data.length);
    setLocationSearch(normalized);
    setdisplayCount(data.length);
  }

  function handleLocationSearchKeydown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      const normalized = locationInput.trim().replace(/\s+/g, " "); // collapse multiple spaces into one
      if (normalized === "") return setdisplayCount(data.length);
      setLocationSearch(normalized);
      setdisplayCount(data.length);
    }
  }

  function handleSearch() {
    const normalized = input.trim().replace(/\s+/g, " "); // collapse multiple spaces into one

    if (normalized === "") return setdisplayCount(data.length);

    setSearch(normalized);
    setdisplayCount(data.length);
  }

  function handleSearchKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const normalized = input.trim().replace(/\s+/g, " "); // collapse multiple spaces into one

      if (normalized === "") return setdisplayCount(data.length);
      setSearch(normalized);
      setdisplayCount(data.length);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("data");

      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || ""}/data.json`
        );
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log(fetchedData);
        localStorage.setItem("data", JSON.stringify(fetchedData));
      }
    };
    fetchData();
  }, []);

  return (
    <main
      className={`root min-h-[100%] ${
        theme === "light" ? "bg-[#F4F7F9]" : "bg-[#131720]"
      } p-4`}
    >
      <div className="w-full max-w-[1380px] mx-auto">
        <header className="p-4 py-10 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="dev-jobs-logo"
              width={100}
              height={50}
              style={{ height: "auto" }}
            ></Image>
          </Link>

          <div onClick={toggleTheme} className="flex items-center gap-2">
            <Image
              src="/assets/desktop/icon-sun.svg"
              alt="light-mode"
              width={15}
              height={15}
            ></Image>
            <div
              className={`p-[2px] flex items-center transition-color duration-300 ease-in-out ${
                theme === "light" ? "bg-white" : "bg-black"
              } rounded-full w-10`}
            >
              <div
                className={`w-4 h-4 bg-[#5865E0] rounded-full transition-transform duration-300 ease-in-out cursor-pointer ${
                  theme === "light" ? "translate-x-0" : "translate-x-5"
                }`}
              ></div>
            </div>
            <Image
              src="/assets/desktop/icon-moon.svg"
              alt="dark-mode"
              width={15}
              height={15}
            ></Image>
          </div>
        </header>
        <section className="w-11/12 mx-auto mt-8">
          <div
            className={`${
              theme === "light" ? "bg-white" : "bg-[#19202D]"
            } w-full p-4 rounded-[10px] flex items-center gap-4 md:p-0 md:px-4`}
          >
            {" "}
            <Image
              src="/assets/desktop/icon-search.svg"
              alt="search"
              width={20}
              height={20}
            ></Image>
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSearchKeydown}
              type="text"
              className={`w-full outline-none placeholder:text-[#646B73]
                 ${theme === "light" ? "text-black" : "text-white "}`}
              placeholder="Filter by title..."
            ></input>
            <button
              onClick={() => setFilterMenuActive((prev) => !prev)}
              className="cursor-pointer p-2 flex items-center justify-center transition-border duration-300 ease-in-out hover:border-gray-200/10 hover:border md:hidden "
            >
              <Image
                src="/assets/mobile/icon-filter.svg"
                alt="search"
                width={15}
                height={15}
                className="md:hidden cursor-pointer"
              ></Image>
            </button>
            <button
              onClick={handleSearch}
              className={`bg-[rgb(88,101,224)] hover:bg-blue-400/90 p-2 flex items-center justify-center rounded-[5px] md:hidden cursor-pointer`}
            >
              <Image
                src="/assets/desktop/icon-search-white.svg"
                alt="search"
                width={20}
                height={20}
              ></Image>
            </button>
            <div className="hidden md:flex border-l border-r border-gray-500/20  items-center gap-2 py-6 px-4 w-full">
              <Image
                src="/assets/desktop/icon-location.svg"
                alt="location-icon"
                width={20}
                height={20}
                className=""
              ></Image>
              <input
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={handleLocationSearchKeydown}
                type="text"
                className={`w-full outline-none placeholder:text-[#646B73]
                 ${theme === "light" ? "text-black" : "text-white "}`}
                placeholder="Filter by location"
              ></input>
            </div>
            <div className="hidden md:flex items-center justify-between gap-4 w-full">
              <label className="flex gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  onClick={() => {
                    setIsFullTime((prev) => !prev),
                      setdisplayCount(data.length);
                  }}
                  className={` appearance-none border-none rounded-sm cursor-pointer w-5 h-5  ${
                    theme === "light"
                      ? "text-black bg-[#D5D8F7]"
                      : "text-white bg-[#313743]"
                  } checked:bg-[#5865E0]`}
                ></input>
                <p
                  className={`${
                    theme === "light" ? "text-[#646B73]" : "text-white"
                  }`}
                >
                  Full-Time
                </p>
              </label>

              <button
                onClick={() => {
                  handleSearch(), handleLocationSearch();
                }}
                className="hidden md:block text-white p-2 px-3 rounded-sm font-bold bg-[#5865E0] transition-all duration-300 ease-in-out hover:bg-[#7A82CD] cursor-pointer "
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-12 mt-12 md:grid grid-cols-2 lg:grid-cols-3">
            {data
              ?.filter(
                (job: Job) =>
                  job.id <= displayCount &&
                  (search === "" ||
                    job.position
                      .toLowerCase()
                      .includes(search.toLowerCase())) &&
                  (!isFulltime || job.contract.toLowerCase() === "full time") &&
                  (locationSearch === "" ||
                    job.location
                      .toLowerCase()
                      .includes(locationSearch.toLowerCase()))
              )
              .map((data: Job) => {
                return (
                  <JobCard
                    id={data.id}
                    theme={theme}
                    logoBG={data.logoBackground}
                    key={data.id}
                    position={data.position}
                    contract={data.contract}
                    location={data.location}
                    posted={data.postedAt}
                    company={data.company}
                  />
                );
              })}
          </div>
          {displayCount < data?.length && (
            <div className="w-full flex items-center justify-center mt-8">
              <button
                onClick={LoadMoreButton}
                className="bg-[#5865E0] font-bold text-white py-2  px-4 rounded-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#7A82CD]"
              >
                Load More
              </button>
            </div>
          )}

          {filterMenuActive && (
            <FilterModal setFilterMenuActive={setFilterMenuActive}>
              <div
                onClick={(e) => e.stopPropagation()}
                className={` ${
                  theme === "light" ? "bg-white" : "bg-[#19202D]"
                } p-4 rounded-sm w-11/12`}
              >
                <div className="flex  border-gray-500/20  items-center gap-2 py-4  w-full">
                  <Image
                    src="/assets/desktop/icon-location.svg"
                    alt="location-icon"
                    width={20}
                    height={20}
                    className=""
                  ></Image>
                  <input
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLocationSearchKeydown(e);
                        setFilterMenuActive(false);
                      }
                    }}
                    type="text"
                    className={`w-full outline-none placeholder:text-[#646B73]
                 ${theme === "light" ? "text-black" : "text-white "}`}
                    placeholder="Filter by location"
                  ></input>
                </div>
                <hr className="border-gray-500/20 border-b mb-4 "></hr>
                <div className=" flex flex-col  justify-between gap-4 w-full">
                  <label className="flex gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      onClick={() => {
                        setIsFullTime((prev) => !prev),
                          setdisplayCount(data.length);
                      }}
                      className={` appearance-none border-none rounded-sm cursor-pointer w-5 h-5  ${
                        theme === "light"
                          ? "text-black bg-[#D5D8F7]"
                          : "text-white bg-[#313743]"
                      } checked:bg-[#5865E0]`}
                    ></input>
                    <p
                      className={`${
                        theme === "light" ? "text-[#646B73]" : "text-white"
                      }`}
                    >
                      Full-Time
                    </p>
                  </label>

                  <button
                    onClick={() => {
                      setFilterMenuActive(false);
                      handleSearch();
                      handleLocationSearch();
                    }}
                    className=" w-full text-white p-2 px-3 rounded-sm font-bold bg-[#5865E0] transition-all duration-300 ease-in-out hover:bg-[#7A82CD] cursor-pointer "
                  >
                    Search
                  </button>
                </div>
              </div>
            </FilterModal>
          )}
        </section>
      </div>
    </main>
  );
}
