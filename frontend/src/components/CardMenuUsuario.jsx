import {
  LogOut,
  // Gift,
  // Star,
  RefreshCw,
  Zap,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUsuario } from "../context/useUsuario";

export default function CardMenuUsuario({ fecharMenu }) {

  const { usuario } = useUsuario();

  const navigate = useNavigate();

  function logout() {

    fecharMenu();

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  }
  return (
    <div className="w-full rounded-2xl  p-5 text-white">
      {/* Cabeçalho */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-sm text-white/60">
            Bem-vindo(a)
          </span>

          <h2 className="mt-1 text-[17px] font-semibold leading-tight">
            {usuario?.nome}
          </h2>
        </div>

        <button onClick={logout} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/10">
          <LogOut size={18} />
          Sair
        </button>
      </div>

      {/* Fidelidade */}
      {/* <div className="mb-6 flex items-start justify-between rounded-2xl bg-white/5 p-4">
        <div className="flex gap-3">
          <Gift
            size={26}
            className="mt-1 text-white"
          /> */}

      {/* <div>
            <p className="font-semibold">
              Bônus de fidelidade
            </p>

            <p className="text-sm text-white/60">
              Ganhe bônus em cada recarga
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            10%
          </span>

          <Star
            size={20}
            className="fill-yellow-400 text-yellow-400"
          />
        </div> */}
      {/* </div> */}

      {/* Saldos */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
          <span className="text-[17px]">
            Saldo
          </span>

          <div className="flex items-center gap-2">
            <RefreshCw
              size={18}
              className="text-yellow-400"
            />

            <span className="text-[20px] font-bold">

              {usuario?.saldo
                ? usuario.saldo.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL"
                  }
                )
                : "R$ 0,00"
              }

            </span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
          <span className="text-[17px]">
            Bônus
          </span>

          <span className="text-[20px] font-bold">
            R$ 0,00
          </span>
        </div>
      </div>

      {/* Minhas apostas */}
      <Link to="/minhasapostas">
        <button className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl  text-[18px] font-bold text-[#FFB000] transition hover:bg-white/10">
          <Zap
            size={22}
            className="fill-[#FFB000]"
          />

          Minhas apostas
        </button>
      </Link>

      {/* Carteira */}
      <Link to="/carteira">
        <button className="mb-4 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#FFB000] font-bold text-[#FFB000] transition hover:bg-[#FFB000]/10">
          <Wallet size={20} />

          Carteira
        </button>
      </Link>

      {/* Depositar */}
      <Link to="/pix">
        <button className="h-14 w-full rounded-2xl bg-[#FFB000] text-[18px] font-bold text-[#07277D] transition hover:brightness-95">
          Recarregar
        </button>
      </Link>
    </div>
  );
}