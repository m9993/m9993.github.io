// components/AnimationWrapper.tsx
import React, { ReactNode, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

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
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  threshold?: number;
  margin?: string;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  skipObserver?: boolean;
};

const AnimationWrapper = ({
  children,
  animation = "slideUp",
  duration = 0.6,
  delay = 0,
  once = false,
  staggerChildren = false,
  staggerDelay = 0.1,
  threshold = 0.2,
  margin = "-50px 0px -50px 0px",
  root = null,
  rootMargin,
  triggerOnce = false,
  skipObserver = false,
}: AnimationWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isMounted = useRef(true);

  // Memoize animation variants to prevent recreation
  const variants = useMemo(() => {
    const baseVariants: Record<AnimationType, Variants> = {
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

    return baseVariants[animation] || baseVariants.slideUp;
  }, [animation, duration, delay]);

  // Memoize child variants
  const childVariants = useMemo<Variants>(() => ({
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
  }), [duration]);

  // Memoize stagger variants
  const staggerVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }), [staggerDelay, delay]);

  // Handle intersection observer with useCallback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (!isMounted.current) return;

    if (entry.isIntersecting) {
      controls.start("visible");
    } else if (!once && !triggerOnce) {
      controls.start("hidden");
    }
  }, [controls, once, triggerOnce]);

  // Setup intersection observer
  useEffect(() => {
    if (skipObserver) {
      // If skipObserver is true, start animation immediately
      controls.start("visible");
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: threshold,
      rootMargin: rootMargin || margin,
      root: root,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      isMounted.current = false;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [handleIntersection, threshold, margin, rootMargin, root, skipObserver, controls]);

  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      controls.stop();
    };
  }, [controls]);

  // If staggerChildren is true, render with stagger
  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={staggerVariants}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            // Add will-change for better performance
            style={{ willChange: 'transform, opacity' }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      // Add will-change for better performance
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(AnimationWrapper);