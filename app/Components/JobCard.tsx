import React from "react";
import useTheme from "../Hooks/useTheme";
import Image from "next/image";
import Link from "next/link";

type JobCardProps = {
  id: number;
  posted: string;
  contract: string;
  location: string;
  position: string;
  company: string;
  logoBG: string;
  theme: string;
};

const JobCard: React.FC<JobCardProps> = ({
  posted,
  contract,
  location,
  position,
  company,
  logoBG,
  theme,
  id,
}) => {
  return (
    <Link href={`/jobs/${id}`}>
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-[#19202D] text-white"
        } p-8 pt-12 rounded-[10px] relative cursor-pointer`}
      >
        <div
          className=" w-[50px] h-[50px] absolute rounded-[15px] p-2 top-0 -translate-y-1/2"
          style={{ backgroundColor: `${logoBG}` }}
        >
          <div className="w-full h-full relative">
            <Image
              src={`/assets/logos/${company
                .toLowerCase()
                .replace(/\s+/g, "")}.svg`}
              alt="logo"
              fill
              className="object-contain"
            ></Image>
          </div>
        </div>
        <div className={` text-[#7286A4] flex gap-2`}>
          <p>{posted}</p>
          <p>&bull;</p>
          <p>{contract}</p>
        </div>
        <p
          className={`text-[1.3rem] font-bold ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          {position}
        </p>
        <p className="text-[#7286A4]">{company}</p>

        <p className="mt-8 font-bold text-[#7464E0]">{location}</p>
      </div>
    </Link>
  );
};

export default JobCard;
