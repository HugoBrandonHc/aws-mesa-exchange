// src/components/informativos/TerminosCondiciones.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function TerminosCondiciones() {
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
        <h1>Términos y Condiciones</h1>
        <p><strong>Última actualización:</strong> 14 de noviembre de 2024</p>

        <section>
          <h2>1. Introducción</h2>
          <p>
            Estos Términos y Condiciones rigen el uso de nuestro sitio web y los servicios proporcionados.
            Al acceder o utilizar nuestra plataforma, aceptas estos términos en su totalidad.
          </p>
        </section>

        <section>
          <h2>2. Uso de la Plataforma</h2>
          <p>
            Los usuarios deben cumplir con todas las leyes aplicables al utilizar nuestra plataforma.
            No se permite el uso de la plataforma para actividades ilícitas o prohibidas.
          </p>
        </section>

        <section>
          <h2>3. Propiedad Intelectual</h2>
          <p>
            Todo el contenido disponible en esta plataforma, incluidos textos, imágenes y logotipos, 
            está protegido por derechos de autor y otras leyes de propiedad intelectual.
          </p>
        </section>

        <section>
          <h2>4. Limitación de Responsabilidad</h2>
          <p>
            No somos responsables de ningún daño que pueda resultar del uso de la plataforma,
            incluyendo la pérdida de datos o beneficios.
          </p>
        </section>

        <section>
          <h2>5. Modificaciones a los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento.
            Las actualizaciones se publicarán en esta página.
          </p>
        </section>

        <footer>
          <p>Si tienes alguna pregunta sobre nuestros Términos y Condiciones, contáctanos a través de nuestro <Link to="/contacto">formulario de contacto</Link>.</p>
        </footer>
      </main>
    </div>
  );
}

export default TerminosCondiciones;
