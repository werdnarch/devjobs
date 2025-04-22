import React from "react";
import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<string>("theme", "light");

  const toggleTheme = () => {
    setTheme((prev: string) => (prev === "light" ? "dark" : "light"));
  };
  return { theme, toggleTheme };
};

export default useTheme;
