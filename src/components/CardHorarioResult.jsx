export default function CardHorarioResult() {
  return (
    <div className="flex justify-center">
    <div className="w-[340px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Cabeçalho */}
      <div className="bg-gray-200 py-5 text-center">
        <h2 className="text-[18px] font-bold text-gray-900">
          31/05/2026 - PTV-RIO 16h20
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="py-[10px] text-center">
        <div className="mb-3 flex items-center justify-center gap-4">
          <span className="text-[30px] font-bold text-blue-900">01</span>
          <span className="text-[30px] font-bold text-blue-900">:</span>
          <span className="text-[30px] font-bold text-blue-900">20</span>
          <span className="text-[30px] font-bold text-blue-900">:</span>
          <span className="text-[30px] font-bold text-blue-900">00</span>
        </div>

        <div className="mb-[10px] flex justify-center gap-14 text-sm font-medium uppercase tracking-wide text-gray-500">
          <span>Horas</span>
          <span>Min</span>
          <span>Seg</span>
        </div>

        <p className="text-[18px] font-medium text-gray-900">
          Resultado será publicado em breve
        </p>
      </div>
    </div>
    </div>
  );
}