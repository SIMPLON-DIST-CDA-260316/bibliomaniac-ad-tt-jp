export type OpenLibrarySearchDoc = {
  key: string;
  title?: string;
  author_name?: string[];
  description?: string;
  first_publish_year?: number;
  number_of_pages_median?: number;
  subject?: string[];
  publisher?: string[];
  ratings_average?: number;
  ratings_count?: number;
  language?: string[];
  cover_i?: number;
};

export type OpenLibrarySearchResponse = {
  numFound: number;
  start: number;
  docs: OpenLibrarySearchDoc[];
};
