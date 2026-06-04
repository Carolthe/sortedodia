import { useState } from "react";
import { Link } from "react-router-dom";

export default function CardCotacao({
  modalidades,
  onJogar,
}) {
  const [modalidade, setModalidade] = useState(
    modalidades[0]
  );

  const [valorAposta, setValorAposta] = useState("");

  const aposta = Number(valorAposta) || 0;
  const ganho = aposta * modalidade.cotacao;

  return (
    <div className="flex justify-center">
      <div
        className="
          w-full max-w-md
          rounded-3xl
          border border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <h2 className="text-center text-2xl font-bold text-[#062272]">
          Calculadora de Cotação
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          Escolha uma modalidade e informe o valor
        </p>

        {/* Modalidade */}
        <div className="mt-6">
          <label className="mb-2 block font-medium text-slate-700">
            Modalidade
          </label>

          <select
            value={modalidade.nome}
            onChange={(e) =>
              setModalidade(
                modalidades.find(
                  (item) =>
                    item.nome === e.target.value
                )
              )
            }
            className="
              w-full
              rounded-xl
              border border-slate-300
              bg-white
              p-3
              outline-none
              focus:border-[#062272]
            "
          >
            {modalidades.map((item) => (
              <option
                key={item.nome}
                value={item.nome}
              >
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Valor */}
        <div className="mt-4">
          <label className="mb-2 block font-medium text-slate-700">
            Valor
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="R$ 0,00"
            value={valorAposta}
            onChange={(e) =>
              setValorAposta(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border border-slate-300
              p-3
              outline-none
              focus:border-[#062272]
            "
          />
        </div>

        {/* Resultado */}
        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <div className="flex justify-between">
            <span className="text-slate-500">
              Cotação
            </span>

            <span className="font-semibold text-[#062272]">
              {modalidade.cotacao}x
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-slate-500">
              Valor
            </span>

            <span className="font-semibold">
              R$ {aposta.toFixed(2)}
            </span>
          </div>

       

          <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">
                Total
              </span>

              <span className="text-2xl font-bold text-green-600">
                R$ {ganho.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Link to="/jogo">
          <button
            onClick={onJogar}
            className="
              mt-6
              w-full
              rounded-xl
              bg-[#062272]
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#0a318f]
            "
          >
            Jogar
          </button>
        </Link>
      </div>
    </div>
  );
}