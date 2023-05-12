"use client";

import Reveal from "@/AnimationWraps/Reveal";
import DarkmodeBtn from "@/components/DarkmodeBtn";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import React from "react";

export default function Home() {
  return (
    <>
      <DarkmodeBtn className="absolute top-5 right-5 md:top-8 md:right-8" />
      <Hero className="h-screen" />
      <Education/>
      <div className="h-screen"></div>
    </>
  );
}
