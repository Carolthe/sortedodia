import api from "./api";

export async function buscarCotacoes() {

    const { data } = await api.get("/cotacoes");

    return data;

}

export async function calcularCotacao(dados) {

    const { data } = await api.post(

        "/cotacoes/calcular",

        dados

    );

    return data;

}