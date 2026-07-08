import CardAfiliados from "../components/CardAfiliados";
import CardPaginas from "../components/CardePaginas";
//import Carousel from "../components/Carousel";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Home() {

    const paginas = [
        {
            link: "/jogo",
            imagem: "https://res.cloudinary.com/do4p13i1a/image/upload/v1780248365/doisbi_wgsba8.png",
            alt: "Jogo do Bicho"
        },
        {
            link: "/resultados",
            imagem: "https://res.cloudinary.com/do4p13i1a/image/upload/v1780070304/res_eua4dm.png",
            alt: "Resultados"
        },
        {
            link: "/cotacao",
            imagem: "https://res.cloudinary.com/do4p13i1a/image/upload/v1780235379/co_ejflry.png",
            alt: "Cotação"
        },
        {
            link: "/horario",
            imagem: "https://res.cloudinary.com/do4p13i1a/image/upload/v1780247765/ChatGPT_Image_31_05_2026_18_15_30_zyqczg.png",
            alt: "Próximos Resultados"
        },
        {
            link: "/saque",
            imagem: "https://res.cloudinary.com/do4p13i1a/image/upload/v1780235599/sa_oqmzwq.png",
            alt: "Saque"
        },
        {
            link: "/pix",
            imagem: "https://res.cloudinary.com/do4p13i1a/image/upload/v1780235741/pi_hciizr.png",
            alt: "Pix"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4F9FD] to-[#E8EFF9]">

            <Header />

            {/* <Carousel /> */}

            <main className="max-w-7xl mx-auto px-4 pt-8">

                {/* Hero */}
                <div className="mb-5 text-center">

                    <span className="inline-block px-4 py-1 mb-4 rounded-full bg-[#062272]/10 text-[#062272] text-xs font-semibold tracking-wide uppercase">
                        Sua sorte começa aqui
                    </span>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A1F44] tracking-tight">
                        Bem-vindo ao <span className="text-[#062272]">Ponto do Bicho</span>
                    </h1>

                    <p className="mt-3 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
                        Escolha uma das opções abaixo para jogar, conferir resultados e muito mais.
                    </p>

                </div>

                {/* Grid de páginas */}
                <section
                    className="
                        relative
                        bg-white
                        rounded-3xl
                        shadow-[0_10px_40px_-15px_rgba(6,34,114,0.25)]
                        border border-gray-100
                        p-6 sm:p-8
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-2
                            sm:grid-cols-3
                            lg:grid-cols-6
                            gap-5 sm:gap-6
                        "
                    >

                        {paginas.map((pagina) => (

                            <Link
                                key={pagina.alt}
                                to={pagina.link}
                                className="group"
                            >

                                <CardPaginas
                                    imagem={pagina.imagem}
                                    alt={pagina.alt}
                                />

                            </Link>

                        ))}

                    </div>

                </section>

                <div className="mt-10">

                    <CardAfiliados />

                </div>

            </main>

            <footer className="mt-5 py-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Ponto do Bicho. Todos os direitos reservados.
            </footer>

        </div>
    );
}