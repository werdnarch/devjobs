"use client";
import { useEffect, useState } from "react";

export default function useJobs() {
  const [data, setData] = useState<any[] | null>(null);

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
        localStorage.setItem("data", JSON.stringify(fetchedData));
      }
    };

    fetchData();
  }, []);

  return data;
}
