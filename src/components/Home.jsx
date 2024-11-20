// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      nombre: "Catan",
      descripcion: "Juego de mesa estratégico...",
      condicion: "Usado",
      calidad: "8/10",
      precio: "$30",
      imagen: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      categoria: "Estrategia",
      tipo: "Intercambio",
    },
    {
      id: 2,
      nombre: "Ticket to Ride",
      descripcion: "Juego de trenes...",
      condicion: "Nuevo",
      calidad: null,
      precio: "$40",
      imagen: "https://cdn.hashnode.com/res/hashnode/image/unsplash/FdTmaUlEr4A/upload/v1650335231394/MCTIII0fU.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
      categoria: "Familiar",
      tipo: "Venta",
    },
    // Otros juegos aquí
  ];

  const handleVerMasClick = (id) => {
    navigate(`/detalle/${id}`);
  };

  return (
    <div>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li><a href="/#">Inicio</a></li>
              <li><a href="/catalogo">Catálogo</a></li>
              <li><a href="/subir-juego">Subir Juego</a></li>
              <li><a href="/login">Iniciar Sesión</a></li>
              <li><a href="/register">Registro</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Bienvenido a MercadilloACLP</h1>
          </div>
        </section>

        <div className="container">
          <section className="slogan">
            <div className="slogan-item">
              <h2>Intercambia</h2>
              <p>Cambia tus juegos por otros que te interesen</p>
            </div>
            <div className="slogan-item">
              <h2>Vende</h2>
              <p>Pon a la venta los juegos que ya no uses</p>
            </div>
            <div className="slogan-item">
              <h2>Descubre</h2>
              <p>Encuentra nuevos juegos para tu colección</p>
            </div>
          </section>

          <section className="recent-games">
            <h2>Juegos Recientes</h2>
            <div className="game-grid">
              {games.map((game) => (
                <div className="game-card" key={game.id}>
                  <img src={game.imagen} alt={game.nombre} />
                  <div className="game-card-content">
                    <h3>{game.nombre}</h3>
                    <p>{game.tipo} - {game.condicion} {game.calidad && `(${game.calidad})`}</p>
                    <button onClick={() => handleVerMasClick(game.id)} className="btn">Ver Más</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 MercadilloACLP. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
