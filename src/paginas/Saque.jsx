import { CardSaldo } from "../components/CardSaldo";
import Header from "../components/Header";
import { useState } from "react";
import {
    CreditCard,
    Lock,
} from "lucide-react";
import CardVoltar from "../components/CardVoltar";

export default function Saque() {
const [tipoChave, setTipoChave] = useState("CPF");

    return (
        <>
            <Header />
            <div className=" ">
                <CardVoltar title="Faça o seu saque"/>
                <div className=" mt-[15px] py-[10px]">
                    <CardSaldo saldo="R$ 0,00" />
                </div>

            </div>
            <div className="flex justify-center" >
            <div className=" w-[90%] rounded-2xl   p-4 shadow-sm">
                <h2 className="text-[18px] font-medium text-gray-800">
                    Saque
                </h2>

                <p className="mt-4 text-base text-gray-700">
                    Valor mínimo: R$ 35,00.
                </p>

                {/* Valor */}
                <div className="mt-4 flex overflow-hidden rounded-2xl border border-gray-300 bg-white">
                    <div className="flex items-center border-r border-gray-300 px-3 text-gray-600">
                        R$
                    </div>

                    <input
                        type="number"
                        placeholder="35"
                        className="w-full bg-transparent px-3 py-3 outline-none"
                    />
                </div>

                {/* Chave Pix */}
                <div className="mt-4 flex gap-2">
                    <select
                        value={tipoChave}
                        onChange={(e) => setTipoChave(e.target.value)}
                        className="w-28 rounded-2xl border border-[#062272] bg-blue-50 px-3 py-3 text-gray-800 outline-none"
                    >
                        <option>CPF</option>
                        <option>Telefone</option>
                        <option>E-mail</option>
                    </select>

                    <div className="flex flex-1 overflow-hidden rounded-2xl border border-gray-300 bg-white">
                        <div className="flex items-center border-r border-gray-300 px-3">
                            <CreditCard size={18} className="text-gray-500" />
                        </div>

                        <input
                            type="text"
                            className="flex-1 px-3 py-3 outline-none"
                        />

                        <div className="flex items-center border-l border-gray-300 px-3">
                            <Lock size={16} className="text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Botão */}
                <button
                    className="
          mt-4
          w-full
          rounded-2xl
          border
          border-[#062272]
          bg-[#062272]
          py-3
          font-semibold
          text-[#ffff]
          transition
          hover:bg-blue-50
        "
                >
                    Efetuar saque
                </button>
            </div>
            </div>
        </>
    )
}