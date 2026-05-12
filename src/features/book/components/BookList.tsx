import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useBooks } from "../hooks/useBooks";
import BookCard from "./BookCard";

export default function BookList() {
  const { books, isPending, error } = useBooks("roman");

  return (
    <div>
      <Link to="" className="flex justify-between pb-4 md:justify-start">
        <h1 className="font-semibold">Livres populaires</h1>
        <ChevronRight />
      </Link>
      <div className="mt-2">
        {isPending && (
          <p className="text-center text-sm text-gray-500 py-8">
            Chargement des livres…
          </p>
        )}
        {error && (
          <p className="text-center text-sm text-red-500 py-8">
            Impossible de charger les livres. Une erreur est survenue.
          </p>
        )}
        {!isPending && !error && (
          <ul className="flex flex-col gap-1.5 md:grid md:grid-cols-3">
            {books.map((book) => (
              <li key={book.id}>
                <BookCard
                  id={book.id}
                  image={book.thumbnail}
                  title={book.title}
                  author={book.authors[0]}
                  synopsis={book.description}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
