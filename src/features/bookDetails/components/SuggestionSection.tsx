import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { searchBooksByCategory } from "../../../entities/book/api/openLibraryApi";
import { bookKeys } from "../../../entities/book/api/queryKeys";
import Carousel from "../../../shared/ui/Carousel";

type SuggestionSectionProps = {
  bookId: string;
  categories: string[];
};

export default function SuggestionSection({
  bookId,
  categories,
}: SuggestionSectionProps) {
  const category = categories[0] ?? "fiction";
  const { data: suggestedBooks = [] } = useQuery({
    queryKey: bookKeys.category(category, bookId),
    queryFn: ({ signal }) => searchBooksByCategory(category, bookId, signal),
    enabled: categories.length > 0,
  });

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
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-31 rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-31 rounded-lg bg-primary/20 flex items-center justify-center text-xs text-foreground/40 text-center px-1">
                  Couverture indisponible
                </div>
              )}
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
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  title={book.title}
                  className="w-full h-36 rounded-lg object-cover hover:opacity-80 transition-opacity"
                />
              ) : (
                <div
                  title={book.title}
                  className="w-full h-36 rounded-lg bg-primary/20 flex items-center justify-center text-xs text-foreground/40 text-center px-1 hover:opacity-80 transition-opacity"
                >
                  Couverture indisponible
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
