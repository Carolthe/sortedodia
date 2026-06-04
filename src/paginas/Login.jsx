import {
  IoArrowBack,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoLogInOutline,
} from "react-icons/io5";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] px-5 py-6">
      <div className="mx-auto max-w-md">

        {/* BOTÃO VOLTAR */}
        <button
          className="
            mb-6 flex items-center gap-2
            rounded-lg border border-[#2e2e50]
            bg-[#1a1a2e]
            px-3 py-2
            text-[#007ACC]
          "
        >
          <IoArrowBack size={18} />
          <span>Voltar</span>
        </button>

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div
            className="
              mx-auto mb-4 flex h-16 w-16
              items-center justify-center
              rounded-2xl border
              border-[#007ACC]
              bg-[#1a1a2e]
            "
          >
            <IoPersonCircleOutline
              size={34}
              color="#007ACC"
            />
          </div>

          <h1 className="mb-2 text-3xl font-bold text-white">
            Entrar
          </h1>

          <p className="text-sm text-[#a0a0b8]">
            Digite suas credenciais para acessar sua conta
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form>

          {/* EMAIL */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <IoPersonOutline
                size={14}
                className="text-[#007ACC]"
              />

              <label className="text-sm font-medium text-white">
                Email
              </label>
            </div>

            <input
              type="email"
              placeholder="Seu email"
              className="
                w-full rounded-xl
                border border-[#2e2e50]
                bg-[#1a1a2e]
                p-4 text-white
                outline-none
                transition
                focus:border-[#007ACC]
              "
            />
          </div>

          {/* SENHA */}
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <IoLockClosedOutline
                size={14}
                className="text-[#007ACC]"
              />

              <label className="text-sm font-medium text-white">
                Senha
              </label>
            </div>

            <div
              className="
                flex items-center
                rounded-xl
                border border-[#2e2e50]
                bg-[#1a1a2e]
              "
            >
              <input
                type="password"
                placeholder="Digite sua senha"
                className="
                  flex-1 bg-transparent
                  p-4 text-white
                  outline-none
                "
              />

              <button
                type="button"
                className="px-4"
              >
                <IoEyeOutline
                  size={20}
                  className="text-[#a0a0b8]"
                />
              </button>
            </div>
          </div>

          {/* LEMBRAR-ME */}
          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[#a0a0b8]">
              <input
                type="checkbox"
                className="accent-[#007ACC]"
              />
              Lembrar-me
            </label>

            <a
              href="#"
              className="text-sm text-[#007ACC]"
            >
              Esqueceu a senha?
            </a>
          </div>

          {/* BOTÃO LOGIN */}
          <button
            type="submit"
            className="
              flex w-full items-center
              justify-center gap-2
              rounded-xl
              bg-[#007ACC]
              p-4
              font-bold
              text-white
              transition
              hover:brightness-110
            "
          >
            <IoLogInOutline size={20} />
            Entrar
          </button>
        </form>

        {/* DIVISOR */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-[#2e2e50]" />
          <span className="px-4 text-sm text-[#a0a0b8]">
            ou
          </span>
          <div className="h-px flex-1 bg-[#2e2e50]" />
        </div>

        {/* LOGIN SOCIAL */}
        <button
          className="
            mb-4 w-full rounded-xl
            border border-[#2e2e50]
            bg-[#1a1a2e]
            p-4 text-white
            transition
            hover:border-[#007ACC]
          "
        >
          Continuar com Google
        </button>

        {/* REGISTRO */}
        <div className="text-center">
          <span className="text-[#a0a0b8]">
            Não possui uma conta?
          </span>

          <a
            href="#"
            className="ml-1 font-bold text-[#007ACC]"
          >
            Criar conta
          </a>
        </div>
      </div>
    </div>
  );
}