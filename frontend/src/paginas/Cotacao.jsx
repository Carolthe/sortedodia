import { useState, useEffect } from "react";

import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar";
import CardCotacao from "../components/CardCotacao";

import { buscarCotacoes } from "../api/apiCotacao";

export default function Cotacao() {

  const [modalidades, setModalidades] = useState([]);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    async function carregar() {

      try {

        const dados = await buscarCotacoes();

        setModalidades(dados);

      } catch (erro) {

        console.error("Erro ao carregar cotações:", erro);

        alert("Não foi possível carregar as cotações.");

      } finally {

        setCarregando(false);

      }

    }

    carregar();

  }, []);

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      <Header />

      <CardVoltar
        title="Cotação"
        to="/"
      />

      <div className="px-4 py-6">

        {carregando ? (

          <div className="text-center py-10">

            Carregando cotações...

          </div>

        ) : (

          <CardCotacao
            modalidades={modalidades}
            onJogar={() =>
              console.log("Ir para aposta")
            }
          />

        )}

      </div>

    </div>

  );

}