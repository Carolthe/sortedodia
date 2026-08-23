import api from "./api";

export async function criarAposta(dados) {
    const resposta = await api.post("/apostas", dados);
    return resposta.data;
}

export async function buscarMinhasApostas() {
    const resposta = await api.get("/apostas/minhas");
    return resposta.data;
}