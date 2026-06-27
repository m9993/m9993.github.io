// components/AnimationWrapper.tsx
import React, { ReactNode, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

type AnimationType =
  | "fade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "rotate"
  | "flip"
  | "bounce"
  | "zoom"
  | "blur";

type AnimationWrapperProps = {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  threshold?: number;
  margin?: string;
};

const AnimationWrapper = ({
  children,
  className = "",
  animation = "slideUp",
  duration = 0.6,
  delay = 0,
  once = false,
  staggerChildren = false,
  staggerDelay = 0.1,
  threshold = 0.2,
  margin = "-50px 0px -50px 0px",
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: once,
    margin: margin,
    amount: threshold,
  });
  const controls = useAnimation();

  const getAnimationVariants = (): Variants => {
    const variants: Record<AnimationType, Variants> = {
      fade: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration, delay, ease: "easeOut" }
        }
      },
      slideUp: {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      },
      slideDown: {
        hidden: { opacity: 0, y: -50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" }
        }
      },
      slideLeft: {
        hidden: { opacity: 0, x: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" }
        }
      },
      slideRight: {
        hidden: { opacity: 0, x: -50, scale: 0.95 },
        visible: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" }
        }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration, delay, ease: [0.34, 1.56, 0.64, 1] }
        }
      },
      rotate: {
        hidden: { opacity: 0, rotate: -10, scale: 0.9 },
        visible: {
          opacity: 1,
          rotate: 0,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" }
        }
      },
      flip: {
        hidden: { opacity: 0, rotateX: 90, scale: 0.9 },
        visible: {
          opacity: 1,
          rotateX: 0,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" }
        }
      },
      bounce: {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: duration * 1.2,
            delay,
            type: "spring",
            stiffness: 200,
            damping: 15
          }
        }
      },
      zoom: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration, delay, ease: [0.34, 1.56, 0.64, 1] }
        }
      },
      blur: {
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration, delay, ease: "easeOut" }
        }
      }
    };

    return variants[animation] || variants.slideUp;
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: duration * 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const variants = getAnimationVariants();

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;