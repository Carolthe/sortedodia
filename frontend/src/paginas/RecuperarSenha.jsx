import { useState } from "react";
import {
  IoArrowBack,
  IoMailOutline,
  IoKeypadOutline,
  IoLockOpenOutline,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

import {
  enviarCodigo,
  validarCodigo,
  redefinirSenha,
} from "../api/apiRecuperacao";

export default function RecuperarSenha() {

  const navigate = useNavigate();

  const [etapa, setEtapa] = useState("email");

  const [email, setEmail] = useState("");

  const [codigo, setCodigo] = useState("");

  const [senha, setSenha] = useState("");

  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [carregando, setCarregando] = useState(false);

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  async function handleEnviarCodigo() {

    if (!email) {

      alert("Informe seu e-mail.");

      return;

    }

    try {

      setCarregando(true);

      await enviarCodigo(email);

      alert("Código enviado para seu e-mail.");

      setEtapa("codigo");

    } catch (erro) {

      console.error(erro);

      alert("Erro ao enviar o código.");

    } finally {

      setCarregando(false);

    }

  }

  async function handleValidarCodigo() {

    if (!codigo) {

      alert("Digite o código.");

      return;

    }

    try {

      setCarregando(true);

      await validarCodigo(email, codigo);

      setEtapa("nova-senha");

    } catch (erro) {

      console.error(erro);

      alert("Código inválido ou expirado.");

    } finally {

      setCarregando(false);

    }

  }

  async function handleRedefinirSenha() {

    if (!senha || !confirmarSenha) {

      alert("Preencha todos os campos.");

      return;

    }

    if (senha !== confirmarSenha) {

      alert("As senhas não coincidem.");

      return;

    }

    if (senha.length < 6) {

      alert("A senha deve possuir pelo menos 6 caracteres.");

      return;

    }

    try {

      setCarregando(true);

      await redefinirSenha(

        email,

        codigo,

        senha

      );

      setEtapa("sucesso");

    } catch (erro) {

      console.error(erro);

      alert("Erro ao redefinir a senha.");

    } finally {

      setCarregando(false);

    }

  }

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

      <div className="rounded-3xl border border-[#e5eaf3] bg-white p-8 shadow-xl">

        {/* STEPPER */}
        {etapa !== "sucesso" && (

          <div className="mb-8 flex items-center justify-center">

            {["email", "codigo", "nova-senha"].map((item, index) => {

              const atual =

                ["email", "codigo", "nova-senha"]

                  .indexOf(etapa);

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

        {/* EMAIL */}
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

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

                placeholder="seu@email.com"

                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  p-4
                  outline-none
                  focus:border-[#062272]
                "

              />

            </Field>

            <button

              onClick={handleEnviarCodigo}

              disabled={carregando}

              className="
                mt-4
                w-full
                rounded-xl
                bg-[#062272]
                p-4
                font-bold
                text-white
                disabled:opacity-50
              "

            >

              {

                carregando

                ? "Enviando..."

                : "Enviar código"

              }

            </button>

          </>

        )}

        {/* CÓDIGO */}
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

                value={codigo}

                onChange={(e)=>setCodigo(e.target.value)}

                placeholder="000000"

                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  p-4
                  text-center
                  text-2xl
                  font-bold
                  tracking-[8px]
                "

              />

            </Field>

            <button

              onClick={handleValidarCodigo}

              disabled={carregando}

              className="
                mt-4
                w-full
                rounded-xl
                bg-[#062272]
                p-4
                font-bold
                text-white
                disabled:opacity-50
              "

            >

              {

                carregando

                ? "Validando..."

                : "Validar código"

              }

            </button>

          </>

        )}

        {/* NOVA SENHA */}
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

                  type={

                    mostrarSenha

                    ? "text"

                    : "password"

                  }

                  value={senha}

                  onChange={(e)=>setSenha(e.target.value)}

                  placeholder="Nova senha"

                  className="flex-1 p-4 outline-none"

                />

                <button

                  type="button"

                  onClick={()=>

                    setMostrarSenha(

                      !mostrarSenha

                    )

                  }

                  className="px-4"

                >

                  {

                    mostrarSenha

                    ? <IoEyeOffOutline />

                    : <IoEyeOutline />

                  }

                </button>

              </div>

            </Field>

            <Field

              label="Confirmar senha"

              icon={<IoShieldCheckmarkOutline />}

            >

              <div className="flex rounded-xl border border-slate-300">

                <input

                  type={

                    mostrarConfirmarSenha

                    ? "text"

                    : "password"

                  }

                  value={confirmarSenha}

                  onChange={(e)=>

                    setConfirmarSenha(

                      e.target.value

                    )

                  }

                  placeholder="Confirmar senha"

                  className="flex-1 p-4 outline-none"

                />

                <button

                  type="button"

                  onClick={()=>

                    setMostrarConfirmarSenha(

                      !mostrarConfirmarSenha

                    )

                  }

                  className="px-4"

                >

                  {

                    mostrarConfirmarSenha

                    ? <IoEyeOffOutline />

                    : <IoEyeOutline />

                  }

                </button>

              </div>

            </Field>

            <button

              onClick={handleRedefinirSenha}

              disabled={carregando}

              className="
                mt-4
                w-full
                rounded-xl
                bg-[#062272]
                p-4
                font-bold
                text-white
                disabled:opacity-50
              "

            >

              {

                carregando

                ? "Salvando..."

                : "Salvar nova senha"

              }

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

              onClick={() => navigate("/login")}

              className="
                w-full
                rounded-xl
                bg-[#062272]
                p-4
                font-bold
                text-white
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
          mx-auto
          mb-4
          flex
          h-20
          w-20
          items-center
          justify-center
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