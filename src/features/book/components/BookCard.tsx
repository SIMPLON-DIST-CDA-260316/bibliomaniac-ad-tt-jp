import { Link } from "react-router";

interface BookCardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  synopsis: string;
}

export default function BookCard({
  id,
  image,
  title,
  author,
  synopsis,
}: BookCardProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <Link
        to={`/books/${id}`}
        className="grid grid-cols-2 mx-2 p-2 border border-primary rounded-xl gap-4"
      >
        <div>
          {image ? (
            <img
              src={image}
              alt="couverture du livre"
              className="rounded-xl w-full h-32 object-cover"
            />
          ) : (
            <div className="rounded-xl w-full h-32 bg-primary/20 flex items-center justify-center text-xs text-foreground/40 text-center px-1">
              Couverture indisponible
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold">{title || "Titre inconnu"}</h2>
          <h3 className="text-xs italic">{author || "Auteur inconnu"}</h3>
          <p
            className="text-xs line-clamp-3 overflow-hidden italic text-foreground/60"
            dangerouslySetInnerHTML={{
              __html: synopsis || "Description non disponible.",
            }}
          />
        </div>
      </Link>
    </div>
  );
}
