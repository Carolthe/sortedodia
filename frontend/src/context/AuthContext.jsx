// import { createContext, useContext, useState, useEffect, useRef } from "react";
// import Cookies from "js-cookie";

// const AuthContext = createContext({});

// const TOKEN_KEY = "sortepremiada_token";
// const USER_KEY = "sortepremiada_user";

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const tokenRef = useRef(null);

//   useEffect(() => {
//     try {
//       const tokenSalvo = Cookies.get(TOKEN_KEY);
//       const userSalvo = localStorage.getItem(USER_KEY);

//       if (tokenSalvo && userSalvo) {
//         tokenRef.current = tokenSalvo;
//         setUser(JSON.parse(userSalvo));
//       }
//     } catch (e) {
//       console.warn("Erro ao recuperar sessão:", e);
//     } finally {
//       setCarregando(false);
//     }
//   }, []);

//   const login = (usuario, token) => {
//     tokenRef.current = token;
//     setUser(usuario);

//     try {
//       Cookies.set(TOKEN_KEY, token, {
//         expires: 7, // 7 dias
//         secure: true, // HTTPS
//         sameSite: "Strict",
//       });

//       localStorage.setItem(USER_KEY, JSON.stringify(usuario));
//     } catch (e) {
//       console.warn("Erro ao salvar sessão:", e);
//     }
//   };

//   const logout = () => {
//     tokenRef.current = null;
//     setUser(null);

//     try {
//       Cookies.remove(TOKEN_KEY);

//       localStorage.removeItem(USER_KEY);
//     } catch (e) {
//       console.warn("Erro ao limpar sessão:", e);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         carregando,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }