export type GoogleBooksVolume = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    language?: string;
    publisher?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
};

export type GoogleBooksSearchResponse = {
  totalItems: number;
  items?: GoogleBooksVolume[];
};

export type Book = {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publishedDate: string;
  pageCount: number;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  thumbnail: string;
  language: string;
  publisher: string;
};
