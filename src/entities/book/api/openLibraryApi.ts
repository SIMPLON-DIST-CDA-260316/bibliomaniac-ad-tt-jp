import { ApiError } from "../../../shared/api/types";
import type {
  OpenLibrarySearchDoc,
  OpenLibrarySearchResponse,
} from "../model/openLibraryTypes";
import type { Book } from "../model/types";
import { mapOpenLibraryDocToBook } from "../lib/openLibraryMappers";

const BASE_URL = "https://openlibrary.org";

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

// Même technique que httpClient.ts : `q` appendé sans ré-encodage pour préserver
// les opérateurs comme `key:/works/OL12345W`
async function searchGet(
  params: Record<string, string | number>,
  signal?: AbortSignal,
): Promise<OpenLibrarySearchResponse> {
  const { q, ...otherParams } = params;

  const url = new URL(`${BASE_URL}/search.json`);
  Object.entries(otherParams).forEach(([key, value]) =>
    url.searchParams.set(key, String(value)),
  );

  const urlString = q
    ? `${url.toString()}${url.search ? "&" : "?"}q=${q}`
    : url.toString();

  const res = await fetch(urlString, { signal });

  if (!res.ok) {
    throw new ApiError(res.status, `HTTP error ${res.status}`);
  }

  return res.json() as Promise<OpenLibrarySearchResponse>;
}

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
  options?: { maxResults?: number; langRestrict?: string },
  signal?: AbortSignal,
): Promise<Book[]> {
  const params: Record<string, string | number> = {
    fields: SEARCH_FIELDS,
    limit: options?.maxResults ?? 40,
    q: query,
  };

  if (options?.langRestrict) {
    params.language = LANG_TO_OL[options.langRestrict] ?? options.langRestrict;
  }

  const data = await searchGet(params, signal);
  return (data.docs ?? []).map(mapOpenLibraryDocToBook);
}

export async function fetchBookById(
  id: string,
  signal?: AbortSignal,
): Promise<Book> {
  const data = await searchGet(
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
  const data = await searchGet(
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
