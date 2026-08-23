import { Printer, MessageCircle } from "lucide-react";

export default function CardResultado({ resultados }) {
  return (
    <div className="w-full max-w-md mb-[15px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-200 px-4 py-3">
        <h2 className="text-lg font-bold text-slate-900">
          {resultados.length > 0 && (
            <>
              {new Date(resultados[0].data).toLocaleDateString("pt-BR")} -{" "}
              {resultados[0].lugar}{" "}
              {parseInt(resultados[0].hora.substring(0, 2))}h
            </>
          )}
        </h2>

        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#133594] text-[#133594] transition hover:bg-blue-50">
            <Printer size={18} />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#133594] text-[#133594] transition hover:bg-blue-50">
            <MessageCircle size={18} />
          </button>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-[#f8f8fe]">
            <th className="px-4 py-3 text-left font-semibold">Prêmio</th>
            <th className="px-4 py-3 text-left font-semibold">Milhar</th>
            <th className="px-4 py-3 text-left font-semibold">Animal</th>
          </tr>
        </thead>

        <tbody>
          {resultados.map((item) => (
            <tr
              key={item.id_resultado}
              className="border-b last:border-b-0 hover:bg-slate-50"
            >
              <td className="px-4 py-[2px]">{item.premio}</td>
              <td className="px-4">{item.milhar}</td>
              <td className="px-4">{item.animal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}