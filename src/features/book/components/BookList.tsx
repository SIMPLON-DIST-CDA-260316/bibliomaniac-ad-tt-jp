import BookCard from "./BookCard";
import cover from "../../../assets/cover_test.jpg";
import { ChevronRight } from "lucide-react";

export default function BookList() {

    const bookTab = [
        {
            image: cover,
            title: "Titre",
            author: "Auteur",
            synopsis: "Dans un monde où les livres ont disparu, Elena part à la recherche du dernier exemplaire encore existant."
        },
        {
            image: cover,
            title: "Titre 2",
            author: "Auteur 2",
            synopsis: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        },
        {
            image: cover,
            title: "Titre 3",
            author: "Auteur 3",
            synopsis: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
        },
    ]

    const books = bookTab.map((book) => (
        <li key={book.title}>
            <BookCard
                image={book.image}
                title={book.title}
                author={book.author}
                synopsis={book.synopsis}
            />
        </li>
    ))

    return (
        <div>
            <div className="flex justify-between pb-4">
                <h1 className="font-semibold">Livres populaires</h1>
                <a href="">
                    <ChevronRight />
                </a>
            </div>
            <div className="mt-2">
                <ul className="flex flex-col gap-1.5">
                    {books}
                </ul>
            </div>
        </div>
    )
}