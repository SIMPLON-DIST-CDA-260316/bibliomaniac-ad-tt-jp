import BookList from "../features/book/components/BookList";
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, CircleArrowLeft } from "lucide-react";
import IconButton from "../shared/ui/IconButton";
import SortSelect from "../shared/ui/SortSelect";

export default function BookListPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterChoice, setFilterChoice] = useState<string>('');

    const booksPerPage = 20;

    const { category } = useParams();

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
                page={currentPage}
                booksPerPage={booksPerPage}
                filterChoice={filterChoice}
            />
            <div className="flex justify-center gap-4 md:pb-8">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer text-primary"}>
                    <ChevronLeft />
                </button>
                <span className=" text-primary font-bold text-xl">{currentPage}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage * booksPerPage >= 40}
                    className={currentPage * booksPerPage >= 40 ? "cursor-not-allowed" : "cursor-pointer text-primary"}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}
