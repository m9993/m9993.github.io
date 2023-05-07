import React from "react";
import data from "../data";
import Link from "next/link";

export default function SocialMedia() {
  return (
    <div className="flex items-center gap-8 text-2xl md:text-3xl">
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
