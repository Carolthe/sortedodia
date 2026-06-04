export default function CardPaginas({ imagem, alt = "Imagem do card" }) {
  return (
    <div className="w-[130px] h-[150px] mx-auto mt-[10px] relative rounded-2xl overflow-hidden shadow-xl">
      
      {/* Imagem de fundo */}
      <img
        src={imagem}
        alt={alt}
        className="w-full h-full object-cover"
      />

      {/* Camada escura */}
      <div className="absolute inset-0"></div>
    </div>
  )
}