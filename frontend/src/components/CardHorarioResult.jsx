export default function CardHorarioResult({ resultado }) {

  const data = new Date(resultado.data);

  const dataFormatada = data.toLocaleDateString("pt-BR");

  const [hora, minuto] = resultado.hora.split(":");

  return (
    <div className="flex justify-center">
      <div className="w-[340px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

        <div className="bg-gray-200 py-5 text-center">
          <h2 className="text-[18px] font-bold text-gray-900">
            {dataFormatada} - {resultado.local}
          </h2>
        </div>

        <div className="py-[10px] text-center">

          <div className="mb-3 flex items-center justify-center gap-4">
            <span className="text-[30px] font-bold text-blue-900">
              {hora}
            </span>

            <span className="text-[30px] font-bold text-blue-900">
              :
            </span>

            <span className="text-[30px] font-bold text-blue-900">
              {minuto}
            </span>
          </div>

          <div className="mb-[10px] flex justify-center gap-10 text-sm font-medium uppercase tracking-wide text-gray-500">
            <span>Hora</span>
            <span>Min</span>
          </div>

          <p className="text-[18px] font-medium text-gray-900">
            {resultado.descricao}
          </p>

        </div>
      </div>
    </div>
  );
}