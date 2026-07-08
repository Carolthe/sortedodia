export default function CardTabelaBicho() {
  const animais = [
    { grupo: "01", nome: "Avestruz", numeros: ["01", "02", "03", "04"] },
    { grupo: "02", nome: "Águia", numeros: ["05", "06", "07", "08"] },
    { grupo: "03", nome: "Burro", numeros: ["09", "10", "11", "12"] },
    { grupo: "04", nome: "Borboleta", numeros: ["13", "14", "15", "16"] },
    { grupo: "05", nome: "Cachorro", numeros: ["17", "18", "19", "20"] },
    { grupo: "06", nome: "Cabra", numeros: ["21", "22", "23", "24"] },
    { grupo: "07", nome: "Carneiro", numeros: ["25", "26", "27", "28"] },
    { grupo: "08", nome: "Camelo", numeros: ["29", "30", "31", "32"] },
    { grupo: "09", nome: "Cobra", numeros: ["33", "34", "35", "36"] },
    { grupo: "10", nome: "Coelho", numeros: ["37", "38", "39", "40"] },
    { grupo: "11", nome: "Cavalo", numeros: ["41", "42", "43", "44"] },
    { grupo: "12", nome: "Elefante", numeros: ["45", "46", "47", "48"] },
    { grupo: "13", nome: "Galo", numeros: ["49", "50", "51", "52"] },
    { grupo: "14", nome: "Gato", numeros: ["53", "54", "55", "56"] },
    { grupo: "15", nome: "Jacaré", numeros: ["57", "58", "59", "60"] },
    { grupo: "16", nome: "Leão", numeros: ["61", "62", "63", "64"] },
    { grupo: "17", nome: "Macaco", numeros: ["65", "66", "67", "68"] },
    { grupo: "18", nome: "Porco", numeros: ["69", "70", "71", "72"] },
    { grupo: "19", nome: "Pavão", numeros: ["73", "74", "75", "76"] },
    { grupo: "20", nome: "Peru", numeros: ["77", "78", "79", "80"] },
    { grupo: "21", nome: "Touro", numeros: ["81", "82", "83", "84"] },
    { grupo: "22", nome: "Tigre", numeros: ["85", "86", "87", "88"] },
    { grupo: "23", nome: "Urso", numeros: ["89", "90", "91", "92"] },
    { grupo: "24", nome: "Veado", numeros: ["93", "94", "95", "96"] },
    { grupo: "25", nome: "Vaca", numeros: ["97", "98", "99", "00"] },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 p-2">
      {animais.map((animal) => (
        <div
          key={animal.grupo}
          className="border rounded-lg bg-white shadow-sm overflow-hidden"
        >
          <div className="flex justify-between bg-gray-100 px-2 py-1">
            <span className="text-[10px] font-bold truncate">
              {animal.nome.toUpperCase()}
            </span>
            <span className="text-[10px] font-bold text-red-500">
              {animal.grupo}
            </span>
          </div>

          <div className="h-16 flex items-center justify-center">
            <img
              src={`/animais/${animal.nome
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()}.png`}
              alt={animal.nome}
              className="h-12 w-12 object-contain"
            />
          </div>

          <div className="text-center text-[9px] font-semibold py-1">
            {animal.numeros.join(" - ")}
          </div>
        </div>
      ))}
    </div>
  );
}