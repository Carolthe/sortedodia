import { Link } from "react-router-dom";

export default function CardCotacao({
  titulo,
  valor,
  onJogar,
}) {
  return (
    <div className="flex justify-center mx-[20px]">
    <div className="w-[320px] rounded-[24px] border border-slate-200 bg-white py-[15px]">
      <div className="flex flex-col items-center">
        <h3 className="text-[28px] font-normal text-[#002d7a]">
          {titulo}
        </h3>

        <p className="mt-1 text-[20px] font-bold text-[#002d7a]">
          {valor}
        </p>

    
<Link to="/jogo">
        <button
          onClick={onJogar}
          className="
            mt-[15px]
            h-12
            w-[140px]
            rounded-[18px]
            border
            border-[#5b74b9]
            bg-white
            text-lg
            font-semibold
            text-[#002d7a]
            transition-all
            hover:bg-slate-50
          "
        >
          Jogar
        </button>
        </Link>
      </div>
    </div>
    </div>
  );
}