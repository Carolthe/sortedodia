// Jogo.jsx
import Header from "../components/Header";
import CardVoltar from "../components/CardVoltar";
import CardFormularioPalpite from "../components/CardFormularioPalpite";
//import HeaderTeste from "../components/HeaderTeste";
//import CardTabelaBicho from "../components/CardTabelaBicho";

export default function Jogo() {

    return (
        <div className="bg-[#eff3fb]">
            <Header />
            {/* <HeaderTeste /> */}
            <CardVoltar title="Tipo de jogo" to="/" />
            <div className="flex justify-center">
            <img className="w-[95%] rounded-[15px] mt-[15px]  " src="https://res.cloudinary.com/do4p13i1a/image/upload/v1780054822/jbb_i43i3r.png" />
           </div>
        {/* <CardTabelaBicho/> */}

        <CardFormularioPalpite/>

        </div>
    );
}