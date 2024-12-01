import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Catalogo.css';

function Catalogo() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simula la carga de juegos desde la API REST
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://tu-api-url/games'); // Reemplaza con la URL correcta de tu API
        const data = await response.json();
        setGames(data);
      } catch (err) {
        console.error("Error al cargar juegos:", err);
        setError("No se pudieron cargar los juegos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Funciones de filtro
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleTypeChange = (e) => setTypeFilter(e.target.value);
  const handleConditionChange = (e) => setConditionFilter(e.target.value);

  // Filtrar juegos según los criterios de búsqueda y filtro
  const filteredGames = games.filter((game) => 
    game.title.toLowerCase().includes(search.toLowerCase()) &&
    (typeFilter ? game.tradeType === typeFilter : true) &&
    (conditionFilter ? game.condition.includes(conditionFilter) : true)
  );

  // Si está cargando
  if (loading) {
    return (
      <div className="container">
        <h1>Cargando catálogo...</h1>
      </div>
    );
  }

  // Si hay un error al cargar
  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/" className="btn">Volver al inicio</Link>
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

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Catálogo de Juegos</h1>
          </div>
        </section>

        {/* Controles de Filtro */}
        <div className="filters">
          <input 
            type="text" 
            placeholder="Buscar por nombre" 
            value={search} 
            onChange={handleSearchChange} 
          />
          <select value={typeFilter} onChange={handleTypeChange}>
            <option value="">Filtrar por tipo</option>
            <option value="Intercambio">Intercambio</option>
            <option value="Venta">Venta</option>
          </select>
          <select value={conditionFilter} onChange={handleConditionChange}>
            <option value="">Filtrar por condición</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        {/* Lista de Juegos */}
        <div className="game-grid">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div className="game-card" key={game.gameID}>
                <img src={game.imageUrl} alt={`${game.title} - ${game.tradeType}`} />
                <div className="game-card-content">
                  <h3>{game.title}</h3>
                  <p>{game.tradeType} - {game.condition}</p>
                  <Link to={`/detalle/${game.gameID}`} className="btn">Ver Detalles</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron juegos con los filtros aplicados.</p>
          )}
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

export default Catalogo;
