"use client";

import Image from "next/image";
import React from "react";
import Typed from "typed.js";
import SocialMedia from "./SocialMedia";

type HeroType = {
  className?: string;
};

export default function Hero(props: HeroType) {
  const el = React.useRef(null);
  React.useEffect(() => {
    var typed = new Typed(el.current, {
      strings: [
        `I am a <strong>Web Developer</strong>`,
        `I am an <strong>Android Developer</strong>`,
        `I am an <strong>iOS Developer</strong>`,
      ],
      typeSpeed: 60,
      backSpeed: 50,
      smartBackspace: true, // this is a default
      loop: true,
      cursorChar: "_",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div
      className={
        "flex flex-col flex-wrap justify-center items-center " + props.className
      }
    >
      <Image
        src="/profile.jpg"
        width={500}
        height={500}
        alt="Profile"
        className="object-cover w-60 h-60 md:w-80 md:h-80 rounded-full border-[5px] border-secondary dark:border-primary"
      />
      <h1 className=" font-mono mt-7 text-xl md:text-4xl">Muntasir Alam</h1>
      <p className="text-center text-xs mt-1 w-80 md:text-base md:w-2/4 md:mt-3">
        Seeking for a rewarding career as a full stack developer in locally and
        globally applying my knowledge and communication skills.
      </p>

      <div className="flex items-center">
        <p
          ref={el}
          className="font-poppins my-5 text-sm h-5 text-secondary dark:text-primary md:text-lg tracking-widest"
        />
      </div>
      <SocialMedia className="my-10" />
    </div>
  );
}
