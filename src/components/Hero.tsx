"use client";

import React from "react";
import SocialMedia from "./SocialMedia";
import Avatar from "./Avatar";
import TypedText from "./TypedText";
import { motion } from "framer-motion";

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
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <Avatar className="" />
      </motion.span>
      <motion.h1
        className="font-mono mt-7 text-xl md:text-4xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
      >
        Muntasir Alam
      </motion.h1>
      <motion.p
        className="text-center text-xs mt-1 w-80 md:text-base md:w-2/4 md:mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 1 }}
      >
        Seeking for a rewarding career as a full stack developer in locally and
        globally applying my knowledge and communication skills.
      </motion.p>

      <TypedText className="" />
      <motion.span
        initial={{ y: "calc(100vh - 50%)" }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 1 }}
      >
        <SocialMedia className="my-10" />
      </motion.span>
    </div>
  );
}
