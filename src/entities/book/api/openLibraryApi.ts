import { createHttpClient } from "../../../shared/api/httpClient";
import type {
  OpenLibrarySearchDoc,
  OpenLibrarySearchResponse,
} from "../model/openLibraryTypes";
import type { Book } from "../model/types";
import { mapOpenLibraryDocToBook } from "../lib/openLibraryMappers";
import { ApiError } from "../../../shared/api/types";

const openLibraryGet = createHttpClient(
  import.meta.env.VITE_OPEN_LIBRARY_API_URL as string,
);

const SEARCH_FIELDS = [
  "key",
  "title",
  "author_name",
  "description",
  "number_of_pages_median",
  "subject",
  "publisher",
  "ratings_average",
  "ratings_count",
  "language",
  "cover_i",
  "first_publish_year",
].join(",");

// Mapping 2-letter langRestrict ("fr") → 3-letter OpenLibrary code ("fre")
const LANG_TO_OL: Record<string, string> = {
  fr: "fre",
  en: "eng",
  es: "spa",
  de: "ger",
  it: "ita",
  pt: "por",
};

export async function searchBooks(
  query: string,
  options?: { maxResults?: number; langRestrict?: string; page?: number },
  signal?: AbortSignal,
): Promise<{ books: Book[]; totalResults: number }> {
  const params: Record<string, string | number> = {
    fields: SEARCH_FIELDS,
    limit: options?.maxResults ?? 20,
    page: options?.page ?? 1,
    q: query,
  };

  if (options?.langRestrict) {
    params.language = LANG_TO_OL[options.langRestrict] ?? options.langRestrict;
  }

  const data = await openLibraryGet<OpenLibrarySearchResponse>(
    "/search.json",
    params,
    signal,
  );
  return {
    books: (data.docs ?? []).map(mapOpenLibraryDocToBook),
    totalResults: data.numFound ?? 0,
  };
}

export async function fetchBookById(
  id: string,
  signal?: AbortSignal,
): Promise<Book> {
  const data = await openLibraryGet<OpenLibrarySearchResponse>(
    "/search.json",
    {
      fields: SEARCH_FIELDS,
      limit: 1,
      q: `key:/works/${id}`,
    },
    signal,
  );

  const doc: OpenLibrarySearchDoc | undefined = data.docs[0];
  if (!doc) {
    throw new ApiError(404, "Livre introuvable");
  }

  return mapOpenLibraryDocToBook(doc);
}

export async function searchBooksByCategory(
  category: string,
  excludeId: string,
  signal?: AbortSignal,
): Promise<Book[]> {
  const data = await openLibraryGet<OpenLibrarySearchResponse>(
    "/search.json",
    {
      fields: "key,title,author_name,cover_i",
      subject: category,
      limit: 12,
    },
    signal,
  );

  return (data.docs ?? [])
    .map(mapOpenLibraryDocToBook)
    .filter((book) => book.id !== excludeId);
}
