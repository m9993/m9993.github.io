// components/AvatarCarousel.tsx
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalImages = images.length;
  const rotationAngle = 360 / totalImages;

  // Calculate radius based on number of images
  const getRadius = () => {
    if (totalImages <= 3) return 140;
    if (totalImages <= 5) return 150;
    if (totalImages <= 8) return 160;
    return 170;
  };

  const radius = getRadius();

  // Calculate sizes - memoized for performance
  const getSize = useCallback((position: string) => {
    const baseSize = Math.min(130, Math.max(90, 170 - totalImages * 2));

    switch (position) {
      case 'active': return `${baseSize}px`;
      case 'near': return `${baseSize * 0.7}px`;
      case 'far': return `${baseSize * 0.5}px`;
      case 'farthest': return `${baseSize * 0.35}px`;
      default: return `${baseSize * 0.25}px`;
    }
  }, [totalImages]);

  const getOpacity = useCallback((position: string) => {
    switch (position) {
      case 'active': return 1;
      case 'near': return 0.8;
      case 'far': return 0.5;
      case 'farthest': return 0.3;
      default: return 0.15;
    }
  }, []);

  const getBlur = useCallback((position: string) => {
    switch (position) {
      case 'active': return 'none';
      case 'near': return 'blur(0.5px)';
      case 'far': return 'blur(1px)';
      case 'farthest': return 'blur(1.5px)';
      default: return 'blur(2px)';
    }
  }, []);

  const getBorder = useCallback((position: string) => {
    switch (position) {
      case 'active': return 'border-4 border-secondary dark:border-primary shadow-2xl shadow-secondary/40 dark:shadow-primary/40';
      case 'near': return 'border-gray-400 dark:border-gray-500 hover:border-primary/50';
      case 'far': return 'border-gray-300 dark:border-gray-600';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  }, []);

  // Smooth rotation function with easing
  const rotateToIndex = useCallback((index: number, animated = true) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const targetAngle = -index * rotationAngle;
    setCurrentRotation(targetAngle);
    setActiveIndex(index);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match the transition duration
  }, [rotationAngle, isTransitioning]);

  // Auto-rotation with cleanup
  useEffect(() => {
    if (!isHovering && !isDragging && totalImages > 0) {
      autoRotateRef.current = setInterval(() => {
        const nextIndex = (activeIndex + 1) % totalImages;
        rotateToIndex(nextIndex);
      }, autoRotateInterval);
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    };
  }, [isHovering, isDragging, activeIndex, totalImages, autoRotateInterval, rotateToIndex]);

  // Handle mouse drag with better sensitivity
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsHovering(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 30) { // Reduced threshold for better responsiveness
      if (deltaX > 0) {
        const prevIndex = (activeIndex - 1 + totalImages) % totalImages;
        rotateToIndex(prevIndex);
      } else {
        const nextIndex = (activeIndex + 1) % totalImages;
        rotateToIndex(nextIndex);
      }
      setStartX(e.clientX);
    }
  }, [isDragging, startX, activeIndex, totalImages, rotateToIndex]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
  }, []);

  // Handle touch with better sensitivity
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsHovering(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    touchEndX.current = e.touches[0].clientX;
    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) > 30) { // Reduced threshold
      if (deltaX > 0) {
        const prevIndex = (activeIndex - 1 + totalImages) % totalImages;
        rotateToIndex(prevIndex);
      } else {
        const nextIndex = (activeIndex + 1) % totalImages;
        rotateToIndex(nextIndex);
      }
      touchStartX.current = touchEndX.current;
    }
  }, [isDragging, activeIndex, totalImages, rotateToIndex]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
  }, []);

  // Navigation functions
  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    const prevIndex = (activeIndex - 1 + totalImages) % totalImages;
    rotateToIndex(prevIndex);
  }, [activeIndex, totalImages, rotateToIndex, isTransitioning]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIndex = (activeIndex + 1) % totalImages;
    rotateToIndex(nextIndex);
  }, [activeIndex, totalImages, rotateToIndex, isTransitioning]);

  const goToImage = useCallback((index: number) => {
    if (isTransitioning || index === activeIndex) return;
    rotateToIndex(index);
  }, [activeIndex, rotateToIndex, isTransitioning]);

  // Get distance with circular logic
  const getDistance = useCallback((index: number) => {
    let diff = index - activeIndex;
    if (Math.abs(diff) > totalImages / 2) {
      diff = diff > 0 ? diff - totalImages : diff + totalImages;
    }
    return diff;
  }, [activeIndex, totalImages]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-4xl mx-auto select-none ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsDragging(false);
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative flex items-center justify-center h-[350px] md:h-[400px] perspective-1000 overflow-visible">
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${currentRotation}deg)`,
            transition: `transform ${isTransitioning ? '700ms' : '0ms'} cubic-bezier(0.25, 0.1, 0.25, 1)`,
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

            const isHidden = absDistance > 3 && totalImages > 6;
            const shouldShow = totalImages <= 6 || !isHidden;

            let zIndex = 1;
            if (position === 'active') zIndex = 10;
            else if (position === 'near') zIndex = 5;
            else if (position === 'far') zIndex = 3;
            else zIndex = 2;

            const sizeNum = parseInt(size);
            const halfSize = sizeNum / 2;

            return (
              <div
                key={image.id}
                className={`absolute top-1/2 left-1/2 cursor-pointer ${shouldShow ? 'visible' : 'hidden'}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  width: size,
                  height: size,
                  marginLeft: `-${halfSize}px`,
                  marginTop: `-${halfSize}px`,
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: blur,
                  left: "50%",
                  top: "50%",
                  transition: `all 700ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
                }}
                onClick={() => goToImage(index)}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden ${border} ${position === 'active' ? "scale-105" : ""}`}
                  style={{
                    transition: `all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes={size}
                    priority={position === 'active'}
                    loading={position === 'active' ? 'eager' : 'lazy'}
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
    </div>
  );
}