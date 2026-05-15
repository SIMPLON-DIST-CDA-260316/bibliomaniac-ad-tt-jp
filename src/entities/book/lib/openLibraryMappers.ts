import type { Book } from "../model/types";
import type { OpenLibrarySearchDoc } from "../model/openLibraryTypes";

const LANGUAGE_MAP: Record<string, string> = {
  fre: "fr",
  eng: "en",
  spa: "es",
  ger: "de",
  ita: "it",
  por: "pt",
  dut: "nl",
  pol: "pl",
  rus: "ru",
  ara: "ar",
  jpn: "ja",
  zho: "zh",
};

export function mapOpenLibraryDocToBook(doc: OpenLibrarySearchDoc): Book {
  // Prioritise "fre" si disponible — la liste contient toutes les langues d'édition,
  // on veut afficher "fr" dès qu'une édition française existe
  const rawLang =
    doc.language?.find((l) => l === "fre") ?? doc.language?.[0] ?? "fre";
  const language = LANGUAGE_MAP[rawLang] ?? rawLang.slice(0, 2);

  const thumbnail = doc.cover_i
    ? `${import.meta.env.VITE_OPEN_LIBRARY_COVERS_URL}/b/id/${doc.cover_i}-M.jpg`
    : "";

  return {
    id: doc.key.replace("/works/", ""),
    title: doc.title ?? "Titre inconnu",
    authors: doc.author_name ?? ["Auteur inconnu"],
    description: doc.description ?? "",
    publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : "",
    pageCount: doc.number_of_pages_median ?? 0,
    categories: doc.subject?.slice(0, 5) ?? [],
    averageRating: doc.ratings_average ?? 0,
    ratingsCount: doc.ratings_count ?? 0,
    thumbnail,
    language,
    publisher: doc.publisher?.[0] ?? "",
  };
}
