"use client";

import Hero from "@/components/Hero";
import React, { useEffect, useState } from "react";
import { MdModeNight, BsSunFill } from "react-icons/all";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  // useEffect(() => {
  //   document.documentElement.classList.add("dark");
  // }, []);

  return (
    <>
      <div className="">
        <button
          className="absolute top-5 right-5 text-4xl rotate-45"
          onClick={() => {
            // isDarkMode
            //   ? document.documentElement.classList.add("dark")
            //   : document.documentElement.classList.remove("dark");

            setIsDarkMode(!isDarkMode);
          }}
        >
          {isDarkMode ? <MdModeNight /> : <BsSunFill />}
        </button>
        <Hero />
        <div className="h-screen bg-slate-950" />
      </div>
    </>
  );
}
