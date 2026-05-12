import type { Book, GoogleBooksVolume } from "../model/types";

export function mapVolumeToBook(volume: GoogleBooksVolume): Book {
  const info = volume.volumeInfo;

  return {
    id: volume.id,
    title: info.title ?? "Titre inconnu",
    authors: info.authors ?? ["Auteur inconnu"],
    description: info.description ?? "",
    publishedDate: info.publishedDate ?? "",
    pageCount: info.pageCount ?? 0,
    categories: info.categories ?? [],
    averageRating: info.averageRating ?? 0,
    ratingsCount: info.ratingsCount ?? 0,
    // L'API Google Books retourne des URLs en HTTP — on force HTTPS pour éviter le mixed content
    thumbnail: (info.imageLinks?.thumbnail ?? "").replace(
      "http://",
      "https://",
    ),
    language: info.language ?? "fr",
    publisher: info.publisher ?? "",
  };
}
