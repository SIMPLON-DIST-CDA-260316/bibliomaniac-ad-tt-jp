import { useParams } from "react-router";
import BookDescription from "../features/bookDetails/components/BookDescription";
import HeroSection from "../features/bookDetails/components/HeroSection";
import ReserveSection from "../features/bookDetails/components/ReserveSection";
import ReviewSection from "../features/bookDetails/components/ReviewSection";
import SuggestionSection from "../features/bookDetails/components/SuggestionSection";
import { getBookById } from "../features/books/data/mockBooks";

export default function BookDetails() {
  const { id } = useParams();
  if (!id) return <p>Identifiant du livre manquant</p>;

  const book = getBookById(id);
  if (!book) return <p>Le livre recherché est introuvable</p>;

  return (
    <div className="pb-16 md:max-w-4xl md:mx-auto">
      <section className="md:grid md:grid-cols-[260px_1fr]">
        <HeroSection thumbnail={book.thumbnail} title={book.title} />
        <BookDescription
          title={book.title}
          authors={book.authors}
          publishedDate={book.publishedDate}
          pageCount={book.pageCount}
          categories={book.categories}
          language={book.language}
          description={book.description}
        />
      </section>
      <ReviewSection />
      <ReserveSection />
      <SuggestionSection bookId={book.id} categories={book.categories} />
    </div>
  );
}
