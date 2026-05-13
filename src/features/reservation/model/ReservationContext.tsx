import { createContext, useContext, useEffect, useState } from "react";
import type { Book } from "../../../entities/book/model/types";
import type { ReservationContextValue } from "./types";

const STORAGE_KEY = "bibliomaniac_reservations";

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reservedBooks, setReservedBooks] = useState<Book[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservedBooks));
  }, [reservedBooks]);

  const reserve = (book: Book) =>
    setReservedBooks((prev) =>
      prev.some((b) => b.id === book.id) ? prev : [...prev, book]
    );

  const cancelReservation = (bookId: string) =>
    setReservedBooks((prev) => prev.filter((b) => b.id !== bookId));

  const isReserved = (bookId: string) =>
    reservedBooks.some((b) => b.id === bookId);

  return (
    <ReservationContext.Provider
      value={{ reservedBooks, reserve, cancelReservation, isReserved }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation(): ReservationContextValue {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error("useReservation doit être utilisé dans un ReservationProvider");
  }
  return ctx;
}
