import { useParams } from "react-router";
import BookDescription from "../features/bookDetails/components/BookDescription";
import HeroSection from "../features/bookDetails/components/HeroSection";
import ReserveSection from "../features/bookDetails/components/ReserveSection";
import ReviewSection from "../features/bookDetails/components/ReviewSection";
import SuggestionSection from "../features/bookDetails/components/SuggestionSection";
import { useBook } from "../features/bookDetails/hooks/useBook";

export default function BookDetails() {
  const { id } = useParams();
  if (!id) return <p>Identifiant du livre manquant</p>;

  return <BookDetailsContent id={id} />;
}

function BookDetailsContent({ id }: { id: string }) {
  const { data: book, isPending, error } = useBook(id);

  if (isPending)
    return (
      <p className="text-center text-sm text-gray-500 py-16">
        Chargement du livre…
      </p>
    );

  if (error || !book)
    return (
      <p className="text-center text-sm text-red-500 py-16">
        Impossible de charger ce livre. Vérifie ta connexion.
      </p>
    );

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
      <ReserveSection book={book} />
      <SuggestionSection bookId={book.id} categories={book.categories} />
    </div>
  );
}
