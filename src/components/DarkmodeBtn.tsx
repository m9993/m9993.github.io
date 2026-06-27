import React, { useEffect, useState } from "react";
import { MdModeNight } from "react-icons/md";
import { BsSunFill } from "react-icons/bs";

type DarkmodeBtnType = {
  className?: string;
};
export default function DarkmodeBtn(props: DarkmodeBtnType) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <button
      className={
        "text-4xl rotate-45 md:text-5xl hover:scale-110 hover:rotate-180 duration-1000 " +
        props.className
      }
      onClick={() => {
        setIsDarkMode(!isDarkMode);
      }}
    >
      {!isDarkMode ? <MdModeNight /> : <BsSunFill />}
    </button>
  );
}
