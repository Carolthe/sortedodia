import { PawPrint, ChevronRight } from "lucide-react";

export default function CardJogoDoBicho() {
  return (
    <button
      className="
        relative
        w-[130px]
        h-[170px]
        overflow-hidden
        rounded-2xl
        bg-yellow-400
        border border-yellow-300
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        group
      "
    >
      {/* Brilho */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/25 backdrop-blur-sm">
            <PawPrint className="h-6 w-6 text-gray-900" />
          </div>

          <ChevronRight className="h-5 w-5 text-gray-900/50 transition-transform duration-300 group-hover:translate-x-1" />
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-800/70">
            Categoria
          </span>

          <h2 className="mt-1 text-base font-bold leading-tight text-gray-900">
            Jogo do Bicho
          </h2>

          <p className="mt-1 text-[11px] text-gray-800/80">
            Consulte resultados
          </p>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#264bbd] via-[#2b51c3] to-[#2e55ca]" />
    </button>
  );
}