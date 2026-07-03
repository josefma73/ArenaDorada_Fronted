import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  
  // Estados de control
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado para alternar entre las pantallas de las imágenes (false = Solicitar, true = Confirmado)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');

  // Validación en tiempo real del formato de email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email.trim()));
  }, [email]);

  // Función para ofuscar/enmascarar el email (ejm: m*****5@gmail.com)
  const maskEmailAddress = (rawEmail) => {
    const [localPart, domain] = rawEmail.split('@');
    if (!localPart || !domain) return rawEmail;
    
    if (localPart.length <= 2) {
      return `${localPart[0]}*@${domain}`;
    }
    
    const firstLetter = localPart[0];
    const lastLetter = localPart[localPart.length - 1];
    const asterisks = '*'.repeat(localPart.length - 2);
    
    return `${firstLetter}${asterisks}${lastLetter}@${domain}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setIsLoading(true);

    try {
      // Llamada al servicio que dispara el correo mediante la API
      await authService.recoverPassword(email.trim());
      
      setIsLoading(false);
      setMaskedEmail(maskEmailAddress(email.trim()));
      
      // Lanzamos la alerta SweetAlert2 solicitada
      await Swal.fire({
        title: '¡Correo Enviado!',
        text: 'Te enviamos un correo con los pasos a seguir.',
        icon: 'success',
        confirmButtonColor: '#1565C0'
      });

      // Cambiamos a la vista de la segunda imagen (Confirmación)
      setIsSubmitted(true);

    } catch (error) {
      setIsLoading(false);
      console.error("Error en recuperación:", error);
      
      Swal.fire({
        title: 'Error de solicitud',
        text: 'No pudimos procesar la recuperación. Verifique si el correo electrónico es correcto.',
        icon: 'error',
        confirmButtonColor: '#d32f2f'
      });
    }
  };

  return (
    <div className="forgot-password-container">
      {/* SPINNER CORPORATIVO DE CARGA */}
      {isLoading && (
        <div className="roomica-loader-overlay">
          <div className="roomica-loader-box">
            <div className="roomica-spinner"></div>
            <p className="roomica-loader-text">Conectando con el servidor de RoomIca...</p>
          </div>
        </div>
      )}

      {/* TARJETA DE RECOVERY CENTRALIZADA */}
      <div className="forgot-card-box">
        
        {/* CASO 1: FORMULARIO DE SOLICITUD (IMAGEN 1) */}
        {!isSubmitted ? (
          <div className="forgot-step-content">
            <div className="forgot-header">
              <h1 className="forgot-brand">RoomIca</h1>
              <h2 className="forgot-title">¿Olvidaste tu contraseña?</h2>
              <p className="forgot-subtitle">
                Introduce tu correo electrónico registrado y te enviaremos las instrucciones para restablecerla de forma segura.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-form-element">
              <div className="forgot-group">
                <label htmlFor="recovery-email">Correo electrónico universitario</label>
                <div className="forgot-input-wrapper">
                  <Mail className="forgot-icon-left" size={18} />
                  <input
                    type="email"
                    id="recovery-email"
                    placeholder="ejemplo@utp.edu.pe"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className={`forgot-input ${!touched ? '' : (isEmailValid ? 'valid-border' : 'invalid-border')}`}
                    required
                  />
                </div>
                {touched && !isEmailValid && (
                  <span className="forgot-error-msg">Por favor, ingrese un formato de correo válido.</span>
                )}
              </div>

              <div className="forgot-actions-layout">
                <button
                  type="submit"
                  className={`btn-forgot-submit ${isEmailValid ? 'active-state' : 'disabled-state'}`}
                  disabled={!isEmailValid || isLoading}
                >
                  ENVIAR INSTRUCCIONES
                </button>

                <button
                  type="button"
                  className="btn-forgot-cancel"
                  onClick={() => navigate('/login')}
                  disabled={isLoading}
                >
                  <ArrowLeft size={16} /> Volver al Login
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* CASO 2: PANTALLA DE CONFIRMACIÓN DE ENVÍO (IMAGEN 2) */
          <div className="forgot-step-content text-center-alignment">
            <div className="success-icon-badge">
              <CheckCircle size={52} color="#22c55e" />
            </div>
            
            <div className="forgot-header">
              <h2 className="forgot-title">Revisa tu bandeja de entrada</h2>
              <p className="forgot-subtitle">
                Hemos enviado un código seguro de restablecimiento al correo electrónico:
              </p>
              <div className="masked-email-display">
                {maskedEmail}
              </div>
              <p className="forgot-hint-text">
                Si no encuentras el mensaje en unos minutos, revisa tu carpeta de spam o correo no deseado.
              </p>
            </div>

            <button
              type="button"
              className="btn-forgot-back-login"
              onClick={() => navigate('/login')}
            >
              VOLVER AL INICIO DE SESIÓN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;