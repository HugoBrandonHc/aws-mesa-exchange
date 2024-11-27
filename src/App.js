import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import SubirJuego from './components/juegos/SubirJuego';
import Catalogo from './components/juegos/Catalogo';
import DetalleJuego from './components/juegos/DetalleJuego';
import TerminosCondiciones from './components/informativos/TerminosCondiciones';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/detalle/:id" element={<DetalleJuego />} />
        <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />

        {/* Rutas sin protección */}
        <Route path="/subir-juego" element={<SubirJuego />} />
        <Route path="/catalogo" element={<Catalogo />} />

        {/* Página no encontrada */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
