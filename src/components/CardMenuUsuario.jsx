import {
  LogOut,
  Gift,
  Star,
  RefreshCw,
  Zap,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

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

            {/* <button className="font-semibold text-[#FFB000]">
              Saiba mais
            </button> */}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            10%
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
      <Link to="/carteira">
      <button className="mb-4 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#FFB000] font-bold text-[#FFB000] transition hover:bg-[#FFB000]/10">
        <Wallet size={18} />
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

// import {
//   Gift,
//   LogOut,
//   RefreshCw,
//   Star,
//   Wallet,
//   Zap,
// } from "lucide-react";

// export default function CardMenuUsuario() {
//   return (
//     <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0A2E91] to-[#05184E] shadow-2xl">

//       {/* Header */}

//       <div className="border-b border-white/10 p-6">

//         <div className="flex items-center justify-between">

//           <div>

//             <span className="text-sm text-white/60">
//               Bem-vinda
//             </span>

//             <h2 className="mt-1 text-lg font-bold text-white">
//               Caroline Tenório
//             </h2>

//           </div>

//           <button className="rounded-xl bg-red-500/10 p-2 transition hover:bg-red-500/20">

//             <LogOut
//               size={20}
//               className="text-red-400"
//             />

//           </button>

//         </div>

//       </div>

//       {/* Fidelidade */}

//       <div className="border-b border-white/10 p-6">

//         <div className="flex items-center justify-between">

//           <div className="flex items-center gap-4">

//             <div className="rounded-xl bg-yellow-400/10 p-3">

//               <Gift
//                 className="text-yellow-400"
//               />

//             </div>

//             <div>

//               <p className="text-sm text-white/60">
//                 Bônus Fidelidade
//               </p>

//               <p className="font-semibold text-white">
//                 10%
//               </p>

//             </div>

//           </div>

//           <Star
//             className="fill-yellow-400 text-yellow-400"
//           />

//         </div>

//       </div>

//       {/* Saldos */}

//       <div className="space-y-5 p-6">

//         <div className="rounded-2xl bg-white/5 p-4">

//           <div className="mb-2 flex items-center justify-between">

//             <span className="text-white/70">
//               Saldo
//             </span>

//             <RefreshCw
//               size={16}
//               className="text-yellow-400"
//             />

//           </div>

//           <h3 className="text-3xl font-bold text-white">
//             R$ 0,00
//           </h3>

//         </div>

//         <div className="rounded-2xl bg-white/5 p-4">

//           <span className="text-white/70">
//             Bônus
//           </span>

//           <h3 className="mt-2 text-2xl font-bold text-white">
//             R$ 0,00
//           </h3>

//         </div>

//       </div>

//       {/* Botões */}

//       <div className="space-y-3 p-6 pt-0">

//         <button className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white/10 font-semibold text-white transition hover:bg-white/20">

//           <Zap className="text-yellow-400" />

//           Minhas apostas

//         </button>

//         <button className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-yellow-400 text-yellow-400 transition hover:bg-yellow-400/10">

//           <Wallet />

//           Carteira

//         </button>

//         <button className="h-14 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 font-bold text-[#062272] shadow-lg transition hover:scale-[1.02]">

//           Depositar

//         </button>

//       </div>

//     </div>
//   );
// }