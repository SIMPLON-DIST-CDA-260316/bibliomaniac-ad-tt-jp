import BookList from "../features/book/components/BookList";
import { useParams } from "react-router";
import BackItem from "../shared/ui/BackItem";
import { useState } from "react";

export default function BookListPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const booksPerPage = 10;
    const { category } = useParams();
    return (
        <div className="px-3 py-4 md:p-10">
            <BackItem />
            {/* '?? '' ' si jamais category est undefined */}
            <BookList title={category ?? ''} isLink = {false}/>
        </div>
    )
}
