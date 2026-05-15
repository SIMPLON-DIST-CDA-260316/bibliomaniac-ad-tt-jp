import { useCallback } from "react";
import Searchbar from "../shared/ui/Searchbar";
import IconButton from "../shared/ui/IconButton";
import { useNavigate, useSearchParams } from "react-router";
import { CircleArrowLeft } from "lucide-react";
import BookList from "../features/book/components/BookList";
import SortSelect from "../shared/ui/SortSelect";
import { useState } from "react";
import Pagination from "../shared/ui/Pagination";
import { useBooks } from "../features/book/hooks/useBooks";
import ScrollToTopButton from "../shared/ui/ScrollToTopButton";

export default function SearchPage() {

    // récupérer le mot dans la barre de recherche pour l'afficher dans le title de BookList
    const [searchParams] = useSearchParams();
    const [filterChoice, setFilterChoice] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const query = searchParams.get("q") ?? "";

    const booksPerPage = 20;
    const { books, isPending, error, totalResults } = useBooks(query, currentPage, booksPerPage);
    const totalPages = Math.ceil(totalResults / booksPerPage);

    const navigate = useNavigate();
    const handleSearch = useCallback((query: string) => {
        if (query) navigate(`/search?q=${query}`)
    }, [navigate])

    return (
        <div className="px-3 py-4 md:p-10">
            <div className="flex justify-between mb-2">
                <IconButton icon={CircleArrowLeft} onClick={() => navigate(-1)} className="cursor-pointer text-primary bg-transparent" />
                {/* '?? '' ' si jamais category est undefined */}
                <SortSelect filterChoice={filterChoice} setFilterChoice={setFilterChoice} />
            </div>
            <p className="text-center my-0.5">Entrez un mot, un titre, un auteur...</p>
            <Searchbar onSearch={handleSearch} className="mx-6 mt-2" />
            <BookList title={query} isLink={false} books={books} isPending={isPending} error={error} filterChoice={filterChoice} />
            <ScrollToTopButton />
            {query && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}