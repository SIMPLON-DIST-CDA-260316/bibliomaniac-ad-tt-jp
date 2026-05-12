import BookCard from "./BookCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { mockBooks } from "../../books/data/mockBooks";
import type { Book } from "../../books/data/mockBooks";

interface BookListProps {
    title: string
    isLink?: boolean
    page?: number
    booksPerPage?: number
    filterChoice?: string
}

export default function BookList({ title, isLink = true, page = 1, booksPerPage = 20, filterChoice }: BookListProps) {

    const filteredBooks = mockBooks.filter((book) =>
        book.categories.includes(title))

    // Pour filter par date : new Date transforme les string en date, puis getTime transforme les dates en nombre
    const sortedBooks = [...filteredBooks].sort((a: Book, b: Book) => {
        if (filterChoice === "date-desc") {
            return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        }
        if (filterChoice === "date-asc") {
            return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        }
        if (filterChoice === "rating-desc") {
            return b.averageRating - a.averageRating;
        }
        if (filterChoice === "rating-asc") {
            return a.averageRating - b.averageRating;
        }
        // aucun filtre choisi, .sort() attend un chiffre en retour si aucun tri
        return 0;
        
    })

    // Pagination avec les livres une fois triés
    const start = (page - 1) * booksPerPage
    const books = sortedBooks.slice(start, start + booksPerPage).map((book) => (
        <li key={book.title}>
            <BookCard
                id={book.id}
                thumbnail={book.thumbnail}
                title={book.title}
                authors={book.authors}
                description={book.description}
            />
        </li>
    ))

    return (
        <div className="pt-8 pb-14">
            {isLink ? (
                <Link to={`/category/${title}`} className="flex justify-between content-center pb-4">
                    <h1 className="font-semibold md:text-2xl">{title}</h1>
                    <div className="flex">
                        <p className=" font-bold italic text-xs content-center mr-1">Voir plus</p>
                        <ChevronRight />
                    </div>
                </Link>
            ) : (
                <h1 className="font-semibold pb-4 text-xl md:text-3xl md:pb-12 md:text-center">{title}</h1>
            )}
            <div className="mt-2">
                <ul className="flex flex-col gap-1.5 md:grid md:grid-cols-4 md:gap-4">
                    {books}
                </ul>
            </div>
        </div>
    )
}