import {
  IoArrowBack,
  IoPersonAdd,
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoWalletOutline,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export default function CriarConta() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] px-5 py-6">
      <div className="mx-auto max-w-lg">

        {/* VOLTAR */}
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
            <IoPersonAdd
              size={30}
              color="#007ACC"
            />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Criar Conta
          </h1>

          <p className="mt-2 text-sm text-[#a0a0b8]">
            Preencha seus dados para se cadastrar
          </p>
        </div>

        {/* FORM */}
        <form>

          {/* NOME */}
          <Field
            label="Nome Completo"
            icon={<IoPersonOutline />}
          >
            <input
              type="text"
              placeholder="Seu nome completo"
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
          </Field>

          {/* EMAIL */}
          <Field
            label="Email"
            icon={<IoMailOutline />}
          >
            <input
              type="email"
              placeholder="seu@email.com"
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
          </Field>

          {/* TELEFONE */}
          <Field
            label="Telefone"
            icon={<IoCallOutline />}
          >
            <input
              type="text"
              placeholder="(11) 99999-9999"
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
          </Field>

          {/* PIX */}
          <Field
            label="Chave PIX"
            icon={<IoWalletOutline />}
          >
            <input
              type="text"
              placeholder="CPF, Email, Telefone ou Chave Aleatória"
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
          </Field>

          {/* SENHA */}
          <Field
            label="Senha"
            icon={<IoLockClosedOutline />}
          >
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
                placeholder="Mínimo 6 caracteres"
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
          </Field>

          {/* CONFIRMAR SENHA */}
          <Field
            label="Confirmar Senha"
            icon={<IoShieldCheckmarkOutline />}
          >
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
                placeholder="Digite sua senha novamente"
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
          </Field>

          {/* TERMOS */}
          <div className="mb-6 flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#007ACC]"
            />

            <p className="text-sm text-[#a0a0b8]">
              Concordo com os{" "}
              <span className="text-[#007ACC]">
                Termos de Uso
              </span>{" "}
              e{" "}
              <span className="text-[#007ACC]">
                Política de Privacidade
              </span>
            </p>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="
              flex w-full items-center
              justify-center gap-2
              rounded-xl bg-[#007ACC]
              p-4 font-bold text-white
              transition
              hover:brightness-110
            "
          >
            <IoCheckmarkCircleOutline size={20} />
            Criar Conta
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

        {/* GOOGLE */}
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

        {/* LOGIN */}
        <div className="text-center">
          <span className="text-[#a0a0b8]">
            Já possui uma conta?
          </span>

          <a
            href="#"
            className="ml-1 font-bold text-[#007ACC]"
          >
            Entrar
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[#007ACC]">
          {icon}
        </span>

        <label className="text-sm font-medium text-white">
          {label}
        </label>
      </div>

      {children}
    </div>
  );
}