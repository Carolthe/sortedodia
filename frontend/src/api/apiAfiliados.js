import api from "./api";

export async function cadastrarAfiliado(dados) {
  const { data } = await api.post("/afiliados", dados);
  return data;
}