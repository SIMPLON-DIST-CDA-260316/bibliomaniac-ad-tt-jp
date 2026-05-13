import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number
    totalPages: number
    setCurrentPage: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
    return (
        <div className="flex justify-center gap-4 md:pb-8">
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer text-primary"}>
                <ChevronLeft />
            </button>
            <span className="text-primary font-bold text-xl">{currentPage}</span>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={currentPage >= totalPages ? "cursor-not-allowed" : "cursor-pointer text-primary"}>
                <ChevronRight />
            </button>
        </div>
    )
}