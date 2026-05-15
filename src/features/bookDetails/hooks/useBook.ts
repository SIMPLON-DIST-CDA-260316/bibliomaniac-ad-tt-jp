import { useQuery } from "@tanstack/react-query";
import { fetchBookById } from "../../../entities/book/api/openLibraryApi";
import { bookKeys } from "../../../entities/book/api/queryKeys";

export function useBook(id: string) {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: ({ signal }) => fetchBookById(id, signal),
    enabled: !!id,
  });
}
