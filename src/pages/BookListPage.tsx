import BookList from "../features/book/components/BookList";
import { useParams } from "react-router";
import BackItem from "../shared/ui/BackItem";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockBooks } from "../features/books/data/mockBooks";

export default function BookListPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterChoice, setFilterChoice] = useState<string>('');

    const booksPerPage = 20;

    const { category } = useParams();

    const totalBooks = mockBooks.filter((book) =>
        book.categories.includes(category ?? '')
    ).length

    // Math.ceil() arrondit à l'entier supérieur
    const totalPages = Math.ceil(totalBooks / booksPerPage)

    return (
        <div className="px-3 py-4 md:p-10">
            <div className="flex justify-between">
                <BackItem />
                {/* '?? '' ' si jamais category est undefined */}
                <select value={filterChoice} onChange={(e) => setFilterChoice(e.target.value)} className="w-24">
                    <option value="">Trier par...</option>
                    <option value="date-desc">Du + récent au - récent</option>
                    <option value="date-asc">Du - récent au + récent</option>
                    <option value="rating-desc">Du mieux noté au moins noté</option>
                    <option value="rating-asc">Du moins noté au mieux noté</option>
                </select>
            </div>
            <BookList
                title={category ?? ''}
                isLink={false}
                page={currentPage}
                booksPerPage={booksPerPage}
                filterChoice={filterChoice}
            />
            <div className="flex justify-center gap-4 pb-12 md:pb-8">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer text-primary"}>
                    <ChevronLeft />
                </button>
                <span className=" text-primary font-bold text-xl">{currentPage}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer text-primary"}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}
