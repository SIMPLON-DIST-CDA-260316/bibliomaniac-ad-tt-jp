import { ApiError } from "./types";

const BASE_URL = "https://www.googleapis.com/books/v1";

export async function httpGet<T>(
  path: string,
  params?: Record<string, string | number>,
  signal?: AbortSignal,
): Promise<T> {
  const { q, ...otherParams } = params ?? {};

  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(otherParams).forEach(([key, value]) =>
    url.searchParams.set(key, String(value)),
  );

  // Le paramètre `q` est appendé sans ré-encodage pour préserver les opérateurs
  // comme `inauthor:`, `subject:`, `OR` que URLSearchParams encoderait incorrectement
  const urlString = q
    ? `${url.toString()}${url.search ? "&" : "?"}q=${q}`
    : url.toString();

  const res = await fetch(urlString, { signal });

  if (!res.ok) {
    throw new ApiError(res.status, `HTTP error ${res.status}`);
  }

  return res.json() as Promise<T>;
}
