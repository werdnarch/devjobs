"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider, useThemeContext } from "../Hooks/useThemeProvider";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <main
      className={` min-h-[100%] root  ${
        theme === "light" ? "bg-[#F4F7F9]" : "bg-[#131720]"
      }`}
    >
      <div className="max-w-[1380px] mx-auto w-full">
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

        <section>{children}</section>
      </div>
    </main>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <LayoutContent>{children}</LayoutContent>
  </ThemeProvider>
);

export default Layout;
