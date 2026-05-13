import { useState } from "react";
import type { Book } from "../../../entities/book/model/types";
import { useReservation } from "../../../features/reservation";
import ConfirmationModal from "../../../shared/ui/ConfirmationModal";
import Button from "../../../shared/ui/Button";

export default function ReserveSection({ book }: { book: Book }) {
  const { reserve, cancelReservation, isReserved } = useReservation();
  const reserved = isReserved(book.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    if (reserved) {
      cancelReservation(book.id);
    } else {
      reserve(book);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="pt-6 px-6 md:flex md:justify-center">
      <Button onClick={() => setIsModalOpen(true)} fullWidth className="md:w-72!">
        {reserved ? "Annuler la réservation" : "Réserver maintenant"}
      </Button>
      <ConfirmationModal
        isOpen={isModalOpen}
        title={reserved ? "Annuler la réservation" : "Confirmer la réservation"}
        message={
          reserved
            ? `Souhaitez-vous annuler la réservation de "${book.title}" ?`
            : `Souhaitez-vous réserver "${book.title}" ?`
        }
        confirmLabel={reserved ? "Oui, annuler" : "Oui, réserver"}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </section>
  );
}
