"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  altPrefix: string;
  className?: string;
}

export function Gallery({ images, altPrefix, className }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const width = el.clientWidth;
    const newIndex = Math.round(el.scrollLeft / width);
    setActiveIndex(newIndex);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollTo({ left: width * index, behavior: "smooth" });
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 snap-center px-1"
          >
            <img
              src={img}
              alt={`${altPrefix} ${i + 1}`}
              className="w-full rounded-lg border border-neutral-200 object-cover transition-colors dark:border-neutral-800"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === activeIndex
                  ? "w-4 bg-neutral-800 dark:bg-neutral-200"
                  : "w-1.5 bg-neutral-300 dark:bg-neutral-700"
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="absolute right-2 top-2 rounded-full bg-neutral-900/70 px-2 py-0.5 text-xs text-white dark:bg-white/20 dark:text-neutral-200">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
