import React from "react";
import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  highlightedTitle,
  subTitle,
}: {
  title?: string;
  highlightedTitle?: string;
  subTitle?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
        {title && title + " "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          {highlightedTitle && highlightedTitle}
        </span>
      </h2>
      {subTitle && (
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {subTitle}
        </p>
      )}
    </motion.header>
  );
}
