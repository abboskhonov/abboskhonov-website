"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  altPrefix: string;
  className?: string;
}

export function Gallery({ images, altPrefix, className }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const prev = useCallback(() => {
    const nextIndex = activeIndex <= 0 ? images.length - 1 : activeIndex - 1;
    scrollTo(nextIndex);
  }, [activeIndex, images.length, scrollTo]);

  const next = useCallback(() => {
    const nextIndex = activeIndex >= images.length - 1 ? 0 : activeIndex + 1;
    scrollTo(nextIndex);
  }, [activeIndex, images.length, scrollTo]);

  const openViewer = useCallback((index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setViewerVisible(true));
    });
  }, []);

  const closeViewer = useCallback(() => {
    setViewerVisible(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setViewerOpen(false);
    }, 300);
  }, []);

  const viewerPrev = useCallback(() => {
    setViewerIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const viewerNext = useCallback(() => {
    setViewerIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!viewerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") viewerPrev();
      if (e.key === "ArrowRight") viewerNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [viewerOpen, closeViewer, viewerPrev, viewerNext]);

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
            <button
              onClick={() => openViewer(i)}
              className="w-full cursor-zoom-in"
            >
              <img
                src={img}
                alt={`${altPrefix} ${i + 1}`}
                className="w-full rounded-lg border border-neutral-200 object-cover transition-colors dark:border-neutral-800"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/70 p-1.5 text-white transition-colors hover:bg-neutral-900/90 dark:bg-white/20 dark:text-neutral-200 dark:hover:bg-white/30"
            aria-label="Previous image"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-neutral-900/70 p-1.5 text-white transition-colors hover:bg-neutral-900/90 dark:bg-white/20 dark:text-neutral-200 dark:hover:bg-white/30"
            aria-label="Next image"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

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

      {/* Lightbox */}
      {viewerOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300 ease-out",
            viewerVisible ? "opacity-100" : "opacity-0"
          )}
          onClick={closeViewer}
        >
          {/* Close */}
          <button
            onClick={closeViewer}
            className={cn(
              "absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-all duration-300 ease-out hover:bg-white/20",
              viewerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
            aria-label="Close viewer"
          >
            <IconX className="h-5 w-5" />
          </button>

          {/* Slider */}
          <div
            className="relative w-full max-w-[90vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${viewerIndex * 100}%)` }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 flex items-center justify-center px-2"
                >
                  <img
                    src={img}
                    alt={`${altPrefix} ${i + 1}`}
                    className={cn(
                      "max-h-[85vh] max-w-full rounded-lg object-contain",
                      viewerVisible ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Counter */}
          <div
            className={cn(
              "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white transition-all duration-300 ease-out",
              viewerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {viewerIndex + 1} / {images.length}
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  viewerPrev();
                }}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-all duration-300 ease-out hover:bg-white/20",
                  viewerVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )}
                aria-label="Previous image"
              >
                <IconChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  viewerNext();
                }}
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-all duration-300 ease-out hover:bg-white/20",
                  viewerVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                )}
                aria-label="Next image"
              >
                <IconChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
