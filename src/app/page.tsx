"use client";

import Certifications from "@/components/Certifications";
import ContactInfo from "@/components/ContactInfo";
import DarkmodeBtn from "@/components/DarkmodeBtn";
import Education from "@/components/Education";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ScrollToTop from "@/components/ScrollToTop";
import Skills from "@/components/Skills";
import AnimatedBackground from "@/AnimationWraps/AnimatedBackground";
import React from "react";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/AnimationWraps/Reveal";

export default function Home() {
  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />


      <DarkmodeBtn className="absolute top-5 right-5 md:top-8 md:right-8 z-50" />
      <Hero className="h-screen relative z-10" />

      <div className="px-4">
        <SectionTitle title="Educational" highlightedTitle="Background" className="mb-10" />
        <Reveal animation='slideUp'>
          <Education className="md:w-2/3 mx-auto" />
        </Reveal>

        <SectionTitle title="Technical" highlightedTitle="Skills" className="mb-10 mt-24" />
        <Reveal animation='zoom'>
          <Skills />
        </Reveal>

        <SectionTitle
          title="My"
          highlightedTitle="Certifications"
          className="mb-10 mt-24"
        />
        <Reveal animation='bounce'>
          <Certifications />
        </Reveal>

        <SectionTitle
          title="My"
          highlightedTitle="Live Apps"
          className="mb-10 mt-24"
        />
        <Reveal animation='bounce'>
          <Projects />
        </Reveal>

        <SectionTitle
          title="Get In"
          highlightedTitle="Touch"
          className="mb-10 mt-24"
        />
        <Reveal animation='bounce'>
          <ContactInfo />
        </Reveal>
      </div>

      <ScrollToTop />
      <div className="my-20" />
    </>
  );
}