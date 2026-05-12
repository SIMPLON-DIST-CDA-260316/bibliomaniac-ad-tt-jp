import { useEffect, useState } from "react";
import { Link } from "react-router";
import { searchBooksByCategory } from "../../../entities/book/api/googleBooksApi";
import type { Book } from "../../../entities/book/model/types";
import Carousel from "../../../shared/ui/Carousel";

type SuggestionSectionProps = {
  bookId: string;
  categories: string[];
};

export default function SuggestionSection({
  bookId,
  categories,
}: SuggestionSectionProps) {
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const category = categories[0] ?? "fiction";

    searchBooksByCategory(category, bookId, controller.signal)
      .then(setSuggestedBooks)
      .catch((err: Error) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [bookId, categories]);

  if (suggestedBooks.length === 0) return null;

  return (
    <section className="px-6">
      {/* Mobile : carousel */}
      <div className="md:hidden">
        <Carousel
          title="Dans le même genre"
          visibleCount={3.5}
          items={suggestedBooks}
          renderItem={(book) => (
            <Link
              to={`/books/${book.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-31 rounded-lg object-cover"
              />
            </Link>
          )}
        />
      </div>

      {/* Desktop : grille */}
      <div className="hidden md:block">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          Dans le même genre
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {suggestedBooks.slice(0, 10).map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                title={book.title}
                className="w-full h-36 rounded-lg object-cover hover:opacity-80 transition-opacity"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
