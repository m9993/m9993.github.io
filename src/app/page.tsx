"use client";

import DarkmodeBtn from "@/components/DarkmodeBtn";
import Hero from "@/components/Hero";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="">
        <DarkmodeBtn className="absolute top-5 right-5 md:top-8 md:right-8" />
        <Hero className="h-screen" />
        <div className="h-screen bg-slate-950" />
      </div>
    </>
  );
}
