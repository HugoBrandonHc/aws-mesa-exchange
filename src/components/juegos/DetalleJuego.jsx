import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import '../../assets/styles/DetalleJuego.css'; // Asegúrate de tener estilos separados

function DetalleJuego() {
  const { id } = useParams(); // Obtén el ID del juego desde la URL
  const navigate = useNavigate();
  const [juego, setJuego] = useState(null); // Almacena los datos del juego
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const [error, setError] = useState(null);

  // Datos simulados (mover a un archivo separado si es necesario)
  const fetchGameById = async (gameId) => {
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

    if (parseInt(gameId, 10) === exampleGame.id) {
      return exampleGame;
    } else {
      throw new Error("El juego solicitado no existe.");
    }
  };

  // Verifica si el usuario está autenticado
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

  // Carga los datos del juego
  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const game = await fetchGameById(id);
        setJuego(game);
      } catch (err) {
        console.error("Error al cargar el juego:", err);
        setError(err.message || "Hubo un problema al cargar el juego.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/catalogo" className="btn">Volver al Catálogo</Link>
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
            <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
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
