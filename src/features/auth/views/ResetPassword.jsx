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
  
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  const [criteria, setCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setCriteria({
      length: password.length >= 12 && password.length <= 16,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[¿?¡!@$#*.]/.test(password)
    });
  }, [password]);

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
        title: 'Enlace Inválido',
        text: 'No se detectó un token de seguridad. Por favor, solicita un nuevo enlace de recuperación.',
        icon: 'warning',
        confirmButtonColor: '#C5A059'
      });
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(token, password);
      
      setIsLoading(false);

      await Swal.fire({
        title: '¡Contraseña actualizada!',
        text: 'Tu acceso ha sido restablecido de forma segura. Ya puedes iniciar sesión.',
        icon: 'success',
        confirmButtonColor: '#C5A059'
      });

      navigate('/login');

    } catch (error) {
      setIsLoading(false);
      console.error("Error al restablecer:", error);
      
      Swal.fire({
        title: 'Error de validación',
        text: 'El enlace ha expirado o es inválido. Por favor, solicita uno nuevo.',
        icon: 'error',
        confirmButtonColor: '#d32f2f'
      });
    }
  };

  return (
    <div className="reset-pass-container">
      {isLoading && (
        <div className="arena-loader-overlay">
          <div className="arena-loader-box">
            <div className="arena-spinner"></div>
            <p className="arena-loader-text">Asegurando credenciales...</p>
          </div>
        </div>
      )}

      {/* PANEL IZQUIERDO: Branding Arena Dorada */}
      <div className="reset-brand-side">
        <div className="reset-logo-wrapper">
          <h1 className="brand-logo-name">Arena Dorada</h1>
          <p className="brand-logo-tagline">Hotel & Suites</p>
        </div>
        <div className="brand-lang-footer">
          <span>Español</span> | <span className="disabled-lang">English</span>
        </div>
      </div>

      {/* PANEL DERECHO: Formulario */}
      <div className="reset-form-side">
        <div className="reset-form-wrapper">
          
          <div className="reset-form-header">
            <div className="lock-icon-badge"><ShieldAlert size={32} /></div>
            <h2>Crear Nueva Contraseña</h2>
            <p>Introduce una contraseña robusta para asegurar tu cuenta.</p>
          </div>

          <form onSubmit={handleSubmit} className="reset-main-form">
            
            {/* Campo 1: Nueva Contraseña */}
            <div className="reset-group">
              <label htmlFor="new-password">Nueva contraseña</label>
              <div className="reset-input-wrapper">
                <Lock className="reset-field-icon" size={18} />
                <input
                  type={showPass ? 'text' : 'password'}
                  id="new-password"
                  placeholder="Escribe tu nueva clave"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="reset-eye-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* PANEL DE REQUISITOS (Feedback en tiempo real) */}
            <div className="reset-criteria-box">
              <p className="criteria-heading">Tu contraseña debe contener:</p>
              <div className="criteria-grid-layout">
                <div className={`criteria-item ${criteria.length ? 'pass' : 'fail'}`}>
                  {criteria.length ? <Check size={16} /> : <X size={16} />}
                  <span>12 a 16 caracteres</span>
                </div>
                <div className={`criteria-item ${criteria.special ? 'pass' : 'fail'}`}>
                  {criteria.special ? <Check size={16} /> : <X size={16} />}
                  <span>1 Carácter especial (¿?¡!@$#*.)</span>
                </div>
                <div className={`criteria-item ${criteria.lowercase ? 'pass' : 'fail'}`}>
                  {criteria.lowercase ? <Check size={16} /> : <X size={16} />}
                  <span>1 Letra minúscula</span>
                </div>
                <div className={`criteria-item ${criteria.uppercase ? 'pass' : 'fail'}`}>
                  {criteria.uppercase ? <Check size={16} /> : <X size={16} />}
                  <span>1 Letra mayúscula</span>
                </div>
                <div className={`criteria-item ${criteria.number ? 'pass' : 'fail'}`}>
                  {criteria.number ? <Check size={16} /> : <X size={16} />}
                  <span>1 Número</span>
                </div>
              </div>
            </div>

            {/* Campo 2: Confirmar Contraseña */}
            <div className="reset-group">
              <label htmlFor="confirm-password">Confirmar contraseña</label>
              <div className="reset-input-wrapper">
                <Lock className="reset-field-icon" size={18} />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  id="confirm-password"
                  placeholder="Repite tu nueva clave"
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

            <button
              type="submit"
              className={`btn-reset-action ${isFormValid ? 'state-ready' : 'state-locked'}`}
              disabled={!isFormValid || isLoading}
            >
              Confirmar y Actualizar
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;