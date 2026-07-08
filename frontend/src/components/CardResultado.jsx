import { Printer, MessageCircle } from "lucide-react";

export default function CardResultado() {
  const resultados = [
    { premio: "1°", milhar: "2651", grupo: "13", animal: "Galo" },
    { premio: "2°", milhar: "6109", grupo: "03", animal: "Burro" },
    { premio: "3°", milhar: "1543", grupo: "11", animal: "Cavalo" },
    { premio: "4°", milhar: "2692", grupo: "23", animal: "Urso" },
    { premio: "5°", milhar: "1944", grupo: "11", animal: "Cavalo" },
    { premio: "6°", milhar: "4939", grupo: "10", animal: "Coelho" },
    { premio: "7°", milhar: "0194", grupo: "24", animal: "Veado" },
  ];

  return (
    <div className="w-full max-w-md mb-[15px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-200 px-4 py-3">
        <h2 className="text-lg font-bold text-slate-900">
          29/05/2026 - PT-SP 8h
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

      {/* Tabela */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-[#f8f8fe]">
            <th className="px-4 py-3 text-left font-semibold">Prêmio</th>
            <th className="px-4 py-3 text-left font-semibold">Milhar</th>
            <th className="px-4 py-3 text-left font-semibold">Grupo</th>
            <th className="px-4 py-3 text-left font-semibold">Animal</th>
          </tr>
        </thead>

        <tbody>
          {resultados.map((item, index) => (
            <tr
              key={index}
              className="border-b last:border-b-0 hover:bg-slate-50"
            >
              <td className="px-4 py-[2px]">{item.premio}</td>
              <td className="px-4 ">{item.milhar}</td>
              <td className="px-4 ">{item.grupo}</td>
              <td className="px-4 ">{item.animal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}