import BookCard from "./BookCard";
import cover from "../../../assets/cover_test.jpg";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface BookListProps {
    title: string
    isLink?: boolean
    page?: number
    booksPerPage?: number
}

export default function BookList({ title, isLink = true, page = 1, booksPerPage = 10 }: BookListProps) {

    const bookTab = [
        {
            id: 1,
            image: cover,
            title: "Titre",
            author: "Auteur",
            synopsis: "Dans un monde où les livres ont disparu, Elena part à la recherche du dernier exemplaire encore existant."
        },
        {
            id: 2,
            image: cover,
            title: "Titre 2",
            author: "Auteur 2",
            synopsis: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        },
        {
            id: 3,
            image: cover,
            title: "Titre 3",
            author: "Auteur 3",
            synopsis: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        },
        {
            id: 4,
            image: cover,
            title: "Titre 4",
            author: "Auteur 4",
            synopsis: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        }
    ]

    const start = (page - 1) * booksPerPage

    const books = bookTab.slice(start, start + booksPerPage).map((book) => (
        <li key={book.title}>
            <BookCard
                id={book.id}
                image={book.image}
                title={book.title}
                author={book.author}
                synopsis={book.synopsis}
            />
        </li>
    ))

    return (
        <div className="pt-8 pb-14">
            {isLink ? (
                <Link to={`/books/${title}`} className="flex justify-between pb-4 md:justify-start">
                    <h1 className="font-semibold">{title}</h1>
                    <ChevronRight />
                </Link>
            ) : (
                <h1 className="font-semibold pb-4 text-xl md:text-3xl md:pb-12 md:text-center">{title}</h1>
            )}
            <div className="mt-2">
                <ul className="flex flex-col gap-1.5 md:grid md:grid-cols-4 md:gap-1">
                    {books}
                </ul>
            </div>
        </div>
    )
}