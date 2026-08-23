import api from "./api"; // mesma instância axios usada no projeto

export async function listarResultados() {
  const { data } = await api.get("/resultados");
  return data;
}