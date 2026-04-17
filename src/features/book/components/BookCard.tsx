interface BookCardProps {
  image: string
  title: string
  author: string
  synopsis: string
}

export default function BookCard({ image, title, author, synopsis }: BookCardProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <a href="" className="grid grid-cols-2 mx-2 p-2 border border-primary rounded-xl gap-4 w-[95%]">
        <div>
          <img src={image} alt="couverture du livre" className="rounded-xl w-full h-32 object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold">{title}</h2>
          <h3 className="text-xs italic">{author}</h3>
          <p className="text-xs line-clamp-3 overflow-hidden">{synopsis}</p>
        </div>
      </a>
    </div>
  );
}
