import { Languages, Layers, Palette } from "lucide-react";
import { formatPublishedDate } from "../../../entities/book/lib/formatDate";

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
    <section className="p-6 md:flex md:flex-col md:justify-center md:gap-2">
      <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
      <h2 className="text-xl md:text-base md:text-foreground/70">
        Par {authors.join(", ")}{publishedDate ? ` - ${formatPublishedDate(publishedDate)}` : ""}
      </h2>
      <p
        className="pt-6 md:pt-2 md:text-sm md:leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: description
            ? `Synopsis : ${description}`
            : "Description non disponible.",
        }}
      />
      <ul className="flex justify-center gap-1 pt-6 md:justify-start md:pt-4">
        <li className="h-20 w-28 flex flex-col items-center gap-1 justify-center bg-accent rounded-lg font-semibold text-xl/5 text-center">
          <Layers />
          {pageCount > 0 ? pageCount : "—"}
        </li>
        <li
          title={categories.length > 0 ? categories.join(", ") : undefined}
          className="h-20 w-28 flex flex-col items-center gap-1 justify-center bg-accent rounded-lg font-semibold text-center text-sm/4 overflow-hidden px-1"
        >
          <Palette className="shrink-0" />
          <span className="line-clamp-2">{categories[0] ?? "—"}</span>
        </li>
        <li className="h-20 w-28 flex flex-col items-center gap-1 justify-center bg-accent rounded-lg font-semibold text-xl/5 text-center">
          <Languages />
          {language ? language.toUpperCase() : "—"}
        </li>
      </ul>
    </section>
  );
}
