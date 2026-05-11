import { useParams } from "react-router";
import BookDescription from "../features/bookDetails/components/BookDescription";
import HeroSection from "../features/bookDetails/components/HeroSection";
import ReviewSection from "../features/bookDetails/components/ReviewSection";
import { getBookById } from "../features/books/data/mockBooks";

export default function BookDetails() {
  const { id } = useParams();
  if (!id) return <p>Identifiant du livre manquant</p>;

  const book = getBookById(id);
  if (!book) return <p>Le livre recherché est introuvable</p>;

  return (
    <main className="pb-4">
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
      <ReviewSection />
    </main>
  );
}
