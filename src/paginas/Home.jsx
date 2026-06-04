import CardAfiliados from "../components/CardAfiliados";
import CardPaginas from "../components/CardePaginas";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="bg-[#e1e4e9]">
            <Header />
           
            <Carousel />
            <div className="flex flex-wrap justify-center gap-[30px] rounded-[20px] bg-[#f3f3f3] p-[15px] pb-[20px] mt-[10px]">
                
                <Link to="/jogo" >
                    <CardPaginas imagem="https://res.cloudinary.com/do4p13i1a/image/upload/v1780248365/doisbi_wgsba8.png"
                        alt="Jogo" />
                </Link>
                {/* titulo="Resultados"  */}
                <Link to="/resultados">
                    <CardPaginas imagem="https://res.cloudinary.com/do4p13i1a/image/upload/v1780070304/res_eua4dm.png"
                        alt="Resultados" />
                </Link>
                {/* titulo="Cotação" */}
                <Link to="/cotacao">
                    <CardPaginas imagem="https://res.cloudinary.com/do4p13i1a/image/upload/v1780235379/co_ejflry.png"
                        alt="Cotação" />
                </Link>
                {/* Proximos Resultados */}
                <Link to="horario">
                    <CardPaginas imagem="https://res.cloudinary.com/do4p13i1a/image/upload/v1780247765/ChatGPT_Image_31_05_2026_18_15_30_zyqczg.png"
                        alt="Proximos Resultados" />
                </Link>
                {/* titulo="Saque" */}
                <Link to="/saque">
                    <CardPaginas imagem="https://res.cloudinary.com/do4p13i1a/image/upload/v1780235599/sa_oqmzwq.png"
                        alt="Saque" />
                </Link>
                {/* titulo="Recarga" */}
                <Link to="/pix">
                    <CardPaginas imagem="https://res.cloudinary.com/do4p13i1a/image/upload/v1780235741/pi_hciizr.png"
                        alt="Pix" />
                </Link>

                {/* Novos componentes, carteira e minhas apostas */}
            </div>
            <CardAfiliados />
        </div>
    )
}