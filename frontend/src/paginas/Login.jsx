import {
  IoArrowBack,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoLogInOutline,
} from "react-icons/io5";

import Header from "../components/Header";
import { loginUsuario } from "../api/usuariosServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erroLogin, setErroLogin] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpa a mensagem quando o usuário começar a corrigir
    if (erroLogin) {
      setErroLogin("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Não permite enviar novamente enquanto estiver carregando
    if (carregando) {
      return;
    }

    setErroLogin("");
    setCarregando(true);

    try {
      const resposta = await loginUsuario(form);

      /*
       * IMPORTANTE:
       * Só consideramos login válido se a API devolver um token.
       */

      if (!resposta || !resposta.token) {
        setErroLogin("Email ou senha incorretos.");
        return;
      }

      // Salva o token
      localStorage.setItem(
        "token",
        resposta.token
      );

      // Salva os dados do usuário
      if (resposta.usuario) {
        localStorage.setItem(
          "usuario",
          JSON.stringify(resposta.usuario)
        );
      }

      /*
       * Só chega aqui quando o login foi realmente realizado.
       *
       * Se o login estiver errado, o código cai no catch
       * e permanece nesta mesma página.
       */
      navigate("/");

    } catch (erro) {
      console.error("Erro no login:", erro);

      /*
       * QUALQUER ERRO DA API DE LOGIN
       * mantém o usuário nesta página.
       */

      setErroLogin(
        erro?.response?.data?.erro ||
        erro?.response?.data?.message ||
        "Email ou senha incorretos."
      );

      // NÃO usar navigate aqui.
      // NÃO usar window.location aqui.
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <Header />

      <div className="mt-[22px] bg-[#F4F9FD] px-5 flex items-center justify-center">

        <div className="w-full max-w-md">

          {/* VOLTAR */}
          <Link to="/">
            <button
              type="button"
              className="
                mb-6
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#dbe3f0]
                bg-white
                px-4
                py-2
                text-[#062272]
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >
              <IoArrowBack size={18} />
              Voltar
            </button>
          </Link>

          {/* CARD */}
          <div
            className="
              rounded-3xl
              border
              border-[#e5eaf3]
              bg-white
              p-8
              shadow-xl
            "
          >

            {/* TOPO */}
            <div className="mb-8 text-center">

              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-13
                  w-13
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#062272]
                  shadow-lg
                "
              >
                <IoPersonCircleOutline
                  size={28}
                  color="white"
                />
              </div>

              <h1
                className="
                  mb-2
                  text-[22px]
                  font-bold
                  text-[#062272]
                "
              >
                Entrar
              </h1>

              <p className="text-sm text-slate-500">
                Digite suas credenciais para acessar sua conta
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
            >

              {/* EMAIL */}
              <div className="mb-5">

                <div className="mb-2 flex items-center gap-2">

                  <IoPersonOutline
                    size={16}
                    className="text-[#062272]"
                  />

                  <label
                    htmlFor="email"
                    className="
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    Email
                  </label>

                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="Seu email"
                  required
                  disabled={carregando}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#dbe3f0]
                    bg-white
                    p-4
                    text-slate-800
                    shadow-sm
                    outline-none
                    transition
                    focus:border-[#062272]
                    focus:ring-2
                    focus:ring-[#062272]/20
                    disabled:bg-slate-50
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

                  <label
                    htmlFor="senha"
                    className="
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    Senha
                  </label>

                </div>

                <div
                  className="
                    flex
                    items-center
                    rounded-xl
                    border
                    border-[#dbe3f0]
                    bg-white
                    shadow-sm
                    focus-within:border-[#062272]
                    focus-within:ring-2
                    focus-within:ring-[#062272]/20
                  "
                >

                  <input
                    id="senha"
                    type={
                      mostrarSenha
                        ? "text"
                        : "password"
                    }
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Digite sua senha"
                    required
                    disabled={carregando}
                    className="
                      flex-1
                      bg-transparent
                      p-4
                      text-slate-800
                      outline-none
                      disabled:bg-slate-50
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setMostrarSenha((prev) => !prev)
                    }
                    disabled={carregando}
                    className="
                      px-4
                      py-4
                      disabled:opacity-50
                    "
                    aria-label={
                      mostrarSenha
                        ? "Ocultar senha"
                        : "Mostrar senha"
                    }
                  >

                    {mostrarSenha ? (
                      <IoEyeOffOutline
                        size={20}
                        className="text-slate-500"
                      />
                    ) : (
                      <IoEyeOutline
                        size={20}
                        className="text-slate-500"
                      />
                    )}

                  </button>

                </div>

              </div>

              {/* OPÇÕES */}
              <div
                className="
                  mb-6
                  flex
                  items-center
                  justify-between
                "
              >

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-600
                  "
                >

                  <input
                    type="checkbox"
                    className="accent-[#062272]"
                  />

                  Lembrar-me

                </label>

                <Link
                  to="/recuperarsenha"
                  className="
                    text-sm
                    font-medium
                    text-[#062272]
                    hover:underline
                  "
                >
                  Esqueceu a senha?
                </Link>

              </div>

              {/* ERRO */}
              {erroLogin && (
                <p
                  role="alert"
                  className="
                    mb-4
                    text-center
                    text-sm
                    font-semibold
                    text-red-500
                  "
                >
                  {erroLogin}
                </p>
              )}

              {/* BOTÃO */}
              <button
                type="submit"
                disabled={carregando}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#062272]
                  p-4
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-[#0a318f]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <IoLogInOutline size={20} />

                {carregando
                  ? "Entrando..."
                  : "Entrar"
                }

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

            {/* CADASTRO */}
            <div className="text-center">

              <span className="text-slate-500">
                Não possui uma conta?
              </span>

              <Link
                to="/criarconta"
                className="
                  ml-1
                  font-bold
                  text-[#062272]
                  hover:underline
                "
              >
                Criar conta
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}