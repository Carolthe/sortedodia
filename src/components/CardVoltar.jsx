import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CardVoltar({
    title = "Título",
    to = "/",
}) {
    return (
        <div className="relative flex items-center justify-center w-full h-14 bg-[#b9c1ed] shadow-md">
            <Link
                to={to}
                className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition"
            >
                <ArrowLeft size={24} />
            </Link>

            <p className="text-[17px] font-semibold">
                {title}
            </p>
        </div>
    );
}