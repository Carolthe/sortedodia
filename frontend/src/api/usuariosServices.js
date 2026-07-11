import api from "./api";

export const cadastrarUsuario = async (dados) => {
    const response = await api.post("/usuarios/cadastro", dados);
    return response.data;
};

export const loginUsuario = async (dados) => {
    const response = await api.post("/usuarios/login", dados);
    return response.data;
};