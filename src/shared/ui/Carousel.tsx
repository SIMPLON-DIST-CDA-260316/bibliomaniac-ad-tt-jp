import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  title?: string;
  visibleCount?: number;
}

function useEffectiveCount(desktopCount: number): number {
  const [count, setCount] = useState<number>(desktopCount);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 768) setCount(2);
      else if (w < 1024) setCount(Math.min(3, desktopCount));
      else setCount(desktopCount);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [desktopCount]);

  return count;
}

export default function Carousel<T>({
  items,
  renderItem,
  title,
  visibleCount = 4,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const effectiveCount = useEffectiveCount(visibleCount);
  const maxIndex = Math.max(0, items.length - effectiveCount);
  const clampedIndex = Math.min(currentIndex, maxIndex);

  useLayoutEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setItemWidth(containerRef.current.offsetWidth / effectiveCount);
      }
    };

    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [effectiveCount]);

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(maxIndex, index)));
  };

  const canGoPrev = clampedIndex > 0;
  const canGoNext = clampedIndex < maxIndex;

  return (
    <section className="py-8">
      <div className="flex items-end justify-between mb-6 px-1">
        {title ? (
          <div className="relative pb-2">
            <h2
              className="text-2xl tracking-tight"
              style={{
                fontFamily: "var(--font-title)",
                color: "var(--color-text)",
              }}
            >
              {title}
            </h2>
            <div
              className="absolute bottom-0 left-0 h-px w-10"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          </div>
        ) : (
          <div />
        )}

        <div className="flex gap-1.5">
          <button
            onClick={() => goTo(clampedIndex - 1)}
            disabled={!canGoPrev}
            aria-label="Précédent"
            className="w-8 h-8 flex items-center justify-center border transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            style={{
              borderColor: canGoPrev
                ? "var(--color-accent)"
                : "var(--color-text)",
              color: canGoPrev ? "var(--color-accent)" : "var(--color-text)",
            }}
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => goTo(clampedIndex + 1)}
            disabled={!canGoNext}
            aria-label="Suivant"
            className="w-8 h-8 flex items-center justify-center border transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            style={{
              borderColor: canGoNext
                ? "var(--color-accent)"
                : "var(--color-text)",
              color: canGoNext ? "var(--color-accent)" : "var(--color-text)",
            }}
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div ref={containerRef} className="overflow-hidden relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to right, var(--color-background), transparent)",
            opacity: canGoPrev ? 1 : 0,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to left, var(--color-background), transparent)",
            opacity: canGoNext ? 1 : 0,
          }}
        />

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${clampedIndex * itemWidth}px)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: `${100 / effectiveCount}%`,
                maxWidth: `${100 / effectiveCount}%`,
              }}
              className="px-2 first:pl-0 last:pr-0"
            >
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Aller à la position ${i + 1}`}
              className="transition-all duration-300 cursor-pointer rounded-full"
              style={{
                width: i === clampedIndex ? "20px" : "5px",
                height: "5px",
                backgroundColor:
                  i === clampedIndex
                    ? "var(--color-accent)"
                    : "var(--color-text)",
                opacity: i === clampedIndex ? 1 : 0.2,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
