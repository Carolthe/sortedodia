import CardCotacao from "../components/CardCotacao";
import CardVoltar from "../components/CardVoltar";
import Header from "../components/Header";

export default function Cotacao() {
  const cotacoes = [
    {
      titulo: "Milhar",
      valor: "1x R$ 4.000,00",
      
    },
    {
      titulo: "Centena",
      valor: "1x R$ 600,00",
      mostrarCotacoes: true,
    },
    {
      titulo: "Dezena",
      valor: "1x R$ 50,00",
      mostrarCotacoes: true,
    },
        {
      titulo: "Unidade",
      valor: "1x R$ 5,00",
      
    },
    {
      titulo: "Grupo",
      valor: "1x R$ 16,00",
      mostrarCotacoes: true,
    },
    {
      titulo: "Duque",
      valor: "1x R$ 200,00",
      mostrarCotacoes: true,
    },
        {
      titulo: "Terno de Dezena",
      valor: "1x R$ 4.000,00",
      mostrarCotacoes: false,
    },
    {
      titulo: "Terno 1º ao 5º",
      valor: "1x R$ 100,00",
      mostrarCotacoes: true,
    },
    {
      titulo: "Terno seco Esp",
      valor: "1x R$ 1.000,00",
      mostrarCotacoes: true,
    },
        {
      titulo: "Passe",
      valor: "1x R$ 80,00",
      mostrarCotacoes: false,
    },
    {
      titulo: "Passe V. V.",
      valor: "1x R$ 40,00",
      mostrarCotacoes: true,
    },
    {
      titulo: "Quina",
      valor: "1x R$ 1.000,00",
      mostrarCotacoes: true,
    },    {
      titulo: "Quadra",
      valor: "1x R$ 100,00",
      mostrarCotacoes: false,
    },
    {
      titulo: "Terno",
      valor: "1x R$ 10,00",
      mostrarCotacoes: true,
    },
  ];

  return (
    <div className="bg-[#f5f7fc]">
      <Header />

      <CardVoltar
        title="Valor dos prêmios"
        to="/"
      />

      <div className="space-y-4 p-4">
        {cotacoes.map((cotacao) => (
          <CardCotacao
            key={cotacao.titulo}
            titulo={cotacao.titulo}
            valor={cotacao.valor}
            mostrarCotacoes={cotacao.mostrarCotacoes}
            onJogar={() =>
              console.log(cotacao.titulo)
            }
          />
        ))}
      </div>
    </div>
  );
}