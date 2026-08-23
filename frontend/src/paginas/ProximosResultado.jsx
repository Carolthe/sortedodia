import { useEffect, useState } from "react";
import CardHorarioResult from "../components/CardHorarioResult";
import CardVoltar from "../components/CardVoltar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { listarProximosResultados } from "../api/proximosResultadosServices";

export default function ProximosResultados() {
  const [proximosResultados, setProximosResultados] = useState([]);

  useEffect(() => {
    async function carregarProximosResultados() {
      try {
        const dados = await listarProximosResultados();
        setProximosResultados(dados);
      } catch (error) {
        console.error("Erro ao carregar próximos resultados:", error);
      }
    }

    carregarProximosResultados();
  }, []);

  return (
    <div>
      <Header />
      <CardVoltar title="Próximos Resultados" to="/" />

      <div className="mt-[20px] flex flex-col gap-6">
        {proximosResultados.map((resultado) => (
          <CardHorarioResult
            key={resultado.id_proximos_resultados}
            resultado={resultado}
          />
        ))}
      </div>

      <div className="flex justify-center mt-[20px]">
        <Link to="/jogo">
          <button
            className="
              bg-[#041958]
              hover:bg-[#041958]/80
              text-white
              font-bold
              text-[18px]
              px-[20px]
              py-[10px]
              rounded-[15px]
              transition-all
              duration-300
              shadow-sm
            "
          >
            Jogar agora
          </button>
        </Link>
      </div>
    </div>
  );
}