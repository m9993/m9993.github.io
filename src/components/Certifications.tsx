import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import data from "@/data";
import SectionTitle from "./SectionTitle";

const Certifications = () => {
  const colorMap = {
    orange: {
      bg: "bg-orange-500",
      text: "text-orange-500",
      border: "border-orange-500",
      hover: "hover:bg-orange-600",
    },
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      border: "border-blue-500",
      hover: "hover:bg-blue-600",
    },
    green: {
      bg: "bg-green-500",
      text: "text-green-500",
      border: "border-green-500",
      hover: "hover:bg-green-600",
    },
    purple: {
      bg: "bg-purple-500",
      text: "text-purple-500",
      border: "border-purple-500",
      hover: "hover:bg-purple-600",
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <SectionTitle
        title="My"
        highlightedTitle="Certifications"
        subTitle="Industry-recognized certifications validating my expertise"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {data.certifications.map((cert) => {
          const colors = colorMap[cert.accentColor as keyof typeof colorMap];

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative group overflow-hidden rounded-2xl shadow-2xl border-t-8 ${colors.border}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white dark:from-gray-900 to-gray-50 dark:to-gray-800" />

              <div className="relative z-10 h-full flex flex-col">
                {/* Institution Header */}
                <div className="px-8 pt-8 pb-6">
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center text-white`}
                    >
                      <Image
                        src={`/logos/${cert.id}-logo.png`}
                        alt={cert.institution}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {cert.institution}
                    </h3>
                  </div>
                </div>

                {/* Certificate Image */}
                <div className="flex-grow px-8 pb-6 flex items-center justify-center">
                  <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-inner">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      fill
                      className="object-contain p-6"
                      quality={100}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 pb-8 pt-2">
                  <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
                    {cert.title}
                  </h4>

                  <Link
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-full py-4 px-6 rounded-xl ${colors.bg} ${colors.hover} text-white font-bold transition-all transform hover:scale-[1.02] shadow-lg`}
                  >
                    VERIFY CREDENTIAL
                    <svg
                      className="w-5 h-5 ml-3"
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
