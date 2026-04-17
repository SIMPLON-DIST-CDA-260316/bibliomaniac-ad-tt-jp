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

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Le Seigneur des Anneaux : La Communauté de l'Anneau",
    authors: ["J.R.R. Tolkien"],
    description:
      "Dans un pays paisible et verdoyant, un jeune hobbit nommé Frodo Sacquet hérite d'un anneau magique, sans se douter que cet objet est en réalité l'Anneau Unique forgé par le seigneur des ténèbres Sauron pour dominer le monde.",
    publishedDate: "1954-07-29",
    pageCount: 432,
    categories: ["Fantasy", "Aventure"],
    averageRating: 4.8,
    ratingsCount: 125430,
    thumbnail: "https://covers.openlibrary.org/b/id/8743161-L.jpg",
    language: "fr",
    publisher: "Christian Bourgois",
  },
  {
    id: "2",
    title: "Dune",
    authors: ["Frank Herbert"],
    description:
      "Sur la planète désertique Arrakis, unique source de l'épice la plus précieuse de l'univers, le jeune Paul Atréides se retrouve au cœur d'une lutte de pouvoir entre grandes maisons nobles. Une épopée de science-fiction qui explore la politique, la religion et l'écologie.",
    publishedDate: "1965-08-01",
    pageCount: 688,
    categories: ["Science-Fiction", "Aventure"],
    averageRating: 4.7,
    ratingsCount: 98210,
    thumbnail: "https://covers.openlibrary.org/b/id/12631243-L.jpg",
    language: "fr",
    publisher: "Robert Laffont",
  },
  {
    id: "3",
    title: "1984",
    authors: ["George Orwell"],
    description:
      "Dans une société totalitaire où Big Brother surveille chaque fait et geste, Winston Smith, employé du ministère de la Vérité, commence à douter du régime. Un roman dystopique fondateur sur la surveillance, la propagande et la résistance individuelle.",
    publishedDate: "1949-06-08",
    pageCount: 328,
    categories: ["Dystopie", "Politique"],
    averageRating: 4.6,
    ratingsCount: 210500,
    thumbnail: "https://covers.openlibrary.org/b/id/8575708-L.jpg",
    language: "fr",
    publisher: "Gallimard",
  },
  {
    id: "4",
    title: "Harry Potter à l'école des sorciers",
    authors: ["J.K. Rowling"],
    description:
      "Le jour de ses onze ans, Harry Potter, orphelin élevé par son oncle et sa tante qui le traitent comme un domestique, apprend qu'il est sorcier. Il entre à Poudlard, l'école de magie, où il se fait des amis et des ennemis, et découvre la vérité sur la mort de ses parents.",
    publishedDate: "1997-06-26",
    pageCount: 320,
    categories: ["Fantasy", "Jeunesse"],
    averageRating: 4.9,
    ratingsCount: 350000,
    thumbnail: "https://covers.openlibrary.org/b/id/10110415-L.jpg",
    language: "fr",
    publisher: "Gallimard Jeunesse",
  },
  {
    id: "5",
    title: "Le Petit Prince",
    authors: ["Antoine de Saint-Exupéry"],
    description:
      "Un aviateur en panne dans le désert fait la rencontre d'un mystérieux petit bonhomme venu d'une autre planète. Au fil de leur conversation, le Petit Prince lui raconte ses voyages et ses rencontres, livrant de précieux enseignements sur l'amitié, l'amour et le sens de la vie.",
    publishedDate: "1943-04-06",
    pageCount: 96,
    categories: ["Littérature", "Philosophie"],
    averageRating: 4.7,
    ratingsCount: 180000,
    thumbnail: "https://covers.openlibrary.org/b/id/8371163-L.jpg",
    language: "fr",
    publisher: "Gallimard",
  },
];

export function getBookById(id: string): Book | undefined {
  return mockBooks.find((book) => book.id === id);
}
