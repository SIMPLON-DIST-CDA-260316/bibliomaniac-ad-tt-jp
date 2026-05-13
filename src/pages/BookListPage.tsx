import BookList from "../features/book/components/BookList";
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CircleArrowLeft } from "lucide-react";
import IconButton from "../shared/ui/IconButton";
import SortSelect from "../shared/ui/SortSelect";
import { useBooks } from "../features/book/hooks/useBooks";
import Pagination from "../shared/ui/Pagination";

export default function BookListPage() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterChoice, setFilterChoice] = useState<string>('');
    const booksPerPage = 20;
    const { books, isPending, error, totalResults } = useBooks(category ?? '', currentPage, booksPerPage);
    const totalPages = Math.ceil(totalResults / booksPerPage);

    return (
        <div className="px-3 py-4 md:p-10">
            <div className="flex justify-between">
                <IconButton icon={CircleArrowLeft} onClick={() => navigate(-1)} className="cursor-pointer text-primary bg-transparent" />
                {/* '?? '' ' si jamais category est undefined */}
                <SortSelect filterChoice={filterChoice} setFilterChoice={setFilterChoice} />
            </div>
            <BookList
                title={category ?? ''}
                isLink={false}
                books={books}
                isPending={isPending}
                error={error}
                filterChoice={filterChoice}
            />
            <div className="flex justify-center gap-4 md:pb-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}
