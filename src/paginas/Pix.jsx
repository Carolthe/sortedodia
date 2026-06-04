import { useState } from "react";
import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar";

export default function Pix() {
  const [valor, setValor] = useState("");

  const handlePagamento = async () => {
    const valorNumerico = Number(valor);

    if (!valorNumerico || valorNumerico < 10) {
      alert("O valor mínimo para recarga é R$ 10,00");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/pagamentos/criar-preferencia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produto: "Recarga de Saldo",
            valor: valorNumerico,
          }),
        }
      );

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error(error);
      alert("Ainda não disponivel");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <CardVoltar title="Recarregar seu Saldo" />

      <div className="max-w-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center text-[#001A72] mb-6">
          Qual o valor da recarga?
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor mínimo: R$ 10,00
          </label>

          <input
            type="number"
            placeholder="Ex: 50"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="
              w-full
              h-12
              px-4
              rounded-xl
              border
              border-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-[#062272]
            "
          />

          <button
            onClick={handlePagamento}
            className="
              mt-6
              w-full
              h-12
              rounded-xl
              bg-[#062272]
              text-white
              text-lg
              font-bold
              transition
              hover:brightness-95
            "
          >
            Recarregar via Pix
          </button>
        </div>
      </div>
    </div>
  );
}