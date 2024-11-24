import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import SubirJuego from './components/juegos/SubirJuego';
import Catalogo from './components/juegos/Catalogo';
import DetalleJuego from './components/juegos/DetalleJuego';
import TerminosCondiciones from './components/informativos/TerminosCondiciones';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/subir-juego" element={<SubirJuego />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/detalle/:id" element={<DetalleJuego />} />
        <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />


      </Routes>
    </Router>
  );
}

export default App;
