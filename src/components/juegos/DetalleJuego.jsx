// src/components/DetalleJuego.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
// DetalleJuego.jsx
import '../../assets/styles/DetalleJuego.css';


function DetalleJuego() {
  const { id } = useParams(); // Obtén el ID del juego desde la URL
  const navigate = useNavigate();
  const [juego, setJuego] = useState(null); // Almacena los datos del juego
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Simula una autenticación antes de cargar la página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Amplify.Auth.currentAuthenticatedUser();
      } catch (err) {
        console.error("Usuario no autenticado, redirigiendo a Login...");
        navigate('/login'); // Redirige al login si no está autenticado
      }
    };
    checkAuth();
  }, [navigate]);

  // Simula la carga de datos (en producción, obtén datos del backend o API)
  useEffect(() => {
    const fetchGame = async () => {
      try {
        // Simulación de datos dinámicos basados en el ID
        const exampleGame = {
          id: 1,
          nombre: "Ticket to Ride",
          descripcion: "Ticket to Ride es un juego de mesa de estrategia donde los jugadores compiten por conectar rutas ferroviarias a través de América del Norte.",
          condicion: "Usado",
          calidad: "8/10",
          precio: "$30",
          imagen: "https://via.placeholder.com/500x500.png?text=Ticket+to+Ride",
          categoria: "Estrategia",
          tipo: "Venta",
          vendedor: {
            nombre: "Juan Pérez",
            email: "juan.perez@email.com",
            telefono: "+34 123 456 789",
          },
        };

        // Simula la búsqueda por ID
        if (parseInt(id, 10) === exampleGame.id) {
          setJuego(exampleGame);
        } else {
          setError("El juego solicitado no existe.");
        }
      } catch (err) {
        console.error("Error al cargar el juego:", err);
        setError("Hubo un problema al cargar el juego.");
      }
    };

    fetchGame();
  }, [id]);

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/catalogo" className="btn">Volver al Catálogo</Link>
      </div>
    );
  }

  if (!juego) {
    return (
      <div className="container">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/subir-juego">Subir Juego</Link></li>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container">
        <h1>{juego.nombre}</h1>
        <div className="game-details">
          <div className="game-image">
            <img src={juego.imagen} alt={juego.nombre} />
          </div>
          <div className="game-info">
            <h2>Descripción</h2>
            <p>{juego.descripcion}</p>
            <p><strong>Condición:</strong> {juego.condicion}</p>
            <p><strong>Calidad:</strong> {juego.calidad}</p>
            <p><strong>Precio:</strong> {juego.precio}</p>
            <p><strong>Categoría:</strong> {juego.categoria}</p>
            <p><strong>Tipo:</strong> {juego.tipo}</p>
            <button onClick={() => setShowModal(true)} className="btn">Poner en contacto</button>
          </div>
        </div>
      </main>

      {/* Modal para mostrar información del vendedor */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Datos del vendedor</h2>
            <p><strong>Nombre:</strong> {juego.vendedor.nombre}</p>
            <p><strong>Email:</strong> {juego.vendedor.email}</p>
            <p><strong>Teléfono:</strong> {juego.vendedor.telefono}</p>
          </div>
        </div>
      )}

      <footer>
        <div className="container">
          <p>&copy; 2024 MercadilloACLP. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default DetalleJuego;
