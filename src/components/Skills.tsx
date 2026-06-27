import React, { useState } from "react";
import { motion } from "framer-motion";
import data from "@/data";

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Flatten all skills with categories
  const allSkills = data.skillCategories.flatMap(cat =>
    cat.skills.map(skill => ({
      skill,
      category: cat.name,
      icon: cat.icon,
      accent: cat.accent || "blue"
    }))
  );

  // Color mapping for tags
  const getColor = (accent: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    };
    return colors[accent as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      {/* Interactive Tag Cloud */}
      <div className="relative flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl">
          {allSkills.map((item, index) => {
            const size = 0.8 + Math.random() * 0.6;
            const rotation = (Math.random() - 0.5) * 8;
            const isSelected = selectedSkill === item.skill;

            return (
              <motion.button
                key={`${item.skill}-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: isSelected ? 1.2 : 1,
                  rotate: isSelected ? 0 : rotation,
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  y: -4,
                  transition: { duration: 0.15 }
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 200
                }}
                style={{
                  fontSize: `${size * 0.9}rem`,
                }}
                className={`
                  px-4 py-2 rounded-full font-medium border-2 transition-all duration-300
                  ${getColor(item.accent)}
                  ${isSelected ? 'shadow-lg scale-110 ring-2 ring-offset-2 ring-primary/50' : 'hover:shadow-md'}
                `}
                {...({ onClick: () => setSelectedSkill(isSelected ? null : item.skill) } as any)}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.skill}
                {isSelected && (
                  <span className="ml-2 text-xs opacity-70">
                    {item.category}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Category Legend */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {data.skillCategories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="text-base">{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-gray-400 dark:text-gray-500">{cat.skills.length}</span>
          </div>
        ))}
      </div>

      {/* Selected Skill Info */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
          {...({} as any)}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click again to deselect • {allSkills.find(s => s.skill === selectedSkill)?.category}
          </p>
        </motion.div>
      )}
    </>
  );
};

export default Skills;