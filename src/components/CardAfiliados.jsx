import { Link } from "react-router-dom";

export default function CardAfiliados() {
  return (
    <div className="flex items-center py-[20px] mx-[20px] justify-between my-[20px] rounded-2xl bg-[#062272] px-5 py-5 text-white shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB800]">
          <span className="text-lg font-bold text-[#03227A]">$</span>
        </div>

        <div>
          <h2 className="text-[18px] font-semibold leading-tight">
            Ganhe com o Ponto do Bicho
          </h2>

          <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/90">
            Afilie-se e receba comissão sobre as apostas.
          </p>
          <Link to="/afiliado">
            <button className="mt-[8px] rounded-xl border border-white px-6 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-[#03227A]">
              Quero ser afiliado
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
