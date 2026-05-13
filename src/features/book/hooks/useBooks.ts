import { useEffect, useRef, useState } from "react";
import { searchBooks } from "../../../entities/book/api/openLibraryApi";
import type { Book } from "../../../entities/book/model/types";

export function useBooks(query: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    searchBooks(query, { maxResults: 40, langRestrict: "fr" }, controller.signal)
      .then((results) => {
        setBooks(results);
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
  }, [query]);

  return { books, isPending, error };
}
