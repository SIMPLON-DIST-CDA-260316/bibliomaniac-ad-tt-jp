import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../../../entities/book/api/openLibraryApi";
import { bookKeys } from "../../../entities/book/api/queryKeys";

export function useBooks(query: string, page = 1, booksPerPage = 20) {
  return useQuery({
    queryKey: bookKeys.search(query, page, booksPerPage),
    queryFn: ({ signal }) =>
      searchBooks(query, { maxResults: booksPerPage, langRestrict: "fr", page }, signal),
    enabled: query.trim().length > 0,
  });
}
