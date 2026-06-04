import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="bg-[#062272] flex justify-between px-[25px] py-[15px] items-center">
            <Link to="/">
                <p className="text-white font-semibold text-[18px] ">JogodoBicho</p>
            </Link>
            <div className="flex gap-2 ">
                <Link to="/login">
                    <button className="bg-white px-[15px] py-[5px] rounded-[5px] font-semibold">Entrar</button>
                </Link>
                <Link to="/criarconta" >
                <button className="bg-[#FFA102] px-[15px] py-[5px] rounded-[5px] font-semibold">Registrar</button>
                </Link>
            </div>
        </div>
    )
}