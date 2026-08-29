import {
  IoArrowBack,
  IoPersonAdd,
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import Header from "../components/Header";
import { useState } from "react";
import { cadastrarUsuario } from "../api/usuariosServices";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
//import api from "../api/api"

export default function CriarConta() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {

      const resposta = await cadastrarUsuario({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        senha: form.senha,
      });

      alert(resposta.mensagem);

      navigate("/login");

    } catch (erro) {

      alert(
        erro.response?.data?.erro ||
        "Erro ao cadastrar"
      );

    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#F4F9FD] px-5 py-6">
        <div className="mx-auto max-w-lg">

          {/* VOLTAR */}
          <Link to="/login" >
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
          {/* CARD */}
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-[#e5eaf3]">

            {/* HEADER */}
            <div className="mb-8 text-center">
              <div
                className="
                mx-auto mb-4 flex h-13 w-13
                items-center justify-center
                rounded-2xl
                bg-[#062272]
                shadow-lg
              "
              >
                <IoPersonAdd
                  size={22}
                  color="white"
                />
              </div>

              <h1 className="text-[22px] font-bold text-[#062272]">
                Criar Conta
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Preencha seus dados para se cadastrar
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} >

              <Field
                label="Nome Completo"
                icon={<IoPersonOutline />}
              >
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  type="text"
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
              </Field>

              <Field
                label="Email"
                icon={<IoMailOutline />}
              >
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
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
              </Field>

              <Field
                label="Telefone"
                icon={<IoCallOutline />}
              >
                <input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  type="number"
                  placeholder="(11) 99999-9999"
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
                  border border-[#dbe3f0]
                  bg-white
                  shadow-sm
                  focus-within:border-[#062272]
                  focus-within:ring-2
                  focus-within:ring-[#062272]/20
                "
                >
                  <input
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    className="
                    flex-1 bg-transparent
                    p-4 text-slate-800
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
                  border border-[#dbe3f0]
                  bg-white
                  shadow-sm
                  focus-within:border-[#062272]
                  focus-within:ring-2
                  focus-within:ring-[#062272]/20
                "
                >
                  <input
                    name="confirmarSenha"
                    value={form.confirmarSenha}
                    onChange={handleChange}
                    type="password"
                    placeholder="Digite sua senha novamente"
                    className="
                    flex-1 bg-transparent
                    p-4 text-slate-800
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
              </Field>

              {/* TERMOS */}
              <div className="mb-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 accent-[#062272]"
                />

                <p className="text-sm text-slate-500">
                  Concordo com os{" "}
                  <span className="font-medium text-[#062272]">
                    Termos de Uso
                  </span>{" "}
                  e{" "}
                  <span className="font-medium text-[#062272]">
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
                <IoCheckmarkCircleOutline size={20} />
                Criar Conta
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

            {/* GOOGLE */}
            {/* <GoogleLogin
              onSuccess={async (credentialResponse) => {

                const resposta = await api.post("/usuarios/login-google", {
                  credential: credentialResponse.credential
                });

                localStorage.setItem("token", resposta.data.token);

                localStorage.setItem(
                  "usuario",
                  JSON.stringify(resposta.data.usuario)
                );

                window.location.href = "/";
              }}

              onError={() => alert("Erro ao entrar com Google")}
            /> */}

            {/* LOGIN */}
            <div className="text-center">
              <span className="text-slate-500">
                Já possui uma conta?
              </span>

              <Link to="/login">
                <p
                  className="ml-1 font-bold text-[#062272] hover:underline"
                >
                  Entrar
                </p>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[#062272] text-lg">
          {icon}
        </span>

        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      </div>

      {children}
    </div>

  );
}