import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import data from "@/data";

const Certifications = () => {
  return (
    <>
      <div className="space-y-3 justify-items-center w-4xl">
        {data.certifications.map((cert, index) => (

          <div key={cert.id} className="relative bg-white/80 dark:bg-gray-900/30 rounded-xl px-5 py-3 border border-gray-200/50 dark:border-white/20 shadow-md hover:shadow-xl transition-all duration-300">
            {/* Glass Effect - Light/Dark aware */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 dark:to-transparent rounded-xl" />

            <div className="relative flex items-center gap-4">
              {/* Icon/Number - Light/Dark aware */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 dark:bg-primary/20 flex items-center justify-center text-secondary dark:text-white/60 text-xs font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-secondary dark:group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <MdVerified className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                </div>
                <p className="text-xs text-gray-500 dark:text-white/40">
                  {cert.institution}
                </p>
              </div>

              {/* Arrow - Light/Dark aware */}
              <Link

                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex-shrink-0 text-gray-300 dark:text-white/20 group-hover:text-gray-700 dark:group-hover:text-white/60 transition-colors">
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Certifications;