export const bookKeys = {
  search: (query: string, page: number, perPage: number) =>
    ["books", query, page, perPage] as const,
  detail: (id: string) =>
    ["books", "detail", id] as const,
  category: (category: string, excludeId: string) =>
    ["books", "category", category, excludeId] as const,
};
