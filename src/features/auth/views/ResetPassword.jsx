// src/features/auth/views/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Lock, Eye, EyeOff, Check, X, ShieldAlert } from 'lucide-react';
import { authService } from '../services/authService';
import '../styles/ResetPassword.css';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Capturamos el token de la URL de forma automática (?token=...)
  const token = searchParams.get('token') || '';

  // Estados de entrada
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados de interfaz interactivos
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  // Estados para los criterios visuales de fortaleza (Alineados a la arquitectura)
  const [criteria, setCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  // Validar criterios en tiempo real cada vez que se presiona una tecla
  useEffect(() => {
    setCriteria({
      length: password.length >= 12 && password.length <= 16, // Sincronizado: 12 a 16 caract.
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[¿?¡!@$#*.]/.test(password) // Agregados los nuevos caracteres solicitados
    });
  }, [password]);

  // Validar coincidencia general del formulario para activar el botón
  useEffect(() => {
    const allCriteriaMet = Object.values(criteria).every(v => v === true);
    const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
    
    setIsFormValid(allCriteriaMet && passwordsMatch);
  }, [password, confirmPassword, criteria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (!token) {
      Swal.fire({
        title: 'Token Inválido',
        text: 'No se detectó un token válido en la URL de restablecimiento. Solicite un nuevo enlace.',
        icon: 'warning',
        confirmButtonColor: '#EF6C00'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Consumo de la promesa del backend en Railway
      await authService.resetPassword(token, password);
      
      setIsLoading(false);

      await Swal.fire({
        title: '¡Contraseña restablecida exitosamente!',
        text: 'Tu acceso ha sido actualizado de forma segura. Ya puedes iniciar sesión.',
        icon: 'success',
        confirmButtonColor: '#1565C0'
      });

      navigate('/login');

    } catch (error) {
      setIsLoading(false);
      console.error("Error al restablecer:", error);
      
      Swal.fire({
        title: 'Error al restablecer la contraseña',
        text: 'El enlace ha expirado o es inválido. Por favor, vuelva a intentarlo más tarde.',
        icon: 'error',
        confirmButtonColor: '#d32f2f'
      });
    }
  };

  return (
    <div className="reset-pass-container">
      {/* LOADING OVERLAY INSTITUCIONAL */}
      {isLoading && (
        <div className="roomica-loader-overlay">
          <div className="roomica-loader-box">
            <div className="roomica-spinner"></div>
            <p className="roomica-loader-text">Actualizando credenciales en la base de datos...</p>
          </div>
        </div>
      )}

      {/* PANEL IZQUIERDO DE LOGO (Estilo Mockup Inmobiliario) */}
      <div className="reset-brand-side">
        <div className="reset-logo-wrapper">
          {/* Reemplazo dinámico del logo de la clínica por RoomIca */}
          <div className="brand-logo-icon">🔑</div>
          <h1 className="brand-logo-name">RoomIca</h1>
          <p className="brand-logo-tagline">Tu hogar universitario ideal</p>
        </div>
        <div className="brand-lang-footer">
          <span>Español</span> | <span className="disabled-lang">English</span>
        </div>
      </div>

      {/* PANEL DERECHO DEL FORMULARIO TRANSACCIONAL */}
      <div className="reset-form-side">
        <div className="reset-form-wrapper">
          
          <div className="reset-form-header">
            <div className="lock-icon-badge"><ShieldAlert size={28} /></div>
            <h2>Nueva Contraseña</h2>
          </div>

          <form onSubmit={handleSubmit} className="reset-main-form">
            
            {/* Campo 1: Nueva Contraseña */}
            <div className="reset-group">
              <label htmlFor="new-password">Ingrese la nueva contraseña</label>
              <div className="reset-input-wrapper">
                <Lock className="reset-field-icon" size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  id="new-password"
                  placeholder="Crea una contraseña segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="reset-eye-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* PANEL INTERACTIVO DE REQUISITOS (Estilo de tu captura de pantalla) */}
            <div className="reset-criteria-box">
              <p className="criteria-heading">Debes usar al menos:</p>
              <div className="criteria-grid-layout">
                <div className={`criteria-item ${criteria.length ? 'pass' : 'fail'}`}>
                  {criteria.length ? <Check size={14} /> : <X size={14} />}
                  <span>Entre 12 y 16 caracteres</span>
                </div>
                <div className={`criteria-item ${criteria.special ? 'pass' : 'fail'}`}>
                  {criteria.special ? <Check size={14} /> : <X size={14} />}
                  <span>1 Carácter especial (¿?¡!@$#*.)</span>
                </div>
                <div className={`criteria-item ${criteria.lowercase ? 'pass' : 'fail'}`}>
                  {criteria.lowercase ? <Check size={14} /> : <X size={14} />}
                  <span>1 Minúscula (a-z)</span>
                </div>
                <div className={`criteria-item ${criteria.uppercase ? 'pass' : 'fail'}`}>
                  {criteria.uppercase ? <Check size={14} /> : <X size={14} />}
                  <span>1 Mayúscula (A-Z)</span>
                </div>
                <div className={`criteria-item ${criteria.number ? 'pass' : 'fail'}`}>
                  {criteria.number ? <Check size={14} /> : <X size={14} />}
                  <span>1 Número (0-9)</span>
                </div>
              </div>
            </div>

            {/* Campo 2: Repetir Contraseña */}
            <div className="reset-group">
              <label htmlFor="confirm-password">Ingrese nuevamente la nueva contraseña</label>
              <div className="reset-input-wrapper">
                <Lock className="reset-field-icon" size={16} />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  id="confirm-password"
                  placeholder="Confirma la contraseña ingresada"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouchedConfirm(true)}
                  className={touchedConfirm && password !== confirmPassword ? 'input-mismatch' : ''}
                  required
                />
                <button type="button" className="reset-eye-btn" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                  {showConfirmPass ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {touchedConfirm && password !== confirmPassword && (
                <span className="reset-error-text">Las contraseñas no coinciden.</span>
              )}
            </div>

            {/* BOTÓN DE ACCIÓN CONTROLADO POR ESTADO */}
            <button
              type="submit"
              className={`btn-reset-action ${isFormValid ? 'state-ready' : 'state-locked'}`}
              disabled={!isFormValid || isLoading}
            >
              Restablecer Contraseña
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;