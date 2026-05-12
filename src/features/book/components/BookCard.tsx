import { Link } from "react-router";

interface BookCardProps {
  id: string
  thumbnail: string
  title: string
  authors: string
  description: string
}

export default function BookCard({ id, thumbnail, title, authors, description }: BookCardProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <Link
        to={`/books/${id}`}
        className="grid grid-cols-2 p-2 border border-primary rounded-xl gap-4 w-full h-36 md:h-92 md:w-full md:grid-cols-1 md:hover:scale-105 md:transition-transform md:duration-100"
      >
        <div>
          {thumbnail ? (
            <img src={thumbnail} alt="couverture du livre" className="rounded-xl w-full h-32 object-cover md:h-48" />
          ) : (
            <div className="rounded-xl w-full h-32 bg-primary/20 flex items-center justify-center text-xs text-foreground/40 text-center px-1">
              Couverture indisponible
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold line-clamp-2">{title || "Titre inconnu"}</h2>
          <h3 className="text-xs italic">{authors || "Auteur inconnu"}</h3>
          <p
            className="text-xs line-clamp-3 overflow-hidden italic text-foreground/60"
            dangerouslySetInnerHTML={{ __html: description || "Description non disponible." }}
          />
        </div>
      </Link>
    </div>
  );
}