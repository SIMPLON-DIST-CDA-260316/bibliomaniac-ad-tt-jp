import {useState, useMemo} from "react";
import {Search, ChevronRight, Plus} from "lucide-react";
import {Link} from "react-router";
import Tabs from "../shared/ui/Tabs";
import {useReservation} from "../features/reservation";
import {useBooks} from "../features/book/hooks/useBooks";
import {useDebounce} from "../shared/lib/hooks/useDebounce";
import type {Book as EntityBook} from "../entities/book/model/types";
import cover from "../assets/cover_test.jpg";

type Tab = "Etagères" | "Journal" | "Stats";
type Category = "En cours" | "Empruntés" | "Envies" | "Terminés";

const TABS: Tab[] = ["Etagères", "Journal", "Stats"];
const SECTIONS: Category[] = ["En cours", "Empruntés", "Envies", "Terminés"];
const FETCHED_SECTIONS: Category[] = ["En cours", "Envies", "Terminés"];

interface DisplayBook {
  id: string;
  image: string;
  title: string;
  author: string;
  synopsis: string;
  category: Category;
}

function mapToDisplayBook(book: EntityBook, category: Category): DisplayBook {
  return {
    id: book.id,
    image: book.thumbnail || cover,
    title: book.title,
    author: book.authors?.join(", ") || "Auteur inconnu",
    synopsis: book.description || "",
    category,
  };
}

function distributeBooks(books: EntityBook[]): Record<Category, DisplayBook[]> {
  const perSection = Math.max(1, Math.ceil(books.length / FETCHED_SECTIONS.length));
  const result: Record<Category, DisplayBook[]> = {
    "En cours": [],
    "Empruntés": [],
    "Envies": [],
    "Terminés": [],
  };

  FETCHED_SECTIONS.forEach((category, i) => {
    const slice = books.slice(i * perSection, (i + 1) * perSection);
    result[category] = slice.map((b) => mapToDisplayBook(b, category));
  });

  return result;
}

function BookSection({category, books}: { category: Category; books: DisplayBook[] }) {
  const { reservedBooks } = useReservation();

  let displayBooks = books;

  if (category === "Empruntés") {
    const existingTitles = new Set(displayBooks.map((b) => b.title));
    const reservedMapped: DisplayBook[] = reservedBooks
      .filter((rb) => !existingTitles.has(rb.title))
      .map((rb) => ({
        id: rb.id,
        image: rb.thumbnail || cover,
        title: rb.title,
        author: rb.authors?.join(", ") || "Auteur inconnu",
        synopsis: rb.description || "",
        category: "Empruntés" as Category,
      }));
    displayBooks = [...displayBooks, ...reservedMapped];
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-xl font-bold">{category}</h2>
        <Link to="" className="flex items-center gap-0.5 text-sm text-text/60">
          Voir plus <ChevronRight size={16}/>
        </Link>
      </div>
      {displayBooks.length === 0 ? (
        <p className="px-4 text-sm text-text/40 italic">
          {category === "Empruntés"
            ? "Aucun livre emprunté pour le moment."
            : "Aucun livre dans cette section."}
        </p>
      ) : (
        <div
          className="flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory"
        >
          {displayBooks.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="snap-start shrink-0">
              <img
                src={book.image}
                alt={book.title}
                className="w-24 h-36 object-cover rounded-lg"
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Etagères");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const effectiveQuery = debouncedSearch || "roman";
  const { data, isPending, error } = useBooks(effectiveQuery);
  const fetchedBooks = data?.books ?? [];

  const booksByCategory = useMemo(
    () => distributeBooks(fetchedBooks),
    [fetchedBooks],
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-center font-title">Ma Bibliothèque</h1>
      </div>

      <Tabs tabs={TABS} value={activeTab} onChange={(tab) => setActiveTab(tab as Tab)}/>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 bg-white">
          <input
            type="text"
            placeholder="Recherche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
          <Search size={18} className="text-text/60 shrink-0"/>
        </div>
      </div>

      <div className="flex-1 pb-16">
        {activeTab === "Etagères" && (
          <>
            {isPending && (
              <p className="text-center text-sm text-gray-500 py-8">
                Chargement des livres…
              </p>
            )}
            {error && (
              <p className="text-center text-sm text-red-500 py-8">
                Impossible de charger les livres. Une erreur est survenue.
              </p>
            )}
            {!isPending && !error &&
              SECTIONS.map((category) => (
                <BookSection
                  key={category}
                  category={category}
                  books={booksByCategory[category]}
                />
              ))}
          </>
        )}
      </div>

      <button
        className="fixed bottom-20 right-4 bg-primary text-background px-5 py-3 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
        <Plus size={16}/>
        Nouvelle étagère
      </button>
    </div>
  );
}
