export default function CardPaginas({ imagem, alt = "Imagem do card" }) {
  return (
    <div className="flex flex-col items-center gap-2 transition-transform duration-300 group-hover:-translate-y-1">

      <div className="w-full aspect-[4/5] max-w-[130px] mx-auto relative rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-xl">

        <img
          src={imagem}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      </div>

      <span className="text-xs sm:text-sm font-medium text-gray-600 text-center group-hover:text-[#062272] transition-colors">
        {alt}
      </span>

    </div>
  )
}