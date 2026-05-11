import { useMemo, useRef, useState } from "react";
import mockReviews from "../data/mockReviews.json";

type Review = {
  id: number;
  author: string;
  text: string;
};

function getRandomReviews(count: number): Review[] {
  const shuffled = [...mockReviews].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function ReviewSection() {
  const reviews = useMemo(() => getRandomReviews(5), []);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      setCurrent((prev) =>
        delta > 0
          ? Math.min(prev + 1, reviews.length - 1)
          : Math.max(prev - 1, 0),
      );
    }
    touchStartX.current = null;
  };

  return (
    <section className="px-6">
      <div className="bg-primary/70 text-white rounded-lg overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {reviews.map((review) => (
            <article
              key={review.id}
              className="min-w-full p-4 flex flex-col justify-between"
            >
              <p className="italic">"{review.text}"</p>
              <p className="text-end font-semibold mt-2">- {review.author}</p>
            </article>
          ))}
        </div>
        <div className="flex justify-center gap-2 pb-4">
          {reviews.map((review, i) => (
            <button
              key={review.id}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-4 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
