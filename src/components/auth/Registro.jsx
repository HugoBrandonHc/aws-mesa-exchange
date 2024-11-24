import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
// Registro.jsx
import '../../assets/styles/Login.css';

function Registro() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegistro = async (event) => {
    event.preventDefault();
    if (!acceptedTerms) {
      setError("Debes aceptar los Términos y Condiciones.");
      return;
    }
    setError(null); // Resetea errores previos
    try {
      // Cognito signup
      await Amplify.Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          phone_number: telefono,
          name: nombreCompleto,
        },
      });
      setIsConfirmationStep(true); // Cambia al paso de confirmación
      setSuccess("Usuario registrado correctamente. Verifica tu correo para completar el registro.");
    } catch (err) {
      console.error("Error en el registro:", err);
      if (err.code === 'UsernameExistsException') {
        setError("El usuario ya está registrado. Intenta iniciar sesión.");
      } else {
        setError("No se pudo completar el registro. Intenta nuevamente.");
      }
    }
  };

  const handleConfirmarCodigo = async (event) => {
    event.preventDefault();
    try {
      await Amplify.Auth.confirmSignUp(email, confirmationCode);
      setSuccess("¡Registro confirmado exitosamente! Ahora puedes iniciar sesión.");
      setError(null);
      setIsConfirmationStep(false);
    } catch (err) {
      console.error("Error al confirmar el código:", err);
      setError("El código de confirmación no es válido o ha expirado.");
    }
  };

  const handleReenviarCodigo = async () => {
    try {
      await Amplify.Auth.resendSignUp(email);
      setSuccess("Código de confirmación reenviado. Revisa tu correo.");
      setError(null);
    } catch (err) {
      console.error("Error al reenviar el código:", err);
      setError("No se pudo reenviar el código. Intenta nuevamente.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isConfirmationStep ? "Confirmar Registro" : "Registro"}</h2>

      {!isConfirmationStep ? (
        <form onSubmit={handleRegistro} className="auth-form">
          <input
            type="text"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            placeholder="Nombre Completo"
            required
          />
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            <label htmlFor="terms">
              Acepto los <a href="/terminos-condiciones">Términos y Condiciones</a>.
            </label>
          </div>
          <button type="submit" disabled={!acceptedTerms}>Registrar</button>
        </form>
      ) : (
        <form onSubmit={handleConfirmarCodigo} className="auth-form">
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="Código de Confirmación"
            required
          />
          <button type="submit">Confirmar Registro</button>
        </form>
      )}

      {isConfirmationStep && (
        <button onClick={handleReenviarCodigo} className="resend-button">
          Reenviar Código
        </button>
      )}

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default Registro;
