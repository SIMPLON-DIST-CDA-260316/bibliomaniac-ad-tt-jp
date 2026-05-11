import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  title?: string;
  visibleCount?: number;
  onSeeMore?: () => void;
}

export default function Carousel<T>({
  items,
  renderItem,
  title,
  visibleCount = 4,
  onSeeMore,
}: CarouselProps<T>) {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        {title ? (
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            {title}
          </h2>
        ) : (
          <div />
        )}

        {onSeeMore && (
          <button
            onClick={onSeeMore}
            className="flex items-center gap-0.5 text-sm font-medium cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: "var(--color-text)" }}
          >
            Voir plus
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              flex: `0 0 calc(${100 / visibleCount}% - ${((visibleCount - 1) * 16) / visibleCount}px)`,
            }}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </section>
  );
}
