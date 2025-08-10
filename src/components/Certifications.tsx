import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import data from "@/data";
import SectionTitle from "./SectionTitle";

const Certifications = () => {
  const colorMap = {
    orange: {
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      button: "bg-orange-600 hover:bg-orange-700 text-white",
      badge:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200",
    },
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
    },
    green: {
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      button: "bg-green-600 hover:bg-green-700 text-white",
      badge:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
    },
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      button: "bg-purple-600 hover:bg-purple-700 text-white",
      badge:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <SectionTitle
        title="My"
        highlightedTitle="Certifications"
        subTitle="Validated expertise from leading institutions"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {data.certifications.map((cert) => {
          const colors = colorMap[cert.accentColor as keyof typeof colorMap];

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              {/* Certificate Image - Optimized for clarity */}
              <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    className="object-contain"
                    quality={100}
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className={`text-sm ${colors.text} font-medium`}>
                      {cert.institution}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${colors.badge}`}
                  >
                    Verified
                  </span>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Link
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm px-4 py-2 rounded-lg ${colors.button} transition-colors flex items-center gap-1 min-w-[100px] justify-center`}
                  >
                    View
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;
