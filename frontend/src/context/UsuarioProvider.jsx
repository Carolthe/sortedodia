import { useEffect, useState } from "react";
import api from "../api/api";
import { UsuarioContext } from "./UsuarioContext";


export function UsuarioProvider({ children }) {

    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);


    async function atualizarUsuario() {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                setUsuario(null);

                return;

            }


            const { data } = await api.get("/usuarios/me");


            setUsuario(data);


            localStorage.setItem(
                "usuario",
                JSON.stringify(data)
            );


        } catch (erro) {

            console.error(
                "Erro ao buscar usuário:",
                erro
            );

            setUsuario(null);

        }

    }


    useEffect(() => {

        async function carregarUsuario(){

            await atualizarUsuario();

            setCarregando(false);

        }


        carregarUsuario();


    }, []);



    return (

        <UsuarioContext.Provider
            value={{
                usuario,
                setUsuario,
                atualizarUsuario,
                carregando
            }}
        >

            {children}

        </UsuarioContext.Provider>

    );

}