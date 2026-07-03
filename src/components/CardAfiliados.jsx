import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";

export default function CardAfiliados() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center text-center gap-4 rounded-3xl bg-gradient-to-br from-[#062272] to-[#0A1F44] px-6 py-9 sm:px-10 sm:py-10 text-white shadow-xl">

      {/* Decoração de fundo */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FFB800]/10 rounded-full blur-2xl" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FFB800]/5 rounded-full blur-3xl" />

      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFB800] shadow-lg ring-4 ring-white/10">
        <DollarSign className="text-[#03227A]" size={26} strokeWidth={3} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md">

        <h2 className="text-xl sm:text-2xl font-bold leading-tight">
          Ganhe com o Ponto do Bicho
        </h2>

        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/80">
          Afilie-se gratuitamente e receba comissão sobre todas as apostas dos seus indicados.
        </p>

        <Link to="/afiliado">
          <button className="mt-5 rounded-xl bg-[#FFB800] px-8 py-3 text-sm sm:text-base font-semibold text-[#03227A] shadow-md transition hover:brightness-95 active:scale-95">
            Quero ser afiliado
          </button>
        </Link>

      </div>

    </div>
  )
}