import api from "./api";

export async function enviarCodigo(email) {
    const { data } = await api.post("/usuarios/esqueci-senha", {
        email
    });

    return data;
}

export async function validarCodigo(email, codigo) {
    const { data } = await api.post("/usuarios/validar-codigo", {
        email,
        codigo
    });

    return data;
}

export async function redefinirSenha(email, codigo, senha) {
    const { data } = await api.post("/usuarios/redefinir-senha", {
        email,
        codigo,
        senha
    });

    return data;
}