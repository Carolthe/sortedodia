import api from "./api"; // mesma instância axios usada no projeto

export async function listarProximosResultados() {
  const { data } = await api.get("/proximos-resultados");

  return data;
}