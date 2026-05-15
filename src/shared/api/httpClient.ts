import { ApiError } from "./types";

function createHttpClient(baseUrl: string) {
  return async function get<T>(
    path: string,
    params?: Record<string, string | number>,
    signal?: AbortSignal,
  ): Promise<T> {
    const { q, ...otherParams } = params ?? {};

    const url = new URL(`${baseUrl}${path}`);
    Object.entries(otherParams).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );

    // `q` appendé sans ré-encodage pour préserver les opérateurs comme `inauthor:`, `subject:`, `OR`
    const urlString = q
      ? `${url.toString()}${url.search ? "&" : "?"}q=${q}`
      : url.toString();

    const res = await fetch(urlString, { signal });

    if (!res.ok) {
      throw new ApiError(res.status, `HTTP error ${res.status}`);
    }

    return res.json() as Promise<T>;
  };
}

export { createHttpClient };
