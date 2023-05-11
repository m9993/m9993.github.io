import Image from "next/image";
import React from "react";

type AvatarType = {
  className?: string;
};

export default function Avatar(props: AvatarType) {
  return (
    <Image
      src="/profile.jpg"
      width={500}
      height={500}
      alt="Profile"
      className={
        "object-cover w-60 h-60 md:w-80 md:h-80 rounded-full border-[5px] border-secondary dark:border-primary cursor-pointer " +
        props.className
      }
    />
  );
}
