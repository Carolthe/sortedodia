import CardHorarioResult from "../components/CardHorarioResult";
import CardVoltar from "../components/CardVoltar";
import Header from "../components/Header";
import {Link} from "react-router-dom"

export default function ProximosResultados() {
    return (
        <div >
            <Header />
            <CardVoltar title="Próximos Resultados" to="/" />
            <div className="mt-[20px]">
                <CardHorarioResult />
            </div>
            <div className="flex justify-center mt-[20px]">
                <Link to="/jogo">
                    <button
                        className="
        bg-amber-500
        hover:bg-amber-600
        text-blue-900
        font-bold
        text-[18px]
        px-[20px]
        py-[12px]
        rounded-3xl
        transition-all
        duration-300
        shadow-sm
      "
                    >
                        Jogar agora
                    </button>
                </Link>
            </div>

        </div>
    )
}