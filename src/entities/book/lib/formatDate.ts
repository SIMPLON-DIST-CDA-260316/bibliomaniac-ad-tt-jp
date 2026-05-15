export function formatPublishedDate(dateStr: string): string {
  if (!dateStr) return "Date inconnue";

  const parts = dateStr.split("-");
  const year = parseInt(parts[0]);
  const month = parts[1] ? parseInt(parts[1]) - 1 : undefined;
  const day = parts[2] ? parseInt(parts[2]) : undefined;

  // Parsing manuel pour éviter les décalages UTC de new Date("YYYY-MM-DD")
  if (month !== undefined && day !== undefined) {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(year, month, day));
  }

  if (month !== undefined) {
    return new Intl.DateTimeFormat("fr-FR", {
      month: "long",
      year: "numeric",
    }).format(new Date(year, month, 1));
  }

  return String(year);
}
