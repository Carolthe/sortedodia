import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CardMenuUsuario from "./CardMenuUsuario";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="bg-[#062272] flex justify-between items-center px-[25px] py-[15px] relative z-50">
        <Link to="/">
          <p className="text-[18px] font-semibold text-white">
            JogodoBicho
          </p>
        </Link>

        {/* Botão alterna entre hambúrguer e X */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="text-white"
        >
          {!menuAberto && <Menu size={28} /> }
        </button>
      </header>

      {/* OVERLAY */}
      {menuAberto && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* MENU LATERAL */}
      <div
        className={`
          fixed top-0 right-0 z-50
          h-screen w-[380px] max-w-[90vw]
          bg-transparent p-4
          transition-transform duration-300
          ${menuAberto ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* BOTÃO FECHAR — pode remover se preferir */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setMenuAberto(false)}
            className="text-white"
          >
            <X size={28} />
          </button>
        </div>

        <CardMenuUsuario />
      </div>
    </>
  );
}