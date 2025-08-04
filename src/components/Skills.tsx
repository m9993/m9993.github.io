import React from "react";
import { motion } from "framer-motion";
import data from "@/data";
import SectionTitle from "./SectionTitle";

const Skills = () => {
  const accentColors = {
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      iconBg: "bg-blue-100 dark:bg-blue-900/20",
    },
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      iconBg: "bg-purple-100 dark:bg-purple-900/20",
    },
    emerald: {
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      iconBg: "bg-amber-100 dark:bg-amber-900/20",
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SectionTitle title="Technical" highlightedTitle="Skills" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.skillCategories.map((category, catIndex) => {
          const colors =
            accentColors[
              category.accent as "blue" | "purple" | "emerald" | "amber"
            ];

          return (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl border ${colors.border} bg-white dark:bg-gray-900/50 p-5 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center mb-5 gap-4">
                <div
                  className={`${colors.iconBg} ${colors.text} p-3 rounded-lg`}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className={`text-xl font-semibold ${colors.text}`}>
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    className={`px-3 py-1.5 rounded-md text-sm ${colors.text} bg-gray-50 dark:bg-gray-800 border ${colors.border}`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
