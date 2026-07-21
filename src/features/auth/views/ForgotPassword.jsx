import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { authService } from '../services/authService';
import { emailService } from '../../administrador/services/emailServices';
import '../styles/ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Validación básica del correo
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Simulamos la validación con nuestro authService
      await authService.recoverPassword(email);

      // 2. Generamos un enlace simulado para que el usuario restablezca su clave
      // (Ajusta la URL según la ruta de tu frontend)
      const resetLink = `${window.location.origin}/reset-password?token=s_token_123`;

      // 3. Enviamos el correo usando EmailJS
      await emailService.enviarCorreoRecuperacion(email, resetLink);

      // 4. Mostramos pantalla de éxito
      setIsSuccess(true);
    } catch (error) {
      setErrorMsg('No pudimos procesar tu solicitud. Verifica tu conexión e inténtalo de nuevo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      
      {/* Overlay de carga */}
      {isLoading && (
        <div className="arena-loader-overlay">
          <div className="arena-loader-box">
            <div className="arena-spinner"></div>
            <span className="arena-loader-text">Procesando solicitud...</span>
          </div>
        </div>
      )}

      <div className="forgot-card-box">
        {!isSuccess ? (
          <>
            <div className="text-center-alignment">
              <h1 className="forgot-brand">Arena Dorada</h1>
              <h2 className="forgot-title">Recuperar Contraseña</h2>
              <p className="forgot-subtitle">
                Ingresa el correo electrónico asociado a tu cuenta y te enviaremos las instrucciones para restablecer tu acceso.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-form-element">
              <div className="forgot-group">
                <label>Correo Electrónico</label>
                <div className="forgot-input-wrapper">
                  <FaEnvelope className="forgot-icon-left" />
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg('');
                    }}
                    className={`forgot-input ${email.length > 0 && !isEmailValid ? 'invalid-border' : ''}`}
                    autoComplete="email"
                  />
                </div>
                {email.length > 0 && !isEmailValid && (
                  <span className="forgot-error-msg">Formato de correo inválido</span>
                )}
                {errorMsg && <span className="forgot-error-msg">{errorMsg}</span>}
              </div>

              <div className="forgot-actions-layout">
                <button
                  type="submit"
                  disabled={!isEmailValid || isLoading}
                  className={`btn-forgot-submit ${isEmailValid ? 'active-state' : 'disabled-state'}`}
                >
                  Enviar Instrucciones
                </button>

                <Link to="/login" className="btn-forgot-cancel">
                  <FaArrowLeft /> Volver al Inicio de Sesión
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center-alignment success-view">
            <div className="success-icon-badge">
              <FaCheckCircle size={60} color="#C5A059" />
            </div>
            <h2 className="forgot-title">¡Correo Enviado!</h2>
            <p className="forgot-subtitle">
              Hemos enviado un enlace de recuperación a:
            </p>
            <div className="masked-email-display">
              {email}
            </div>
            <p className="forgot-hint-text">
              Revisa tu bandeja de entrada o la carpeta de spam. El enlace será válido por 24 horas.
            </p>
            <Link to="/login">
              <button className="btn-forgot-back-login">
                Regresar al Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}