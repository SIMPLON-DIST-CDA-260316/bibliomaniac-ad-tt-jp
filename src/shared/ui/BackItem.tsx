import { useNavigate } from "react-router";
import { CircleArrowLeft } from "lucide-react";

export default function BackItem() {
    let navigate = useNavigate();
    return (
        <div>
            <CircleArrowLeft onClick={() => navigate(-1)} className="cursor-pointer text-primary" size={34} />
        </div>
    )
}