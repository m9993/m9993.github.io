import data from "@/data";
import React from "react";
import Typed from "typed.js";

type TypedTextType = {
  className?: string;
};

export default function TypedText(props: TypedTextType) {
  const el = React.useRef(null);
  React.useEffect(() => {
    var typed = new Typed(el.current, {
      strings: data.typedText,
      typeSpeed: 60,
      backSpeed: 50,
      smartBackspace: true, // this is a default
      loop: true,
      cursorChar: "_",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className={"flex items-center " + props.className}>
      <p
        ref={el}
        className="font-poppins my-5 text-sm h-5 text-secondary dark:text-primary md:text-lg tracking-widest"
      />
    </div>
  );
}
