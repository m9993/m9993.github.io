// components/AvatarCarousel.tsx
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

type AvatarImage = {
  id: string;
  src: string;
  alt: string;
  title?: string;
};

type AvatarCarouselProps = {
  images: AvatarImage[];
  className?: string;
  autoRotateInterval?: number;
};

export default function AvatarCarousel({
  images,
  className = "",
  autoRotateInterval = 2000,
}: AvatarCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // Fix: Pass null as initial value
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalImages = images.length;
  const rotationAngle = 360 / totalImages;

  // Calculate radius based on number of images
  const getRadius = () => {
    if (totalImages <= 3) return 140;
    if (totalImages <= 5) return 150;
    if (totalImages <= 8) return 160;
    return 170; // Good size for 10+ images
  };

  const radius = getRadius();

  // Calculate sizes
  const getSize = (position: string) => {
    const baseSize = Math.min(130, Math.max(90, 170 - totalImages * 2));

    switch (position) {
      case 'active': return `${baseSize}px`;
      case 'near': return `${baseSize * 0.7}px`;
      case 'far': return `${baseSize * 0.5}px`;
      case 'farthest': return `${baseSize * 0.35}px`;
      default: return `${baseSize * 0.25}px`;
    }
  };

  const getOpacity = (position: string) => {
    switch (position) {
      case 'active': return 1;
      case 'near': return 0.8;
      case 'far': return 0.5;
      case 'farthest': return 0.3;
      default: return 0.15;
    }
  };

  const getBlur = (position: string) => {
    switch (position) {
      case 'active': return 'none';
      case 'near': return 'blur(0.5px)';
      case 'far': return 'blur(1px)';
      case 'farthest': return 'blur(1.5px)';
      default: return 'blur(2px)';
    }
  };

  const getBorder = (position: string) => {
    switch (position) {
      case 'active': return 'border-4 border-secondary dark:border-primary shadow-2xl shadow-secondary/40 dark:shadow-primary/40';
      case 'near': return 'border-gray-400 dark:border-gray-500 hover:border-primary/50';
      case 'far': return 'border-gray-300 dark:border-gray-600';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  useEffect(() => {
    setCurrentRotation(0);
  }, []);

  useEffect(() => {
    if (!isHovering && !isDragging) {
      autoRotateRef.current = setInterval(() => {
        const nextIndex = (activeIndex + 1) % totalImages;
        setActiveIndex(nextIndex);
        const targetAngle = -nextIndex * rotationAngle;
        setCurrentRotation(targetAngle);
      }, autoRotateInterval);
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isHovering, isDragging, activeIndex, totalImages, autoRotateInterval, rotationAngle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        const prevIndex = (activeIndex - 1 + totalImages) % totalImages;
        setActiveIndex(prevIndex);
        setCurrentRotation(-prevIndex * rotationAngle);
      } else {
        const nextIndex = (activeIndex + 1) % totalImages;
        setActiveIndex(nextIndex);
        setCurrentRotation(-nextIndex * rotationAngle);
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        const prevIndex = (activeIndex - 1 + totalImages) % totalImages;
        setActiveIndex(prevIndex);
        setCurrentRotation(-prevIndex * rotationAngle);
      } else {
        const nextIndex = (activeIndex + 1) % totalImages;
        setActiveIndex(nextIndex);
        setCurrentRotation(-nextIndex * rotationAngle);
      }
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const goToPrev = () => {
    const prevIndex = (activeIndex - 1 + totalImages) % totalImages;
    setActiveIndex(prevIndex);
    setCurrentRotation(-prevIndex * rotationAngle);
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % totalImages;
    setActiveIndex(nextIndex);
    setCurrentRotation(-nextIndex * rotationAngle);
  };

  const goToImage = (index: number) => {
    setActiveIndex(index);
    setCurrentRotation(-index * rotationAngle);
  };

  const getDistance = (index: number) => {
    let diff = index - activeIndex;
    if (Math.abs(diff) > totalImages / 2) {
      diff = diff > 0 ? diff - totalImages : diff + totalImages;
    }
    return diff;
  };

  const getVisibleDots = () => {
    if (totalImages <= 8) {
      return images.map((_, index) => index);
    }

    const dots: (number | 'ellipsis')[] = [];
    const range = 2;

    dots.push(0);

    if (activeIndex > range + 2) {
      dots.push('ellipsis');
    }

    for (let i = Math.max(1, activeIndex - range); i <= Math.min(totalImages - 2, activeIndex + range); i++) {
      if (i > 0 && i < totalImages - 1) {
        dots.push(i);
      }
    }

    if (activeIndex < totalImages - range - 3) {
      dots.push('ellipsis');
    }

    if (totalImages > 1) {
      dots.push(totalImages - 1);
    }

    return dots;
  };

  const visibleDots = getVisibleDots();

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-4xl mx-auto select-none ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container - Increased height for visibility */}
      <div className="relative flex items-center justify-center h-[350px] md:h-[400px] perspective-1000 overflow-visible">
        <div
          className="relative w-full h-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${currentRotation}deg)`,
          }}
        >
          {images.map((image, index) => {
            const distance = getDistance(index);
            const absDistance = Math.abs(distance);

            let position = 'far';
            if (absDistance === 0) position = 'active';
            else if (absDistance === 1) position = 'near';
            else if (absDistance === 2) position = 'far';
            else if (absDistance === 3) position = 'farthest';
            else position = 'hidden';

            const angle = (index / totalImages) * 360;
            const size = getSize(position);
            const opacity = getOpacity(position);
            const blur = getBlur(position);
            const border = getBorder(position);

            // Only hide images that are too far
            const isHidden = absDistance > 3 && totalImages > 6;

            let zIndex = 1;
            if (position === 'active') zIndex = 10;
            else if (position === 'near') zIndex = 5;
            else if (position === 'far') zIndex = 3;
            else zIndex = 2;

            // For visibility debugging - show all images if totalImages <= 6
            const shouldShow = totalImages <= 6 || !isHidden;

            return (
              <div
                key={image.id}
                className={`absolute top-1/2 left-1/2 transition-all duration-700 ease-out cursor-pointer ${shouldShow ? 'visible' : 'hidden'
                  }`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  width: size,
                  height: size,
                  marginLeft: `-${parseInt(size) / 2}px`,
                  marginTop: `-${parseInt(size) / 2}px`,
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: blur,
                  left: "50%",
                  top: "50%",
                }}
                onClick={() => goToImage(index)}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-500 ${border} ${position === 'active' ? "scale-105" : ""
                    }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes={size}
                    priority={position === 'active'}
                  />

                  {position === 'active' && (
                    <>
                      <div className="absolute -inset-3 rounded-full bg-white/20 blur-xl -z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                    </>
                  )}
                </div>

                {position === 'active' && image.title && (
                  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-lg">
                      {image.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <button
        onClick={goToPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 z-20 border border-gray-200 dark:border-gray-700"
        aria-label="Previous image"
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 z-20 border border-gray-200 dark:border-gray-700"
        aria-label="Next image"
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> */}

      {/* Modern Dots Indicator */}
      {/* <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 mt-4 z-20 px-4 py-2 backdrop-blur-sm rounded-full shadow-lg border border-white/20 dark:border-gray-700/30">
        {visibleDots.map((dot, idx) => {
          if (dot === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="text-gray-400 dark:text-gray-500 text-xs px-0.5 select-none"
              >
                …
              </span>
            );
          }

          const isActive = dot === activeIndex;
          return (
            <button
              key={dot}
              onClick={() => goToImage(dot)}
              className={`
                transition-all duration-300 rounded-full
                ${isActive
                  ? 'w-8 h-2.5 bg-gradient-to-r from-secondary to-primary dark:from-primary dark:to-secondary shadow-lg shadow-blue-500/30'
                  : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-110'
                }
              `}
              aria-label={`Go to image ${dot + 1}`}
            />
          );
        })}
      </div> */}

      {/* Counter Badge */}
      {/* <div className="text-xs text-gray-500 dark:text-gray-400 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-white/20 dark:border-gray-700/30 flex items-center gap-1.5">
        <span className="font-medium text-secondary dark:text-primary">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-gray-300 dark:text-gray-600">/</span>
        <span className="text-gray-400 dark:text-gray-500">
          {String(totalImages).padStart(2, '0')}
        </span>
      </div> */}
    </div>
  );
}