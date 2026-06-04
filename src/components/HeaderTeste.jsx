import { useState } from "react";
import { Menu, X } from "lucide-react";
import CardMenuUsuario from "./CardMenuUsuario";

export default function HeaderTeste() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[#AEB2DD] px-4 shadow-sm">
        <button>
          ←
        </button>

        <h1 className="text-lg font-semibold">
          Tipo de jogo
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-black/10"
        >
          <Menu size={26} />
        </button>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Menu lateral */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[360px] max-w-[95vw] transform bg-transparent transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-full bg-white p-2 shadow"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-2">
          <CardMenuUsuario />
        </div>
      </aside>
    </>
  );
}