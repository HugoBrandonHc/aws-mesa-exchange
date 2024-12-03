import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import awsmobile from '../../aws-exports'; // Importar configuración de AWS Amplify
import '../../assets/styles/SubirJuego.css';

function SubirJuego() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [condicion, setCondicion] = useState('');
  const [calidad, setCalidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Endpoint de la API REST desde aws-exports.js
  const apiEndpoint = `${awsmobile.aws_cloud_logic_custom[0].endpoint}/games`;

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

    // Validar que todos los campos estén completos
    if (!nombre || !descripcion || !condicion || !precio) {
      setError("Todos los campos obligatorios deben estar completos.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Crear un objeto con los datos requeridos
      const juegoData = {
        gameID: Math.random().toString(36).substr(2, 9), // Generar un ID único
        createdAt: new Date().toISOString(), // Fecha actual en formato ISO
        description: descripcion,
        imageUrl: imagenes[0] ? imagenes[0].name : '', // Nombre del archivo o vacío
        price: parseFloat(precio), // Convertir a número
        quality: condicion === 'usado' ? calidad : 'N/A', // Calidad solo si es usado
        title: nombre, // Nombre del juego
        condition: condicion,
        category: 'estrategia', // Puedes cambiar o agregar esta categoría
        tradeType: 'venta' // Esto es solo un ejemplo, puedes personalizarlo
      };

      console.log("Datos enviados:", juegoData);

      // Enviar los datos a la API REST
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juegoData),
      });

      if (response.ok) {
        alert("¡Juego subido correctamente!");
        navigate('/catalogo'); // Redirigir al catálogo después de subir el juego
      } else {
        const errorDetails = await response.json();
        console.error('Error en la API:', errorDetails);
        throw new Error('Error al subir el juego.');
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
