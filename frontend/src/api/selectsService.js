import api from "./api";

export async function buscarSelects() {
    const response = await api.get("/selects");
    return response.data;
}