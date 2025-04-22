"use client";

import React, { use } from "react";
import Image from "next/image";
import useJobs from "@/app/Hooks/api/useJobs";
import useTheme from "@/app/Hooks/useTheme";
import { useThemeContext } from "@/app/Hooks/useThemeProvider";
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
  role: {
    content: string;
    items: string[];
  };
};

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const jobs = useJobs();
  const { theme } = useThemeContext();

  if (!jobs) return <p>Loading...</p>;

  return (
    <div>
      {jobs
        ?.filter((job: Job) => job.id === Number(id))
        .map((job: Job) => {
          return (
            <section
              className="w-11/12 mx-auto flex flex-col gap-8"
              key={job.id}
            >
              <div
                className={`w-full  ${
                  theme === "light" ? "bg-white" : "bg-[rgb(25,32,45)]"
                } p-8  relative md: flex items-center gap-4 md:p-0`}
              >
                <div
                  className="w-[50px] h-[50px] md:w-full md:max-w-[300px] md:aspect-[2/1] md:h-auto  md:static absolute top-0 -translate-y-1/2 rounded-[15px] p-2 md:-translate-y-0 md:rounded-[0px] md:p-8"
                  style={{ backgroundColor: `${job.logoBackground}` }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={job.logo}
                      alt="logo"
                      fill
                      className="object-contain"
                    ></Image>
                  </div>
                </div>

                <div className="flex  w-full mt-[40px] md:mt-0 md:w-full gap-4 flex-col items-center md:flex-row md:justify-between  md:p-4">
                  <div className="text-center md:text-left">
                    <p
                      className={` font-bold text-[1.3rem] ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      {job.company}
                    </p>
                    <p className="text-[#6F7E82]">{job.website}</p>
                  </div>
                  <button
                    className={` font-bold  w-fit py-3 px-6 rounded-sm cursor-pointer ${
                      theme === "light"
                        ? "bg-[#EFF1FC] text-blue-500 hover:bg-[#c5c9f4]"
                        : "text-white bg-gray-500/60 hover:bg-gray-500/90"
                    } `}
                  >
                    Company Site
                  </button>
                </div>
              </div>

              <div
                className={`w-full p-8 rounded-[15px] ${
                  theme === "light" ? "bg-white" : "bg-[rgb(25,32,45)]"
                } flex flex-col gap-4`}
              >
                <div className="flex flex-col gap-2  md:flex-row md:justify-between ">
                  <div>
                    <div
                      className={`flex items-center gap-4 ${
                        theme === "light" ? "text-[#536478]" : "text-[#536478]"
                      } `}
                    >
                      <p>{job.postedAt}</p>
                      <p>&bull;</p>
                      <p>{job.contract}</p>
                    </div>

                    <p
                      className={`text-[1.2rem] font-bold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      {job.position}
                    </p>
                    <p className="text-[#5865E0] font-bold">{job.location}</p>
                  </div>
                  <button
                    className={` w-full  md:max-w-[200px]  my-8 p-2 text-white mx-auto md:mx-0 rounded-sm cursor-pointer transition-all duration-300 ease-in-out  bg-[rgb(88,101,224)] hover:bg-[rgb(88,101,224)]/30`}
                  >
                    Apply Now
                  </button>
                </div>

                <div
                  className={` flex flex-col gap-4 ${
                    theme === "light" ? "text-[#8C8F96]" : "text-white"
                  }`}
                >
                  <p>{job.description}</p>

                  <div className="flex flex-col gap-4">
                    <p
                      className={`text-[1.2rem] font-bold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      Requirements
                    </p>
                    <p>{job.requirements.content}</p>

                    <ul className="list-disc pl-5  marker:text-blue-500 space-y-3 ">
                      {job.requirements.items.map(
                        (item: string, index: number) => {
                          return (
                            <li className="md:pl-5" key={index}>
                              {item}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <p
                      className={`text-[1.2rem] font-bold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      What will you do?
                    </p>
                    <p>{job.role.content}</p>

                    <ul className="list-disc pl-5 marker:text-blue-500 space-y-3 ">
                      {job.role.items.map((item: string, index: number) => {
                        return (
                          <li className="md:pl-5" key={index}>
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <footer
                className={`mt-8 w-full p-8 md:flex items-center justify-between ${
                  theme === "light" ? "bg-white" : "bg-[rgb(25,32,45)]"
                } `}
              >
                <div className="hidden md:block">
                  <p
                    className={`text-[1.2rem] font-bold ${
                      theme === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    {job.position}
                  </p>
                  <p
                    className={` font-bold  ${
                      theme === "light" ? "text-gray-900/30" : "text-white"
                    }`}
                  >
                    {job.company}
                  </p>
                </div>

                <button
                  className={` w-full  md:max-w-[200px]  my-8 p-2 text-white mx-auto md:mx-0 rounded-sm cursor-pointer transition-all duration-300 ease-in-out  bg-[rgb(88,101,224)] hover:bg-[rgb(88,101,224)]/30`}
                >
                  Apply Now
                </button>
              </footer>
            </section>
          );
        })}
    </div>
  );
};

export default page;
