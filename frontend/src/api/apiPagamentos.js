import api from "./api";


export async function criarPagamentoPix(dados) {

    const { data } = await api.post(
        "/pagamentos/pix",
        dados
    );

    return data;

}



export async function consultarPagamento(id) {

    const { data } = await api.get(
        `/pagamentos/${id}`
    );

    return data;

}