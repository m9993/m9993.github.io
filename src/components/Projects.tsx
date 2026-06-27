import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaStar } from "react-icons/fa";
import data from "@/data";

const Projects = () => {
  const getStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-3 h-3 ${i < Math.floor(rating)
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.projects.map((project, index) => (
          <div className="relative bg-white/60 dark:bg-gray-900/30 rounded-xl p-4 border border-gray-200/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100/50 dark:bg-white/5 rounded-lg overflow-hidden relative">
                <Image
                  src={project.icon}
                  alt={project.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-secondary dark:group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  {/* <Link
                    href={project.playStoreLink || project.webLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </Link> */}
                </div>

                {project.rating && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {getStars(project.rating)}
                    <span className="text-[10px] text-gray-400 dark:text-white/30 ml-1">
                      {project.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-white/50 mt-2 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-full text-[9px] bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-white/40 border border-gray-200/50 dark:border-white/5"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-gray-100/50 dark:bg-white/5 text-gray-400 dark:text-white/20 border border-gray-200/50 dark:border-white/5">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Store Buttons - Compact */}
            <div className="flex gap-1.5 mt-3 pt-3 border-t border-gray-200/50 dark:border-white/5">
              {project.playStoreLink && (
                <Link
                  href={project.playStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-2 py-1 rounded-lg bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/50 dark:hover:bg-white/10 text-[9px] text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Play Store
                </Link>
              )}
              {project.appStoreLink && (
                <Link
                  href={project.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-2 py-1 rounded-lg bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/50 dark:hover:bg-white/10 text-[9px] text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  App Store
                </Link>
              )}
              {project.webLink && (
                <Link
                  href={project.webLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-2 py-1 rounded-lg bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/50 dark:hover:bg-white/10 text-[9px] text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Web
                </Link>
              )}
            </div>
          </div>

        ))}
      </div>
    </>
  );
};

export default Projects;