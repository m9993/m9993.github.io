import { motion } from "framer-motion";
import React from "react";

type RevealType = {
  children: React.ReactNode;
};
export default function Reveal(props: RevealType) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      //   animate={{ x: 0 }}
      whileInView={{ scale: 1 }}
      transition={{
        // ease: "easeOut",
        duration: 2,
        // delay:0.5,
        type: "spring",
        stiffness: 10,
        // dumping:1
      }}
      //   viewport={{once:true}}
    >
      {props.children}
    </motion.div>
  );
}
