"use client";

import Reveal from "@/AnimationWraps/Reveal";
import Certifications from "@/components/Certifications";
import ContactInfo from "@/components/ContactInfo";
import DarkmodeBtn from "@/components/DarkmodeBtn";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ScrollToTop from "@/components/ScrollToTop";
import Skills from "@/components/Skills";
import React from "react";

export default function Home() {
  return (
    <>
      <DarkmodeBtn className="absolute top-5 right-5 md:top-8 md:right-8" />
      <Hero className="h-screen" />
      <div
        className="px-4"
        // className="lg:flex justify-around items-center gap-5"
      >
        <Education className="md:w-2/3 mx-auto" />
        <Skills />
        <Certifications />
        <Projects />
        <ContactInfo />
      </div>
      <ScrollToTop />
      <div className="my-10"></div>
    </>
  );
}
