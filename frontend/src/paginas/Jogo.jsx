// Jogo.jsx
import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar";
import CardFormularioPalpite from "../components/CardFormularioPalpite";
//import HeaderTeste from "../components/HeaderTeste";
//import CardTabelaBicho from "../components/CardTabelaBicho";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Jogo() {

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login");

        }

    }, []);

    return (
        <div className="bg-[#eff3fb]">
            <Header />
            {/* <HeaderTeste /> */}
            <CardVoltar title="Faça seu Jogo" to="/" />
            <div className="flex justify-center">
                <img className="w-[95%] rounded-[15px] mt-[15px]  " src="https://res.cloudinary.com/do4p13i1a/image/upload/v1779993687/bannermilhar_rdbqqm.png" alt="Banner do jogo" />
            </div>
            {/* <CardTabelaBicho/> */}

            <CardFormularioPalpite />

        </div>
    );
}