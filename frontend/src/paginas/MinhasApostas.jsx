import { Clock, Calendar, Ticket } from "lucide-react";
import Header from "../components/Header";

export default function MinhasApostas() {
  const apostas = [
    {
      id: 1,
      data: "08/07/2026",
      hora: "14:25",
      jogo: "Milhar",
      extracao: "PT Rio 14h",
      numeros: ["5684", "9657", "2135"],
      valor: "R$ 20,00",
      status: "Aguardando",
    },
    {
      id: 2,
      data: "08/07/2026",
      hora: "10:12",
      jogo: "Centena",
      extracao: "PT Rio 11h",
      numeros: ["357", "842"],
      valor: "R$ 15,00",
      status: "Finalizada",
    },
    {
      id: 3,
      data: "07/07/2026",
      hora: "18:50",
      jogo: "Grupo",
      extracao: "São Paulo 19h",
      numeros: ["18", "22", "11"],
      valor: "R$ 30,00",
      status: "Premiada",
    },
  ];

  const statusColor = {
    Aguardando: "bg-yellow-100 text-yellow-700",
    Finalizada: "bg-slate-100 text-slate-700",
    Premiada: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      <Header />
      <div className="mx-auto max-w-md p-4">
        <h1 className="mb-5 text-2xl font-bold text-[#062272]">
          Minhas Apostas
        </h1>

        <div className="space-y-4">
          {apostas.map((aposta) => (
            <div
              key={aposta.id}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              {/* Cabeçalho */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket size={18} className="text-[#062272]" />
                  <span className="font-semibold text-slate-800">
                    {aposta.jogo}
                  </span>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[aposta.status]}`}
                >
                  {aposta.status}
                </span>
              </div>

              {/* Data */}
              <div className="mt-4 flex items-center gap-5 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar size={15} />
                  {aposta.data}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={15} />
                  {aposta.hora}
                </div>
              </div>

              {/* Extração */}
              <div className="mt-3">
                <span className="text-sm text-slate-500">
                  Extração
                </span>

                <p className="font-medium text-slate-700">
                  {aposta.extracao}
                </p>
              </div>

              {/* Números */}
              <div className="mt-4">
                <p className="mb-2 text-sm text-slate-500">
                  Números apostados
                </p>

                <div className="flex flex-wrap gap-2">
                  {aposta.numeros.map((numero, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-[#062272] px-4 py-2 text-sm font-semibold text-white"
                    >
                      {numero}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rodapé */}
              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <span className="text-sm text-slate-500">
                  Valor Apostado
                </span>

                <span className="font-bold text-green-600">
                  {aposta.valor}
                </span>
              </div>
            </div>
          ))}
        </div>

        {apostas.length === 0 && (
          <div className="mt-20 text-center">
            <Ticket
              size={55}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 text-slate-500">
              Você ainda não realizou nenhuma aposta.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}