import { Dice5, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlayButton() {
  return (
    <Link to="/jogo" >
    <div className="flex justify-center mt-[15px]" >
   
    <button
      className="
        group
        flex items-center justify-between
        w-[80%] 
        rounded-2xl
        bg-gradient-to-b from-[#FFD84D] to-[#F8BE00]
        px-6 py-[10px]
        shadow-[0_4px_0_#D89C00,0_8px_20px_rgba(248,190,0,.35)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_6px_0_#D89C00,0_12px_28px_rgba(248,190,0,.45)]
        active:translate-y-1
        active:shadow-[0_2px_0_#D89C00]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-xl
            bg-[#143A8B]
            shadow-inner
          "
        >
          <Dice5 className="h-5 w-5 text-white" />
        </div>

        <span className="text-[22px] font-extrabold text-[#0B2D74]">
          Jogar Agora
        </span>
      </div>

      <ArrowRight
        className="
          h-7 w-7
          text-[#0B2D74]
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />
    </button>
   
    </div> 
    </Link>
  );
}