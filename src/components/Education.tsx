import React from "react";
import { motion } from "framer-motion";
import data from "../data";

export default function Education() {
  const animate = {
    hide: { y: "12vh" },
    visible: {
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 1,
        type: "spring",
        stiffness: 50,
      },
    },
  };
            
  return (
    <div className="bg-slate-100 dark:bg-black md:w-1/2 py-5 ps-4 rounded-xl">
    <div className="mx-5 border-s-[1px] border-secondary dark:border-primary">
      {data.education.map((item, index) => (
        <motion.section key={item.id} className="flex gap-10" 
          variants={animate}
          initial='hide'
          whileInView='visible'
        >
          <div className={`flex flex-col items-center ${index==0? 'pt-0':'pt-5'} h-28 -ml-4 bg-slate-100 dark:bg-black`}>
            <span className="text-2xl">{item.icon}</span>
            <div className="text-center text-sm">{item.year}</div>
          </div>

          <div className={`${index==0? 'py-0':'pt-5'}`}>
            <h4>{item.title}</h4>
            <h5 className="text-sm text-stone-900 dark:text-gray-200">{item.subject}</h5>
            <h6 className="text-xs italic text-stone-600 dark:text-gray-400">{item.institute}</h6>
            <div className="text-xs text-gray-500 dark:text-gray-500">{item.description}</div>
          </div>
        </motion.section>
      ))}
    </div>
    </div>
  );
}
