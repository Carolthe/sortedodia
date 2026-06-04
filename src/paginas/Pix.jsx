import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar";

export default function Pix() {
  const valor = 49.90;

  const handlePagamento = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/pagamentos/criar-preferencia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produto: "Plano Premium",
            valor,
          }),
        }
      );

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao iniciar pagamento");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <CardVoltar title="Pagamento" />

      <div className="max-w-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center text-[#001A72]">
          Finalizar Compra
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Revise os dados antes de concluir o pagamento.
        </p>

        <div className="bg-white rounded-3xl shadow-sm border p-6 mt-8">
          <h2 className="text-lg font-semibold">
            Resumo do Pedido
          </h2>

          <div className="mt-6 flex justify-between">
            <span className="text-gray-600">
              Plano Premium
            </span>

            <span className="font-semibold">
              R$ {valor.toFixed(2)}
            </span>
          </div>

          <div className="my-5 border-t"></div>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              Total
            </span>

            <span className="text-2xl font-bold text-green-600">
              R$ {valor.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mt-6">
          <p className="text-sm text-blue-700">
            Você será redirecionado para o ambiente seguro do
            Mercado Pago para concluir sua compra.
          </p>
        </div>

        <button
          onClick={handlePagamento}
          className="
            mt-8
            w-full
            h-14
            rounded-3xl
            bg-[#009EE3]
            text-white
            text-lg
            font-bold
            transition
            hover:brightness-95
          "
        >
          Pagar com Mercado Pago
        </button>
      </div>
    </div>
  );
}