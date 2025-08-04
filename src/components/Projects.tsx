import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import data from "@/data";

const Projects = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Live Apps
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Published applications with real users and active development
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            {/* App Screenshot Preview */}
            <div className="relative h-60 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <Image
                src={project.screenshot}
                alt={`${project.name} screenshot`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* App Info */}
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                  <Image
                    src={project.icon}
                    alt={`${project.name} icon`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  {project.rating && (
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(project.rating)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        {project.rating}{" "}
                        {project.downloads && `• ${project.downloads}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-5">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Store Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.playStoreLink && (
                  <Link
                    href={project.playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3.063 3.627A1.947 1.947 0 003 4.014v15.972c0 .58.293 1.118.78 1.433l8.234-8.234-8.95-8.558zm.752 16.918l7.056-7.056 3.535 3.535-7.056 7.056-3.535-3.535zm15.266-8.528l-3.536-3.536 1.768-1.768c.38-.38.982-.39 1.376-.02l.392.352-2.828 2.828 2.828 2.828zM14.121 12l3.536-3.535-7.07-7.072L3.69 3.355l8.486 8.486L14.12 12z" />
                    </svg>
                    Play Store
                  </Link>
                )}
                {project.appStoreLink && (
                  <Link
                    href={project.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    App Store
                  </Link>
                )}
                {project.webLink && (
                  <Link
                    href={project.webLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Web Version
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
