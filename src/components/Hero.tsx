"use client";

import Image from "next/image";
import React from "react";
import Typed from "typed.js";
import SocialMedia from "./SocialMedia";

export default function Hero() {
  const el = React.useRef(null);
  React.useEffect(() => {
    var typed = new Typed(el.current, {
      strings: [
        `I am a <strong>Web Developer</strong>`,
        `I am an <strong>Android Developer</strong>`,
        `I am an <strong>iOS Developer</strong>`,
      ],
      typeSpeed: 50,
      backSpeed: 40,
      smartBackspace: true, // this is a default
      loop: true,
      cursorChar: "",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col flex-wrap justify-center items-center h-screen">
      <Image
        src="/profile.jpg"
        width={500}
        height={500}
        alt="Profile"
        className="object-cover w-60 h-60 md:w-80 md:h-80 rounded-full border-4 border-yellow-500"
      />
      <h1 className=" font-mono mt-7 text-xl md:text-4xl">Muntasir Alam</h1>
      <p className="text-center text-xs mt-1 w-80 md:text-base md:w-2/4 md:mt-3">Seeking for a rewarding career as a full stack developer in locally and globally applying my knowledge and communication skills.</p>
      
      <h2 ref={el} className=" font-poppins my-5 text-sm h-5 text-yellow-500 md:text-lg"/>
      <div className="my-10">
        <SocialMedia/>
      </div>
    </div>
  );
}
