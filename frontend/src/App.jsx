import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./paginas/Home"
import Jogo from "./paginas/Jogo"
import Resultados from "./paginas/Resultados";
import Cotacao from "./paginas/Cotacao";
// import Saque from "./paginas/Saque";
import ProximosResultados from "./paginas/ProximosResultado";
import Pix from "./paginas/Pix";
import Afiliados from "./paginas/Afiliados";
import Login from "./paginas/Login";
import CriarConta from "./paginas/CriarConta"
import RecuperarSenha from "./paginas/RecuperarSenha";
import Carteira from "./paginas/Carteira";
import MinhasApostas from "./paginas/MinhasApostas";
import { UsuarioProvider } from "./context/UsuarioProvider";
function App() {

  return (
    <UsuarioProvider>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/criarconta" element={<CriarConta/>} />
        <Route path="/jogo" element={<Jogo />} />
        <Route path="/resultados" element={<Resultados />} />
         <Route path="/cotacao" element={<Cotacao />} />
        {/* <Route path="/saque" element={<Saque/>} /> */}
        <Route path="/horario" element={<ProximosResultados/>} />
        <Route path="/pix" element={<Pix/>} />
        <Route path="/afiliado" element={<Afiliados/>} />
        <Route path="/recuperarsenha" element={<RecuperarSenha/>} />
        <Route path="/carteira" element={<Carteira />} />
        <Route path="/minhasapostas" element={<MinhasApostas />} /> 
      </Routes>
    </BrowserRouter>
    </UsuarioProvider>
  )
}

export default App