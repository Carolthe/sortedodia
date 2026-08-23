import { Wallet, ArrowUpRight, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar"
import { useUsuario } from "../context/useUsuario";

export default function Carteira() {

  const { usuario } = useUsuario();

  const saldo = Number(usuario?.saldo || 0);
  // Exemplo
  // Depois substitua pelo saldo vindo da API


  return (
    <div>
      <Header />
      <CardVoltar title="Minha Carteira" />
      <div className="min-h-screen bg-slate-100 py-8 px-8">

        <div className="max-w-5xl mx-auto">

          {/* Título */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Minha Carteira
            </h1>

            <p className="text-slate-500 mt-2">
              Consulte seu saldo disponível para apostas e saques.
            </p>
          </div>

          {/* Card principal */}

          <div className="rounded-3xl bg-gradient-to-r from-[#041958] to-[#0b3fb4] p-8 shadow-2xl text-white">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-white/70 text-[16px]">
                  Saldo disponível
                </p>

                <h2 className="mt-3 text-[22px] font-bold">
                  {saldo.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </h2>

              </div>

              <div className="rounded-2xl bg-white/10 p-5">
                <Wallet size={20} />
              </div>

            </div>

          </div>

          {/* Informações */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <div className="flex items-center gap-3 mb-4">

                <div className="rounded-xl bg-green-100 p-3">
                  <Landmark
                    className="text-green-600"
                    size={24}
                  />
                </div>

                <h3 className="text-lg font-semibold">
                  Informações
                </h3>

              </div>

              <p className="text-slate-600">
                O saldo exibido é o valor disponível para realizar novas
                apostas ou solicitar um saque para sua conta.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">

              <div>

                <h3 className="text-lg font-semibold mb-2">
                  Deseja sacar?
                </h3>

                <p className="text-slate-600">
                  Solicite a transferência do seu saldo disponível para sua
                  conta bancária ou chave PIX.
                </p>

              </div>

              <Link
                to="/saque"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#162c6d] py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Sacar
                <ArrowUpRight size={20} />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}