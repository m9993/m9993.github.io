import React from "react";
import { motion } from "framer-motion";
import data from "../data";

export default function Education() {
  return (
    <div className="flex flex-col items-center px-8 md:px-1 bg-slate-50 dark:bg-black">
      {data.education.map((item, index) => (
        <>
          <motion.div
            key={item.id}
            className="md:w-1/2 flex gap-5"
            initial={{ y:'12vh' }}
            whileInView={{ y:0 }}
            transition={{
              ease: "easeOut",
              duration: 1,
              type:'spring',
              stiffness:50,
              // delay:0.5,
              // dumping:1
            }}
            //   viewport={{once:true}}
          >
            {index + 1 !== data.education.length ? (
              <div className="border-[1px] border-secondary dark:border-primary -mr-9" />
            ) : (
              <div className="-mr-8" />
            )}
            <div className={`flex flex-col items-center h-[9em] bg-slate-50 dark:bg-black pt-5`}>
              <span className="text-2xl">{item.icon}</span>
              <p className="my-3 text-center text-sm">{item.year}</p>
            </div>
            <div className="pt-5">
              <h3 className="">{item.title}</h3>
              <h4 className="text-sm text-stone-900 dark:text-gray-200">{item.subject}</h4>
              {/* Specialization: Software Engineering */}
              <h5 className="text-sm italic text-stone-600 dark:text-gray-400">{item.institute}</h5>
              <p className="text-xs text-stone-500 dark:text-gray-500">{item.description}</p>
            </div>
          </motion.div>
        </>
      ))}
    </div>
  );
}
