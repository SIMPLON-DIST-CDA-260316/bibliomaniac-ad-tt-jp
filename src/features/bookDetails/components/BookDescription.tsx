import { Languages, Layers, Palette } from "lucide-react";

type BookDescriptionProps = {
  title: string;
  authors: string[];
  publishedDate: string;
  pageCount: number;
  categories: string[];
  language: string;
  description: string;
};

export default function BookDescription({
  title,
  authors,
  publishedDate,
  pageCount,
  categories,
  language,
  description,
}: BookDescriptionProps) {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <h2 className="text-xl">
        Par {authors} - {publishedDate}
      </h2>
      <p className="pt-6">Synopsis : {description}</p>
      <ul className="flex justify-center gap-1 pt-6">
        <li className="h-20 w-28 flex flex-col items-center justify-center bg-accent rounded-lg font-semibold text-xl">
          <Layers />
          {pageCount}
        </li>
        <li className="h-20 w-28 flex flex-col items-center justify-center bg-accent rounded-lg font-semibold text-xl">
          <Palette />
          {categories[0]}
        </li>
        <li className="h-20 w-28 flex flex-col items-center justify-center bg-accent rounded-lg font-semibold text-xl">
          <Languages />
          {language.toUpperCase()}
        </li>
      </ul>
    </section>
  );
}
