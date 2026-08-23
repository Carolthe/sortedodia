import { useEffect, useState } from "react";
import CardData from "../components/CardData";
import CardResultado from "../components/CardResultado";
import CardVoltar from "../components/CardVoltar";
import Header from "../components/Header";
import { listarResultados } from "../api/resultadosServices";

export default function Resultados() {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    async function carregarResultados() {
      try {
        const dados = await listarResultados();
        setResultados(dados);
      } catch (error) {
        console.error("Erro ao carregar resultados:", error);
      }
    }

    carregarResultados();
  }, []);

  return (
    <div>
      <Header />
      <CardVoltar title="Resultados" to="/" />
      <CardData />

      <div className="flex flex-wrap justify-center p-6">
        <CardResultado resultados={resultados} />
      </div>
    </div>
  );
}