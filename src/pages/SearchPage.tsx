import { useCallback } from "react";
import Searchbar from "../shared/ui/Searchbar";
import IconButton from "../shared/ui/IconButton";
import { useNavigate, useSearchParams } from "react-router";
import { CircleArrowLeft } from "lucide-react";
import BookList from "../features/book/components/BookList";

export default function SearchPage() {

    // récupérer le mot dans la barre de recherche pour l'afficher dans le title de BookList
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";

    const navigate = useNavigate();
    const handleSearch = useCallback((query: string) => {
        if (query) navigate(`/search?q=${query}`)
    }, [navigate])

    return (
        <div className="px-3 py-4 md:p-10">
            <IconButton icon={CircleArrowLeft} onClick={() => navigate("/")} className="cursor-pointer text-primary bg-transparent" />
            <Searchbar onSearch={handleSearch} className="mx-6 mt-2" />
            <BookList title={query} isLink={false} />
        </div>
    )
}