import { useEffect, useRef, useState } from "react";
import { fetchBookById } from "../../../entities/book/api/googleBooksApi";
import type { Book } from "../../../entities/book/model/types";

export function useBook(id: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetchBookById(id, controller.signal)
      .then((result) => {
        setBook(result);
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
  }, [id]);

  return { book, isPending, error };
}
