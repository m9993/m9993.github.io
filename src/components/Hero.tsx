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

      <Reveal animation='rotate'>
        <Avatar image={data.profileImage} />
      </Reveal>

      <Reveal animation='zoom' delay={0.8}><h1 className="font-mono mt-7 text-xl md:text-4xl">{data.name}</h1></Reveal>

      <div
        className="mt-1 w-80 md:w-2/4 md:mt-3">
        <Reveal animation='blur' delay={1} duration={1}>
          <p className="text-center text-xs md:text-base">
            {data.subTitle}
          </p>
        </Reveal>
      </div>

      <Reveal animation='slideDown' delay={1.5}>
        <TypedText className="" />
      </Reveal>

      <Reveal animation='scale' delay={2.5}>
        <SocialMedia className="my-10" />
      </Reveal>
    </div>
  );
}
