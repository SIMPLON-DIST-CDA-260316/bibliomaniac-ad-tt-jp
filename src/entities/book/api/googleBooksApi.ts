import { httpGet } from "../../../shared/api/httpClient";
import type {
  Book,
  GoogleBooksSearchResponse,
  GoogleBooksVolume,
} from "../model/types";
import { mapVolumeToBook } from "../lib/mappers";

export async function searchBooks(
  query: string,
  options?: { maxResults?: number; langRestrict?: string },
  signal?: AbortSignal,
): Promise<Book[]> {
  const params: Record<string, string | number> = { q: query };
  if (options?.maxResults) params.maxResults = options.maxResults;
  if (options?.langRestrict) params.langRestrict = options.langRestrict;

  const data = await httpGet<GoogleBooksSearchResponse>(
    "/volumes",
    params,
    signal,
  );

  return (data.items ?? []).map(mapVolumeToBook);
}

export async function fetchBookById(
  id: string,
  signal?: AbortSignal,
): Promise<Book> {
  const volume = await httpGet<GoogleBooksVolume>(`/volumes/${id}`, {}, signal);
  return mapVolumeToBook(volume);
}

export async function searchBooksByCategory(
  category: string,
  excludeId: string,
  signal?: AbortSignal,
): Promise<Book[]> {
  const books = await searchBooks(
    `subject:${category}`,
    { maxResults: 12, langRestrict: "fr" },
    signal,
  );
  return books.filter((book) => book.id !== excludeId);
}
