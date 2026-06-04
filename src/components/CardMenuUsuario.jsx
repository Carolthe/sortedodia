import {
  LogOut,
  Gift,
  Star,
  RefreshCw,
  Zap,
  Wallet,
} from "lucide-react";

export default function CardMenuUsuario() {
  return (
    <div className="w-full max-w-sm rounded-3xl border-2 border-slate-400 bg-[#07277D] p-4 text-white shadow-xl">
      {/* Cabeçalho */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold">
          Caroline Tenorio de Oliveira
        </h2>

        <button className="flex items-center gap-1 text-sm font-medium">
          <LogOut size={18} />
          Sair
        </button>
      </div>

      {/* Fidelidade */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex gap-3">
          <Gift
            size={26}
            className="mt-1 text-white"
          />

          <div>
            <p className="font-semibold">
              Bônus de fidelidade
            </p>

            <button className="font-semibold text-[#FFB000]">
              Saiba mais
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            0 / 5
          </span>

          <Star
            size={20}
            className="fill-white text-white"
          />
        </div>
      </div>

      {/* Saldos */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[18px]">Saldo:</span>

          <div className="flex items-center gap-2">
            <RefreshCw
              size={18}
              className="text-[#FFB000]"
            />

            <span className="text-[20px] font-bold">
              R$ 0,00
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[18px]">Bônus:</span>

          <span className="text-[20px] font-bold">
            R$ 0,00
          </span>
        </div>
      </div>

      {/* Minhas apostas */}
      <button className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl py-3 text-[18px] font-bold text-[#FFB000] transition hover:bg-white/5">
        <Zap
          size={22}
          className="fill-[#FFB000]"
        />
        Minhas apostas
      </button>

      {/* Carteira */}
      <button className="mb-4 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#FFB000] font-bold text-[#FFB000] transition hover:bg-[#FFB000]/10">
        <Wallet size={18} />
        Carteira
      </button>

      {/* Depositar */}
      <button className="h-14 w-full rounded-2xl bg-[#FFB000] text-[18px] font-bold text-[#07277D] transition hover:brightness-95">
        Depositar
      </button>
    </div>
  );
}