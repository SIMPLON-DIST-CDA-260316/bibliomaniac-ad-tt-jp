import { Link } from "react-router";

interface BookCardProps {
  id: number
  image: string
  title: string
  author: string
  synopsis: string
}

export default function BookCard({
  image,
  title,
  author,
  synopsis,
}: BookCardProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <Link to="{`/books/${id}`}" className="grid grid-cols-2 p-2 border border-primary rounded-xl gap-4 w-full h-36 md:w-64 md:h-90 md:grid-cols-1 md:hover:scale-105 md:transition-transform md:duration-100">
        <div>
          <img src={image} alt="couverture du livre" className="rounded-xl w-full h-32 object-cover md:h-48" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold md:text-center">{title}</h2>
          <h3 className="text-xs italic md:text-center">{author}</h3>
          <p className="text-xs line-clamp-3 overflow-hidden">{synopsis}</p>
        </div>
      </Link>
    </div>
  );
}
