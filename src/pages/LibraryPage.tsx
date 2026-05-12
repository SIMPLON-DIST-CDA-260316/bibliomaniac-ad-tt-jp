import {useState} from "react";
import {Search, ChevronRight, Plus} from "lucide-react";
import {Link} from "react-router";
import Tabs from "../shared/ui/Tabs";
import cover from "../assets/cover_test.jpg";

type Tab = "Etagères" | "Journal" | "Stats";
type Category = "En cours" | "Empruntés" | "Envies" | "Terminés";

const TABS: Tab[] = ["Etagères", "Journal", "Stats"];
const SECTIONS: Category[] = ["En cours", "Empruntés", "Envies", "Terminés"];

interface Book {
  image: string;
  title: string;
  author: string;
  synopsis: string;
  category: Category;
}

// Placeholder data, needs to be replaced with API call later
const BOOKS: Book[] = [
  {
    image: cover,
    title: "Titre 1",
    author: "Auteur 1",
    synopsis: "Dans un monde où les livres ont disparu, Elena part à la recherche du dernier exemplaire encore existant.",
    category: "En cours"
  },
  {
    image: cover,
    title: "Titre 2",
    author: "Auteur 2",
    synopsis: "Un voyage initiatique à travers les continents à la découverte de soi et des autres.",
    category: "En cours"
  },
  {
    image: cover,
    title: "Titre 3",
    author: "Auteur 3",
    synopsis: "Une histoire de trahison et de résilience dans un Paris du XIXe siècle.",
    category: "En cours"
  },
  {
    image: cover,
    title: "Titre 4",
    author: "Auteur 4",
    synopsis: "La saga d'une famille à travers trois générations de guerres et de paix.",
    category: "En cours"
  },
  {
    image: cover,
    title: "Titre 5",
    author: "Auteur 5",
    synopsis: "Un roman graphique qui redéfinit les frontières entre réalité et fiction.",
    category: "Empruntés"
  },
  {
    image: cover,
    title: "Titre 6",
    author: "Auteur 6",
    synopsis: "L'histoire vraie d'un alpiniste qui a bravé l'Everest sans oxygène.",
    category: "Empruntés"
  },
  {
    image: cover,
    title: "Titre 7",
    author: "Auteur 7",
    synopsis: "Une enquête policière dans les ruelles sombres de Lyon.",
    category: "Empruntés"
  },
  {
    image: cover,
    title: "Titre 8",
    author: "Auteur 8",
    synopsis: "Un conte philosophique sur le sens de la vie et de l'amour.",
    category: "Envies"
  },
  {
    image: cover,
    title: "Titre 9",
    author: "Auteur 9",
    synopsis: "Le récit d'une révolution artistique à Montmartre au début du XXe siècle.",
    category: "Envies"
  },
  {
    image: cover,
    title: "Titre 10",
    author: "Auteur 10",
    synopsis: "Une dystopie où la mémoire collective est contrôlée par l'État.",
    category: "Envies"
  },
  {
    image: cover,
    title: "Titre 11",
    author: "Auteur 11",
    synopsis: "Le portrait d'une génération perdue entre deux guerres.",
    category: "Terminés"
  },
];

function BookSection({category}: { category: Category }) {
  const books = BOOKS.filter((b) => b.category === category);
  if (books.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-xl font-bold">{category}</h2>
        <Link to="" className="flex items-center gap-0.5 text-sm text-text/60">
          Voir plus <ChevronRight size={16}/>
        </Link>
      </div>
      <div
        className="flex gap-3 overflow-x-auto px-4 pb-1"
        style={{scrollbarWidth: "none"}}
      >
        {books.map((book) => (
          <img
            key={book.title}
            src={book.image}
            alt={book.title}
            className="shrink-0 w-24 h-36 object-cover rounded-lg"
          />
        ))}
      </div>
    </section>
  );
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Etagères");
  const [search, setSearch] = useState("");

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
        {activeTab === "Etagères" &&
          SECTIONS.map((category) => (
            <BookSection key={category} category={category}/>
          ))}
      </div>

      <button
        className="fixed bottom-20 right-4 bg-primary text-background px-5 py-3 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
        <Plus size={16}/>
        Nouvelle étagère
      </button>
    </div>
  );
}
