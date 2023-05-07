import React from "react";
import data from "../data";
import Link from "next/link";

type SocialMediaType = {
  className?: string;
};

export default function SocialMedia(props: SocialMediaType) {
  return (
    <div
      className={
        "flex items-center gap-8 text-2xl md:text-3xl " + props.className
      }
    >
      {data.social.map((item) => (
        <Link
          key={item.id}
          href={item.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
