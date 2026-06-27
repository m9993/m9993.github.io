"use client";

import React from "react";
import SocialMedia from "./SocialMedia";
import Avatar from "./Avatar";
import TypedText from "./TypedText";
import data from "@/data";
import Reveal from "@/AnimationWraps/Reveal";

type HeroType = {
  className?: string;
};

export default function Hero(props: HeroType) {
  return (
    <div
      className={
        "flex flex-col flex-wrap justify-center items-center " + props.className
      }
    >

      <Reveal animation='zoom'>
        <Avatar images={data.profileImages} />
      </Reveal>

      <Reveal animation='slideUp' delay={0.5}><h1 className="font-mono mt-0 text-xl md:text-4xl">{data.name}</h1></Reveal>

      <Reveal animation="slideDown" delay={0.5}>
        <p
          className="text-center text-xs mt-1 w-80 md:text-base md:w-full md:mt-3"
        >{data.subTitle}</p>
      </Reveal>

      <Reveal animation="fade" delay={1.5}>
        <TypedText className="" />
      </Reveal>

      <Reveal animation="slideUp" delay={1}>
        <SocialMedia className="my-10" />
      </Reveal>
    </div>
  );
}
