import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useBooks } from "../hooks/useBooks";
import BookCard from "./BookCard";
import type { Book } from "../../../entities/book/model/types";

interface BookListProps {
    title: string
    isLink?: boolean
    page?: number
    booksPerPage?: number
    filterChoice?: string
}

export default function BookList({ title, isLink = true, page = 1, booksPerPage = 20, filterChoice }: BookListProps) {
    const { books, isPending, error } = useBooks(title);
    // Pour les filtres, new Date transforme la string en date et getTime(), la date en nombre pour la comparaison
    const sortedBooks = [...books].sort((a: Book, b: Book) => {
        if (filterChoice === "date-desc")
            return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        if (filterChoice === "date-asc")
            return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        if (filterChoice === "rating-desc")
            return b.averageRating - a.averageRating
        if (filterChoice === "rating-asc")
            return a.averageRating - b.averageRating
        return 0
    })

    const start = (page - 1) * booksPerPage
    const paginatedBooks = sortedBooks.slice(start, start + booksPerPage)

    return (
        <div className="pt-8 pb-14">
            {isLink ? (
                <Link to={`/category/${title}`} className="flex justify-between pb-4">
                    <h1 className="font-semibold">{title}</h1>
                    <ChevronRight />
                </Link>
            ) : (
                <h1 className="font-semibold pb-4 text-xl md:text-3xl md:pb-12 md:text-center">{title}</h1>
            )}
            <div className="mt-2">
                {isPending && <p className="text-center text-sm text-gray-500 py-8">Chargement des livres…</p>}
                {error && <p className="text-center text-sm text-red-500 py-8">Impossible de charger les livres.</p>}
                {!isPending && !error && (
                    <ul className="flex flex-col gap-1.5 md:grid md:grid-cols-4 md:gap-4">
                        {paginatedBooks.map((book) => (
                            <li key={book.id}>
                                <BookCard
                                    id={book.id}
                                    image={book.thumbnail}
                                    title={book.title}
                                    author={book.authors[0]}
                                    synopsis={book.description}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
