import type { Book } from "../../../entities/book/model/types";

export type ReservationContextValue = {
  reservedBooks: Book[];
  reserve: (book: Book) => void;
  cancelReservation: (bookId: string) => void;
  isReserved: (bookId: string) => boolean;
};
