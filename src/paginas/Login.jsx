import {
  IoArrowBack,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoLogInOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-5 py-6 flex items-center justify-center">
      <div className="w-full max-w-md">

        {/* BOTÃO VOLTAR */}
        <Link to="/">
          <button
            className="
            mb-6 flex items-center gap-2
            rounded-xl border border-[#dbe3f0]
            bg-white px-4 py-2
            text-[#062272]
            shadow-sm
            transition hover:bg-slate-50
          "
          >
            <IoArrowBack size={18} />
            <span>Voltar</span>
          </button>
        </Link>
        {/* CARD LOGIN */}
        <div className="rounded-3xl bg-white p-8 shadow-xl border border-[#e5eaf3]">

          {/* HEADER */}
          <div className="mb-8 text-center">
            <div
              className="
                mx-auto mb-4 flex h-20 w-20
                items-center justify-center
                rounded-2xl
                bg-[#062272]
                shadow-lg
              "
            >
              <IoPersonCircleOutline
                size={42}
                color="white"
              />
            </div>

            <h1 className="mb-2 text-3xl font-bold text-[#062272]">
              Entrar
            </h1>

            <p className="text-sm text-slate-500">
              Digite suas credenciais para acessar sua conta
            </p>
          </div>

          {/* FORMULÁRIO */}
          <form>

            {/* EMAIL */}
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <IoPersonOutline
                  size={16}
                  className="text-[#062272]"
                />

                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
              </div>

              <input
                type="email"
                placeholder="Seu email"
                className="
                  w-full rounded-xl
                  border border-[#dbe3f0]
                  bg-white
                  p-4
                  text-slate-800
                  shadow-sm
                  outline-none
                  transition
                  focus:border-[#062272]
                  focus:ring-2
                  focus:ring-[#062272]/20
                "
              />
            </div>

            {/* SENHA */}
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <IoLockClosedOutline
                  size={16}
                  className="text-[#062272]"
                />

                <label className="text-sm font-medium text-slate-700">
                  Senha
                </label>
              </div>

              <div
                className="
                  flex items-center
                  rounded-xl
                  border border-[#dbe3f0]
                  bg-white
                  shadow-sm
                  focus-within:border-[#062272]
                  focus-within:ring-2
                  focus-within:ring-[#062272]/20
                "
              >
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="
                    flex-1
                    bg-transparent
                    p-4
                    text-slate-800
                    outline-none
                  "
                />

                <button
                  type="button"
                  className="px-4"
                >
                  <IoEyeOutline
                    size={20}
                    className="text-slate-500"
                  />
                </button>
              </div>
            </div>

            {/* LEMBRAR-ME */}
            <div className="mb-6 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="accent-[#062272]"
                />
                Lembrar-me
              </label>
    <Link to="/recuperarsenha">
              <p
                className="
                  text-sm font-medium
                  text-[#062272]
                  hover:underline
                "
              >
                Esqueceu a senha?
              </p>
              </Link>
            </div>

            {/* BOTÃO LOGIN */}
            <button
              type="submit"
              className="
                flex w-full items-center
                justify-center gap-2
                rounded-xl
                bg-[#062272]
                p-4
                font-bold
                text-white
                shadow-lg
                transition
                hover:bg-[#0a318f]
              "
            >
              <IoLogInOutline size={20} />
              Entrar
            </button>
          </form>

          {/* DIVISOR */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-[#dbe3f0]" />

            <span className="px-4 text-sm text-slate-400">
              ou
            </span>

            <div className="h-px flex-1 bg-[#dbe3f0]" />
          </div>

          {/* LOGIN GOOGLE */}
          <button
            className="
              mb-5 w-full rounded-xl
              border border-[#dbe3f0]
              bg-white
              p-4
              font-medium
              text-[#062272]
              shadow-sm
              transition
              hover:bg-slate-50
            "
          >
            Continuar com Google
          </button>

          {/* REGISTRO */}
          <div className="text-center">
            <span className="text-slate-500">
              Não possui uma conta?
            </span>

            <a
              href="#"
              className="
                ml-1 font-bold
                text-[#062272]
                hover:underline
              "
            >
              Criar conta
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}