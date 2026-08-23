import { useState, useEffect, useCallback } from "react";
import { UsuarioContext } from "./UsuarioContext";
import api from "../api/api";

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const atualizarUsuario = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUsuario(null);
      setCarregando(false);
      return;
    }

    try {
      const { data } = await api.get("/usuarios/me");
      setUsuario(data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  }, []);

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    atualizarUsuario();
}, [atualizarUsuario]);

  function logout() {
    localStorage.removeItem("token");
    setUsuario(null);
  }

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, atualizarUsuario, logout, carregando }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}