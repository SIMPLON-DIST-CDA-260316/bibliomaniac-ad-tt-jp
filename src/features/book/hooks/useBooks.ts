import { useEffect, useRef, useState } from "react";
import { searchBooks } from "../../../entities/book/api/openLibraryApi";
import type { Book } from "../../../entities/book/model/types";

export function useBooks(query: string, page: number = 1, booksPerPage: number = 20) {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    searchBooks(query, { maxResults: booksPerPage, langRestrict: "fr", page }, controller.signal)
      .then(({ books: results, totalResults: total }) => {
        setBooks(results);
        setTotalResults(total);
        setIsPending(false);
        setError(null);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setError(err);
          setIsPending(false);
        }
      });

    return () => controller.abort();
  }, [query, page, booksPerPage]);

  return { books, totalResults, isPending, error };
}
