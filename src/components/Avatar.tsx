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
  const [carouselReady, setCarouselReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const isAnimating = useRef(false);

  const totalImages = images.length;
  const rotationAngle = 360 / totalImages;

  const radius = useMemo(() => {
    if (totalImages <= 3) return 140;
    if (totalImages <= 5) return 150;
    if (totalImages <= 8) return 160;
    return 170;
  }, [totalImages]);

  const baseSize = useMemo(() => {
    return Math.min(130, Math.max(90, 170 - totalImages * 2));
  }, [totalImages]);

  const imagePositions = useMemo(() => {
    return images.map((_, index) => ({
      angle: (index / totalImages) * 360,
    }));
  }, [images, totalImages]);

  // Silently preload all images in the background.
  // The shimmer shows during this time — no spinner, no blank screen.
  useEffect(() => {
    let loaded = 0;
    const total = images.length;

    const onDone = () => {
      loaded++;
      if (loaded >= total) setCarouselReady(true);
    };

    images.forEach((image) => {
      const img = new window.Image();
      img.onload = onDone;
      img.onerror = onDone;
      img.src = image.src;
    });

    // Safety fallback
    const fallback = setTimeout(() => setCarouselReady(true), 8000);
    return () => clearTimeout(fallback);
  }, [images]);

  const getImageStyle = useCallback(
    (index: number) => {
      let diff = index - activeIndex;
      if (Math.abs(diff) > totalImages / 2)
        diff = diff > 0 ? diff - totalImages : diff + totalImages;
      const d = Math.abs(diff);

      if (d === 0)
        return {
          zIndex: 10,
          opacity: 1,
          blur: "none",
          size: baseSize,
          halfSize: baseSize / 2,
          border:
            "border-4 border-secondary dark:border-primary shadow-2xl shadow-secondary/40 dark:shadow-primary/40",
          isActive: true,
        };
      if (d === 1)
        return {
          zIndex: 5,
          opacity: 0.85,
          blur: "blur(0.5px)",
          size: baseSize * 0.7,
          halfSize: (baseSize * 0.7) / 2,
          border: "border-gray-400 dark:border-gray-500",
          isActive: false,
        };
      if (d === 2)
        return {
          zIndex: 3,
          opacity: 0.55,
          blur: "blur(1px)",
          size: baseSize * 0.5,
          halfSize: (baseSize * 0.5) / 2,
          border: "border-gray-300 dark:border-gray-600",
          isActive: false,
        };
      if (d === 3)
        return {
          zIndex: 2,
          opacity: 0.35,
          blur: "blur(1.5px)",
          size: baseSize * 0.35,
          halfSize: (baseSize * 0.35) / 2,
          border: "border-gray-200 dark:border-gray-700",
          isActive: false,
        };
      return {
        zIndex: 1,
        opacity: 0.05,
        blur: "blur(4px)",
        size: baseSize * 0.15,
        halfSize: (baseSize * 0.15) / 2,
        border: "border-gray-200 dark:border-gray-700",
        isActive: false,
      };
    },
    [activeIndex, totalImages, baseSize]
  );

  const rotateToIndex = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setCurrentRotation(-index * rotationAngle);
      setActiveIndex(index);
      setTimeout(() => {
        isAnimating.current = false;
      }, 600);
    },
    [rotationAngle]
  );

  // Only auto-rotate once all images are cached
  useEffect(() => {
    if (!carouselReady || isHovering || isDragging) {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      return;
    }
    autoRotateRef.current = setInterval(() => {
      rotateToIndex((activeIndex + 1) % totalImages);
    }, autoRotateInterval);
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [
    isHovering,
    isDragging,
    activeIndex,
    totalImages,
    autoRotateInterval,
    rotateToIndex,
    carouselReady,
  ]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsHovering(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      if (Math.abs(deltaX) > 30) {
        rotateToIndex(
          deltaX > 0
            ? (activeIndex - 1 + totalImages) % totalImages
            : (activeIndex + 1) % totalImages
        );
        setStartX(e.clientX);
      }
    },
    [isDragging, startX, activeIndex, totalImages, rotateToIndex]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsHovering(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > 30) {
        rotateToIndex(
          deltaX > 0
            ? (activeIndex - 1 + totalImages) % totalImages
            : (activeIndex + 1) % totalImages
        );
        touchStartX.current = e.touches[0].clientX;
      }
    },
    [isDragging, activeIndex, totalImages, rotateToIndex]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
  }, []);

  const goToImage = useCallback(
    (index: number) => {
      if (isAnimating.current || index === activeIndex) return;
      rotateToIndex(index);
    },
    [activeIndex, rotateToIndex]
  );

  return (
    <div className={`relative w-full max-w-4xl mx-auto select-none ${className}`}>
      {/* Shimmer placeholder — visible while images preload, fades out after */}
      <div
        className="absolute inset-0 flex items-center justify-center h-[350px] md:h-[400px] pointer-events-none"
        style={{
          opacity: carouselReady ? 0 : 1,
          transition: "opacity 500ms ease-in-out",
          zIndex: carouselReady ? 0 : 20,
        }}
      >
        <div
          className="rounded-full overflow-hidden"
          style={{ width: baseSize, height: baseSize }}
        >
          <div className="w-full h-full rounded-full animate-shimmer" />
        </div>
      </div>

      {/* Carousel — fades in once all images are preloaded */}
      <div
        ref={containerRef}
        className="relative w-full select-none"
        style={{
          opacity: carouselReady ? 1 : 0,
          transition: "opacity 500ms ease-in-out",
        }}
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
        <div className="relative flex items-center justify-center h-[350px] md:h-[400px] overflow-visible">
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${currentRotation}deg)`,
              transition: "transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              willChange: "transform",
            }}
          >
            {images.map((image, index) => {
              const style = getImageStyle(index);
              const { angle } = imagePositions[index];
              const sizeStr = `${style.size}px`;

              return (
                <div
                  key={image.id}
                  className="absolute cursor-pointer"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    width: sizeStr,
                    height: sizeStr,
                    marginLeft: `-${style.halfSize}px`,
                    marginTop: `-${style.halfSize}px`,
                    zIndex: style.zIndex,
                    opacity: style.opacity,
                    filter: style.blur,
                    left: "50%",
                    top: "50%",
                    transition: "all 600ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                    willChange: "transform, opacity, filter",
                  }}
                  onClick={() => goToImage(index)}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden ${style.border} ${style.isActive ? "scale-105" : ""}`}
                    style={{
                      transition: "all 500ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes={sizeStr}
                      priority={style.isActive}
                      draggable={false}
                      quality={style.isActive ? 90 : 70}
                    />
                    {style.isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
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
    </div>
  );
}