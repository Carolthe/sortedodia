import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export default function CardData() {
  return (
    <div className="flex mt-[15px] justify-center items-center gap-2">
      {/* Botão Anterior */}
      <button
        className="
          flex h-8 w-8 items-center justify-center
          rounded-full border border-slate-300
          bg-white text-slate-600
          transition hover:bg-slate-50
        "
      >
        <ChevronLeft size={16} />
      </button>

      {/* Data */}
      <div className=" flex h-11 min-w-[260px] items-center gap-2
          rounded-2xl border border-slate-300
          bg-white px-4" >
        <CalendarDays
          size={16}
          className="text-slate-500"
          strokeWidth={1.8}
        />

        <span className="text-[15px] font-medium text-slate-800">
          {/* sexta, 29 de mai. de 2026 */}
          2026
        </span>
      </div>

      {/* Botão Próximo */}
      <button
        className="
          flex h-8 w-8 items-center justify-center
          rounded-full border border-slate-300
          bg-white text-slate-600
          transition hover:bg-slate-50
        "
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}