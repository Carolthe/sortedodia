import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
} from "lucide-react";

import CardMenuUsuario from "./CardMenuUsuario";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Exemplo
  const usuarioLogado = true;

  return (
    <>
      <header className=" bg-[#041958]/95 backdrop-blur-xl border-b border-white/10 shadow-lg">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-17">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <img
              src="https://res.cloudinary.com/do4p13i1a/image/upload/v1783082311/ChatGPT_Image_3_07_2026_13_35_28_vbf65y.png"
              alt="Logo do site"
              className="h-13 w-auto"
            />
          </Link>

          {/* Não logado */}

          {!usuarioLogado ? (

            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2 text-white transition hover:bg-white/10"
              >
                Entrar
              </Link>

              <Link
                to="/criarConta"
                className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2 font-semibold text-[#041958] transition hover:bg-yellow-300"
              >
                Cadastro
              </Link>

            </div>

          ) : (

            <button
              onClick={() => setMenuAberto(true)}
              className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <Menu
                size={26}
                className="text-white"
              />
            </button>

          )}

        </div>

      </header>

      {/* Overlay */}

      {usuarioLogado && menuAberto && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Menu lateral */}

      {usuarioLogado && (

        <aside
          className={`fixed right-0 top-0 z-50 h-screen w-[380px] max-w-[90vw] bg-[#041958] shadow-2xl transition-transform duration-300 ${menuAberto
              ? "translate-x-0"
              : "translate-x-full"
            }`}
        >

          <div className="flex items-center justify-between border-b border-white/10 p-5">

            <h2 className="font-semibold text-white">
              Minha Conta
            </h2>

            <button
              onClick={() => setMenuAberto(false)}
              className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
            >
              <X className="text-white" />
            </button>

          </div>

          <div className="">
            <CardMenuUsuario />
          </div>

        </aside>

      )}

    </>
  );
}