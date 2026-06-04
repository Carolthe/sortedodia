import CardVoltar from "../components/CardVoltar";
import Header from "../components/Header";

export default function Afiliados() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <CardVoltar title="Ser Afiliado" />

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold text-center">
          Se tornar um afiliado
        </h1>

        <p className="mt-3 text-center text-base text-[#858585]">
          Preencha os dados abaixo. Sua solicitação será analisada pela nossa
          equipe.
        </p>

        <form className="mt-[15px] flex flex-col gap-[20px]">
          {/* Contato */}
          <div className="w-full">
            <h2 className="mb-[10px] text-xl font-bold text-blue-600">
              Contato
            </h2>

            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-base font-semibold text-gray-700"
                >
                  Nome
                </label>

                <input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  className="
                    w-full
                    h-12
                    rounded-3xl
                    border
                    border-gray-400
                    px-5
                    text-base
                    text-gray-700
                    outline-none
                    transition
                    focus:border-blue-500
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="whatsapp"
                  className="mb-2 block text-base font-semibold text-gray-700"
                >
                  WhatsApp
                </label>

                <input
                  id="whatsapp"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="
                    w-full
                    h-12
                    rounded-3xl
                    border
                    border-gray-400
                    px-5
                    text-base
                    text-gray-700
                    outline-none
                    transition
                    focus:border-blue-500
                  "
                />
              </div>
            </div>
          </div>

          {/* Divulgação */}
          <div className="w-full">
            <h2 className="mb-4 text-xl font-bold text-blue-600">
              Como pretende divulgar?
            </h2>

            <div>
              <label
                htmlFor="divulgacao"
                className="mb-2 block text-base font-semibold text-gray-700"
              >
                Como pretende divulgar?
              </label>

              <textarea
                id="divulgacao"
                rows={5}
                placeholder="Descreva como você pretende divulgar a plataforma. Isso nos ajuda a identificar bons afiliados."
                className="
                  w-full
                  resize-none
                  rounded-3xl
                  border
                  border-gray-400
                  p-4
                  text-base
                  text-gray-700
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="
                  w-full
                  sm:w-[320px]
                  h-14
                  rounded-3xl
                  bg-[#FFA500]
                  text-lg
                  font-bold
                  text-[#001A72]
                  transition
                  hover:brightness-95
                "
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}