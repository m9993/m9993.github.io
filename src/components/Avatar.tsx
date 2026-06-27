// components/AvatarCarousel.tsx
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const isAnimating = useRef(false);

  const totalImages = images.length;
  const rotationAngle = 360 / totalImages;

  // Pre-calculate radius and base size
  const radius = useMemo(() => {
    if (totalImages <= 3) return 140;
    if (totalImages <= 5) return 150;
    if (totalImages <= 8) return 160;
    return 170;
  }, [totalImages]);

  const baseSize = useMemo(() => {
    return Math.min(130, Math.max(90, 170 - totalImages * 2));
  }, [totalImages]);

  // Pre-calculate all image positions
  const imagePositions = useMemo(() => {
    return images.map((_, index) => {
      const angle = (index / totalImages) * 360;
      return { angle };
    });
  }, [images, totalImages]);

  // Load images
  useEffect(() => {
    let loaded = 0;
    const total = images.length;

    images.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) {
          setImagesLoaded(true);
        }
      };
    });

    // Fallback: if images don't load within 5 seconds, start anyway
    const timeout = setTimeout(() => {
      if (!imagesLoaded) {
        setImagesLoaded(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [images, imagesLoaded]);

  // Memoized style calculations
  const getImageStyle = useCallback((index: number) => {
    let diff = index - activeIndex;
    if (Math.abs(diff) > totalImages / 2) {
      diff = diff > 0 ? diff - totalImages : diff + totalImages;
    }
    const absDistance = Math.abs(diff);

    let zIndex = 1;
    let opacity = 0.1;
    let blur = 'blur(3px)';
    let size = baseSize * 0.2;
    let border = 'border-gray-200 dark:border-gray-700';
    let scale = 1;

    if (absDistance === 0) {
      zIndex = 10;
      opacity = 1;
      blur = 'none';
      size = baseSize;
      border = 'border-4 border-secondary dark:border-primary shadow-2xl shadow-secondary/40 dark:shadow-primary/40';
      scale = 1.05;
    } else if (absDistance === 1) {
      zIndex = 5;
      opacity = 0.85;
      blur = 'blur(0.5px)';
      size = baseSize * 0.7;
      border = 'border-gray-400 dark:border-gray-500 hover:border-primary/50';
    } else if (absDistance === 2) {
      zIndex = 3;
      opacity = 0.55;
      blur = 'blur(1px)';
      size = baseSize * 0.5;
      border = 'border-gray-300 dark:border-gray-600';
    } else if (absDistance === 3) {
      zIndex = 2;
      opacity = 0.35;
      blur = 'blur(1.5px)';
      size = baseSize * 0.35;
      border = 'border-gray-200 dark:border-gray-700';
    } else {
      opacity = 0.05;
      blur = 'blur(4px)';
      size = baseSize * 0.15;
    }

    const sizeStr = `${size}px`;
    const halfSize = size / 2;

    return {
      zIndex,
      scale,
      opacity,
      blur,
      size: sizeStr,
      halfSize,
      border,
      isActive: absDistance === 0,
    };
  }, [activeIndex, totalImages, baseSize]);

  // Smooth rotation
  const rotateToIndex = useCallback((index: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const targetAngle = -index * rotationAngle;
    setCurrentRotation(targetAngle);
    setActiveIndex(index);

    setTimeout(() => {
      isAnimating.current = false;
    }, 600);
  }, [rotationAngle]);

  // Auto-rotation
  useEffect(() => {
    if (!imagesLoaded) return;

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
  }, [isHovering, isDragging, activeIndex, totalImages, autoRotateInterval, rotateToIndex, imagesLoaded]);

  // Handle mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsHovering(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 30) {
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

  // Handle touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsHovering(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartX.current;

    if (Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        const prevIndex = (activeIndex - 1 + totalImages) % totalImages;
        rotateToIndex(prevIndex);
      } else {
        const nextIndex = (activeIndex + 1) % totalImages;
        rotateToIndex(nextIndex);
      }
      touchStartX.current = currentX;
    }
  }, [isDragging, activeIndex, totalImages, rotateToIndex]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
  }, []);

  const goToImage = useCallback((index: number) => {
    if (isAnimating.current || index === activeIndex) return;
    rotateToIndex(index);
  }, [activeIndex, rotateToIndex]);

  // Loading state
  if (!imagesLoaded) {
    return (
      <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
        <div className="flex items-center justify-center h-[350px] md:h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-secondary/30 dark:border-primary/30 border-t-secondary dark:border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading images...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            transition: `transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
            willChange: 'transform',
          }}
        >
          {images.map((image, index) => {
            const style = getImageStyle(index);
            const { angle } = imagePositions[index];

            return (
              <div
                key={image.id}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  width: style.size,
                  height: style.size,
                  marginLeft: `-${style.halfSize}px`,
                  marginTop: `-${style.halfSize}px`,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  filter: style.blur,
                  left: "50%",
                  top: "50%",
                  transition: `all 600ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
                  willChange: 'transform, opacity, filter',
                }}
                onClick={() => goToImage(index)}
              >
                <div
                  className={`relative w-full h-full rounded-full overflow-hidden ${style.border} ${style.isActive ? "scale-105" : ""}`}
                  style={{
                    transition: `all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
                    willChange: 'transform',
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes={style.size}
                    priority={style.isActive}
                    loading={style.isActive ? 'eager' : 'lazy'}
                    quality={style.isActive ? 90 : 70}
                    draggable={false}
                  />

                  {style.isActive && (
                    <>
                      <div className="absolute -inset-3 rounded-full bg-white/20 blur-xl -z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                    </>
                  )}
                </div>

                {style.isActive && image.title && (
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