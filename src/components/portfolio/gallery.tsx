"use client"

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  startTransition,
  ViewTransition,
} from "react"
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

interface GalleryProps {
  images: string[]
  altPrefix: string
  className?: string
}

export function Gallery({ images, altPrefix, className }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const width = el.clientWidth
    const newIndex = Math.round(el.scrollLeft / width)
    setActiveIndex(newIndex)
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const width = el.clientWidth
    el.scrollTo({ left: width * index, behavior: "smooth" })
  }, [])

  const prev = useCallback(() => {
    const nextIndex = activeIndex <= 0 ? images.length - 1 : activeIndex - 1
    scrollTo(nextIndex)
  }, [activeIndex, images.length, scrollTo])

  const next = useCallback(() => {
    const nextIndex = activeIndex >= images.length - 1 ? 0 : activeIndex + 1
    scrollTo(nextIndex)
  }, [activeIndex, images.length, scrollTo])

  // Both run inside startTransition so <ViewTransition> morphs the image and
  // fades the backdrop in a single animation.
  const openViewer = useCallback((index: number) => {
    startTransition(() => {
      setViewerIndex(index)
      setViewerOpen(true)
    })
  }, [])

  const closeViewer = useCallback(() => {
    // Land on the image the viewer was showing so it morphs back into place.
    scrollRef.current?.scrollTo({
      left: scrollRef.current.clientWidth * viewerIndex,
    })
    startTransition(() => {
      setViewerOpen(false)
    })
  }, [viewerIndex])

  const viewerPrev = useCallback(() => {
    setViewerIndex((i) => (i <= 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const viewerNext = useCallback(() => {
    setViewerIndex((i) => (i >= images.length - 1 ? 0 : i + 1))
  }, [images.length])

  useEffect(() => {
    if (!viewerOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer()
      if (e.key === "ArrowLeft") viewerPrev()
      if (e.key === "ArrowRight") viewerNext()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [viewerOpen, closeViewer, viewerPrev, viewerNext])

  return (
    <div className={cn("group relative", className)}>
      {/* -mx-1 cancels the slides' px-1 gutters so images line up with the
          column edges. */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="-mx-1 flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={i} className="w-full flex-shrink-0 snap-center px-1">
            <button
              onClick={() => openViewer(i)}
              className="w-full cursor-zoom-in"
            >
              {viewerOpen && viewerIndex === i ? (
                <img
                  src={img}
                  alt=""
                  className="invisible w-full rounded-lg border"
                />
              ) : (
                <ViewTransition
                  name={`gallery-img-${i}`}
                  share="image-morph"
                  default="none"
                >
                  <img
                    src={img}
                    alt={`${altPrefix} ${i + 1}`}
                    className="w-full rounded-lg border border-neutral-200 object-cover transition-colors dark:border-neutral-800"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </ViewTransition>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/80 focus-visible:opacity-100"
            aria-label="Previous image"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/80 focus-visible:opacity-100"
            aria-label="Next image"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
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

      {/* Lightbox */}
      {viewerOpen && (
        <ViewTransition
          enter="lightbox-backdrop"
          exit="lightbox-backdrop"
          default="none"
        >
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeViewer}
          >
            {/* Close */}
            <button
              onClick={closeViewer}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
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
                    className="flex w-full flex-shrink-0 items-center justify-center px-2"
                  >
                    {i === viewerIndex ? (
                      <ViewTransition
                        name={`gallery-img-${i}`}
                        share="image-morph"
                        default="none"
                      >
                        <img
                          src={img}
                          alt={`${altPrefix} ${i + 1}`}
                          className="max-h-[85vh] max-w-full rounded-lg object-contain"
                        />
                      </ViewTransition>
                    ) : (
                      <img
                        src={img}
                        alt={`${altPrefix} ${i + 1}`}
                        className="max-h-[85vh] max-w-full rounded-lg object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white transition-colors">
              {viewerIndex + 1} / {images.length}
            </div>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    viewerPrev()
                  }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <IconChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    viewerNext()
                  }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                  aria-label="Next image"
                >
                  <IconChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </ViewTransition>
      )}
    </div>
  )
}
