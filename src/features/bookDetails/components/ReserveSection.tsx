import Button from "../../../shared/ui/Button";

export default function ReserveSection() {
  const handleClick = () => {
    /* TODO : Implémenter une logique au clic pour la réservation d'un livre */
  };

  return (
    <section className="pt-6 px-6 md:flex md:justify-center">
      <Button onClick={handleClick} fullWidth className="md:w-72!">
        Réserver maintenant
      </Button>
    </section>
  );
}
