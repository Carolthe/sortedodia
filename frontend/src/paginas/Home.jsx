import CardAfiliados from "../components/CardAfiliados";
//import CardPaginas from "../components/CardePaginas";
//import Carousel from "../components/Carousel";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import PlayButton from "../components/PlayButton";
//import Benefits from "../components/Benefits";
import { Dice5, BarChart3, BadgeDollarSign, CalendarDays, Wallet, Landmark } from "lucide-react";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
    const services = [
        {
            title: "Jogo ",
            description: "Faça suas apostas",
            icon: <Dice5 size={28} />,
            iconBg: "bg-blue-600",
            link: "/jogo",
        },
        {
            title: "Resultados",
            description: "Veja os resultados",
            icon: <BarChart3 size={28} />,
            iconBg: "bg-emerald-500",
            link: "/resultados",
        },
        {
            title: "Cotação",
            description: "Ccdotações dia",
            icon: <BadgeDollarSign size={28} />,
            iconBg: "bg-yellow-500",
            link: "/cotacao",
        },
        {
            title: "Próximos",
            description: "Próximos sorteios",
            icon: <CalendarDays size={28} />,
            iconBg: "bg-purple-600",
            link: "/horario"
        },
        {
            title: "PIX",
            description: "Deposite e receba via PIX",
            icon: <Landmark size={28} />,
            iconBg: "bg-cyan-500",
            link: "/pix"
        },
        {
            title: "Saque",
            description: "Solicite seu saque via PIX",
            icon: <Wallet size={28} />,
            iconBg: "bg-orange-500",
            link: "/saque"
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4F9FD] to-[#E8EFF9]">

            <Header />

            <main className="max-w-7xl mx-auto px-4 pt-5">

                {/* Hero */}
                <div className="mb-5 text-center">

                    <span className="inline-block px-4 py-1 mb-4 rounded-full bg-[#c7d6fcab] text-[#062272] text-xs font-semibold tracking-wide uppercase">
                        Sua sorte começa aqui
                    </span>

                    <h1 className="text-3xl mx-[48px] sm:text-5xl font-extrabold text-[#0A1F44] tracking-tight">
                        Bem-vindo ao <span className="text-[#062272]">Ponto do Bicho</span>
                    </h1>

                    <p className="mt-3 text-gray-500 px-[40px] text-base sm:text-lg max-w-xl mx-auto">
                        Escolha uma das opções abaixo para jogar, conferir resultados e muito mais.
                    </p>
                    <PlayButton />
                    {/* <Benefits/> */}

                </div>


                <div className="">
                    <h2 className="text-[20px] font-bold text-blue-950 mb-4 mx-[15px] ">
                        Navegue pelos serviços
                    </h2>


                    <div className="">
                        {services.map((service) => (

                            <Link
                                key={service.alt}
                                to={service.link}
                                className="group"
                            >

                                <ServiceCard
                                    key={service.title}
                                    title={service.title}
                                    description={service.description}
                                    icon={service.icon}
                                    iconBg={service.iconBg}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-10">

                    <CardAfiliados />

                </div>

            </main >

            <footer className="mt-5 py-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Ponto do Bicho. Todos os direitos reservados.
            </footer>

        </div >
    );
}