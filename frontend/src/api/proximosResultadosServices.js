import axios from "axios";

const API_URL = "http://localhost:3000/proximos-resultados";

export async function listarProximosResultados() {
  const response = await axios.get(API_URL);
  return response.data;
}