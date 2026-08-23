import { useContext } from "react";
import { UsuarioContext } from "./UsuarioContext";

export function useUsuario() {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error("useUsuario deve ser usado dentro de um UsuarioProvider");
  }

  return context;
}