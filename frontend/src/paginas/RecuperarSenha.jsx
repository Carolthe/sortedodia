import { useState } from "react";
import {
  IoArrowBack,
  IoMailOutline,
  IoKeypadOutline,
  IoLockOpenOutline,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { Link } from "react-router-dom";

export default function RecuperarSenha() {
  const [etapa, setEtapa] = useState("email");

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-8 px-5">
      <div className="mx-auto max-w-md">

        {/* VOLTAR */}
        {etapa !== "sucesso" && (
          <Link to="/login">
          <button
            onClick={() =>
              etapa === "codigo"
                ? setEtapa("email")
                : etapa === "nova-senha"
                ? setEtapa("codigo")
                : null
            }
            className="
              mb-6 flex items-center gap-2
              rounded-xl border border-[#dbe3f0]
              bg-white px-4 py-2
              text-[#062272]
              shadow-sm
            "
          >
            <IoArrowBack />
            Voltar
          </button>
          </Link>
        )}

        {/* CARD */}
        <div className="rounded-3xl border border-[#e5eaf3] bg-white p-8 shadow-xl">

          {/* STEPPER */}
          {etapa !== "sucesso" && (
            <div className="mb-8 flex items-center justify-center">
              {["email", "codigo", "nova-senha"].map((item, index) => {
                const atual = ["email", "codigo", "nova-senha"].indexOf(
                  etapa
                );

                return (
                  <div
                    key={item}
                    className="flex items-center"
                  >
                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
                        ${
                          index <= atual
                            ? "bg-[#062272] text-white"
                            : "bg-slate-200 text-slate-500"
                        }
                      `}
                    >
                      {index + 1}
                    </div>

                    {index < 2 && (
                      <div className="mx-2 h-[2px] w-10 bg-slate-300" />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ETAPA EMAIL */}
          {etapa === "email" && (
            <>
              <Header
                icon={<IoMailOutline size={30} />}
                title="Recuperar Senha"
                subtitle="Informe o email cadastrado."
              />

              <Field
                label="Email"
                icon={<IoMailOutline />}
              >
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-[#062272]"
                />
              </Field>

              <button
                onClick={() => setEtapa("codigo")}
                className="
                  mt-4 w-full rounded-xl
                  bg-[#062272]
                  p-4 font-bold text-white
                "
              >
                Enviar código
              </button>
            </>
          )}

          {/* ETAPA CÓDIGO */}
          {etapa === "codigo" && (
            <>
              <Header
                icon={<IoKeypadOutline size={30} />}
                title="Digite o Código"
                subtitle="Digite o código recebido."
              />

              <Field
                label="Código"
                icon={<IoKeypadOutline />}
              >
                <input
                  type="text"
                  placeholder="000000"
                  className="
                    w-full rounded-xl
                    border border-slate-300
                    p-4 text-center text-2xl
                    font-bold tracking-[8px]
                  "
                />
              </Field>

              <button
                onClick={() => setEtapa("nova-senha")}
                className="
                  mt-4 w-full rounded-xl
                  bg-[#062272]
                  p-4 font-bold text-white
                "
              >
                Validar código
              </button>
            </>
          )}

          {/* ETAPA NOVA SENHA */}
          {etapa === "nova-senha" && (
            <>
              <Header
                icon={<IoLockOpenOutline size={30} />}
                title="Nova Senha"
                subtitle="Crie sua nova senha."
              />

              <Field
                label="Nova senha"
                icon={<IoLockClosedOutline />}
              >
                <div className="flex rounded-xl border border-slate-300">
                  <input
                    type="password"
                    placeholder="Nova senha"
                    className="flex-1 p-4 outline-none"
                  />

                  <button className="px-4">
                    <IoEyeOutline />
                  </button>
                </div>
              </Field>

              <Field
                label="Confirmar senha"
                icon={<IoShieldCheckmarkOutline />}
              >
                <div className="flex rounded-xl border border-slate-300">
                  <input
                    type="password"
                    placeholder="Confirmar senha"
                    className="flex-1 p-4 outline-none"
                  />

                  <button className="px-4">
                    <IoEyeOutline />
                  </button>
                </div>
              </Field>

              <button
                onClick={() => setEtapa("sucesso")}
                className="
                  mt-4 w-full rounded-xl
                  bg-[#062272]
                  p-4 font-bold text-white
                "
              >
                Salvar nova senha
              </button>
            </>
          )}

          {/* SUCESSO */}
          {etapa === "sucesso" && (
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <IoCheckmarkCircle
                  size={80}
                  className="text-green-500"
                />
              </div>

              <h2 className="mb-2 text-3xl font-bold text-[#062272]">
                Senha redefinida!
              </h2>

              <p className="mb-6 text-slate-500">
                Sua senha foi alterada com sucesso.
              </p>

              <button
                className="
                  w-full rounded-xl
                  bg-[#062272]
                  p-4 font-bold text-white
                "
              >
                Ir para Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function Header({ icon, title, subtitle }) {
  return (
    <div className="mb-8 text-center">
      <div
        className="
          mx-auto mb-4 flex h-20 w-20
          items-center justify-center
          rounded-2xl
          bg-[#062272]
          text-white
        "
      >
        {icon}
      </div>

      <h1 className="text-3xl font-bold text-[#062272]">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2 text-[#062272]">
        {icon}
        <label className="font-medium">
          {label}
        </label>
      </div>

      {children}
    </div>
  );
}