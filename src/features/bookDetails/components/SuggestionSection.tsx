import { Link } from "react-router";
import Carousel from "../../../shared/ui/Carousel";
import { getBooksByCategories } from "../../books/data/mockBooks";

type SuggestionSectionProps = {
  bookId: string;
  categories: string[];
};

export default function SuggestionSection({
  bookId,
  categories,
}: SuggestionSectionProps) {
  const suggestedBooks = getBooksByCategories(categories, bookId);

  return (
    <section className="px-6">
      <Carousel
        title="Dans le même genre"
        visibleCount={3.5}
        items={suggestedBooks}
        renderItem={(book) => (
          <Link to={`/books/${book.id}`} onClick={() => window.scrollTo(0, 0)}>
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-31 rounded-lg object-cover"
            />
          </Link>
        )}
      />
    </section>
  );
}
