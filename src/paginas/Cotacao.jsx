import CardCotacao from "../components/CardCotacao";
import CardVoltar from "../components/CardVoltar";
import Header from "../components/Header";

export default function Cotacao() {
  const modalidades = [
    {
      nome: "Milhar",
      cotacao: 4000,
    },
    {
      nome: "Centena",
      cotacao: 600,
    },
    {
      nome: "Dezena",
      cotacao: 50,
    },
    {
      nome: "Unidade",
      cotacao: 5,
    },
    {
      nome: "Grupo",
      cotacao: 16,
    },
    {
      nome: "Duque",
      cotacao: 200,
    },
    {
      nome: "Terno de Dezena",
      cotacao: 4000,
    },
    {
      nome: "Terno 1º ao 5º",
      cotacao: 100,
    },
    {
      nome: "Terno Seco Especial",
      cotacao: 1000,
    },
    {
      nome: "Passe",
      cotacao: 80,
    },
    {
      nome: "Passe V.V.",
      cotacao: 40,
    },
    {
      nome: "Quina",
      cotacao: 1000,
    },
    {
      nome: "Quadra",
      cotacao: 100,
    },
    {
      nome: "Terno",
      cotacao: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Header />

      <CardVoltar
        title="Cotação"
        to="/"
      />

      <div className="px-4 py-6">
        <CardCotacao
          modalidades={modalidades}
          onJogar={() =>
            console.log("Ir para aposta")
          }
        />
      </div>
    </div>
  );
}