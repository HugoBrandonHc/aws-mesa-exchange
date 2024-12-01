import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/SubirJuego.css';

function SubirJuego() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [condicion, setCondicion] = useState('');
  const [calidad, setCalidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 3) {
      alert('Solo puedes subir un máximo de 3 imágenes.');
      return;
    }
    setImagenes(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Verificar que todos los campos estén completos
    if (!nombre || !descripcion || !condicion || !precio || !categoria || !tipo) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Crear un objeto con los datos del juego
      const juegoData = {
        gameID: Math.random().toString(36).substr(2, 9), // Generar un ID único para el juego
        title: nombre,
        description: descripcion,
        price: precio,
        imageUrl: imagenes[0] ? imagenes[0].name : '',  // Si tienes imágenes, agrega una URL
        createdAt: new Date().toISOString(),
        condition: condicion,
        quality: calidad || 'N/A',  // Solo si el juego es usado
        category: categoria,
        tradeType: tipo
      };

      // Llamar a la API REST para subir el juego
      const response = await fetch('https://tu-api-url/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juegoData),  // Enviar los datos del juego como JSON
      });

      if (response.ok) {
        alert("¡Juego subido correctamente!");
        navigate('/catalogo'); // Redirige al catálogo después de subir el juego
      } else {
        throw new Error('Error al subir el juego');
      }
    } catch (err) {
      console.error("Error al subir el juego:", err);
      setError("Hubo un problema al subir el juego. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/catalogo">Catálogo</a></li>
              <li><a href="/subir-juego">Subir Juego</a></li>
              <li><a href="/login">Iniciar Sesión</a></li>
              <li><a href="/register">Registro</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <h1>Subir Juego</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre del Juego</label>
              <input
                type="text"
                id="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="condition">Condición</label>
              <select
                id="condition"
                value={condicion}
                onChange={(e) => setCondicion(e.target.value)}
                required
              >
                <option value="">Seleccione la condición</option>
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
              </select>
            </div>
            {condicion === 'usado' && (
              <div className="form-group">
                <label htmlFor="quality">Calidad (1-10)</label>
                <input
                  type="number"
                  id="quality"
                  value={calidad}
                  onChange={(e) => setCalidad(e.target.value)}
                  min="1"
                  max="10"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Imágenes (máximo 3)</label>
              <input
                type="file"
                id="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
              />
              {imagenes.length > 0 && (
                <div>
                  <p>Imágenes seleccionadas:</p>
                  <ul>
                    {imagenes.map((imagen, index) => (
                      <li key={index}>{imagen.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Seleccione la categoría</option>
                <option value="estrategia">Estrategia</option>
                <option value="cooperativo">Cooperativo</option>
                <option value="familiar">Familiar</option>
                <option value="euros">Eurogames</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="trade">Tipo</label>
              <select
                id="trade"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="">Seleccione el tipo</option>
                <option value="venta">Venta</option>
                <option value="intercambio">Intercambio</option>
              </select>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Subiendo..." : "Subir Juego"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SubirJuego;
