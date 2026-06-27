import React from "react";
import Reveal from "@/AnimationWraps/Reveal";

export default function SectionTitle({
  className,
  title,
  highlightedTitle,
  subTitle,
}: {
  className?: string;
  title?: string;
  highlightedTitle?: string;
  subTitle?: string;
}) {
  return (
    <Reveal animation='scale'>
      <div
        className={'text-center ' + className}
      >
        <h2 className={`text-5xl font-black text-gray-900 dark:text-white ${subTitle && 'mb-4'}`}>
          {title && title + " "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary dark:from-primary dark:to-secondary">
            {highlightedTitle && highlightedTitle}
          </span>
        </h2>
        {subTitle && (
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subTitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
