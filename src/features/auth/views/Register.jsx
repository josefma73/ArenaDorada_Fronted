// src/features/auth/views/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Mail, User, Calendar, Phone, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { authService } from '../services/authService'; 
import '../styles/Register.css';

function Register() {
  const navigate = useNavigate();

  // Estado del formulario adaptado para capturar también el teléfono requerido por Spring Boot
  const [form, setForm] = useState({
    email: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    fechaNacimiento: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    hasLength: false
  });

  useEffect(() => {
    const pass = form.password;
    setPasswordCriteria({
      hasUppercase: /[A-Z]/.test(pass),
      hasLowercase: /[a-z]/.test(pass),
      hasNumber: /[0-9]/.test(pass),
      hasSpecial: /[@$#*.]/.test(pass),
      hasLength: pass.length >= 12 && pass.length <= 16
    });
  }, [form.password]);

  useEffect(() => {
    const currentErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      currentErrors.email = 'Email inválido';
    }

    if (!form.nombres.trim()) currentErrors.nombres = 'Requerido';
    if (!form.apellidos.trim()) currentErrors.apellidos = 'Requerido';
    if (!form.telefono.trim()) currentErrors.telefono = 'Requerido';

    if (!form.fechaNacimiento) {
      currentErrors.fechaNacimiento = 'Requerido';
    } else {
      const birthDate = new Date(form.fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        currentErrors.fechaNacimiento = 'Menor de edad';
      }
    }

    const allCriteriaMet = Object.values(passwordCriteria).every(v => v === true);
    if (!allCriteriaMet) currentErrors.password = 'Contraseña débil';

    if (form.password !== form.confirmPassword || !form.confirmPassword) {
      currentErrors.confirmPassword = 'No coincide';
    }

    setErrors(currentErrors);
    setIsFormValid(Object.keys(currentErrors).length === 0);
  }, [form, passwordCriteria]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    // Filtrado del Payload: Enviamos solo los campos mapeados en RegisterRequest de Spring Boot
    const payload = {
      nombre: form.nombres,
      apellidos: form.apellidos,
      email: form.email,
      telefono: form.telefono,
      password: form.password
    };

    try {
      const response = await authService.registerUser(payload);
      console.log("Registro Exitoso en Arena Dorada Backend:", response);

      setIsLoading(false);

      await Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Tu cuenta ha sido creada correctamente de forma segura en el sistema.',
        icon: 'success',
        confirmButtonColor: '#C5A059' // Dorado corporativo
      });

      setForm({
        email: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        fechaNacimiento: "",
        password: "",
        confirmPassword: "",
      });
      setTouched({});

      navigate('/login');

    } catch (error) {
      setIsLoading(false);
      console.error("Error capturado:", error);

      Swal.fire({
        title: 'Registro fallido',
        text: error.message || 'No se pudo completar el alta del usuario. Inténtelo nuevamente.',
        icon: 'error',
        confirmButtonColor: '#1A1A1A'
      });
    }
  };

  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return 'register-input';
    return errors[fieldName] ? 'register-input input-error' : 'register-input input-success';
  };

  return (
    <div className="register-container">
      {/* SPINNER DE CARGA CORPORATIVO */}
      {isLoading && (
        <div className="hotel-loader-overlay">
          <div className="hotel-loader-box">
            <div className="hotel-spinner"></div>
            <p className="hotel-loader-text">Procesando registro en Arena Dorada System...</p>
          </div>
        </div>
      )}

      {/* PANEL IZQUIERDO: Formulario de Registro */}
      <div className="register-form-panel">
        <div className="register-form-card">
          <div className="register-header">
            <h1 className="brand-title">Arena Dorada</h1>
            <p className="brand-subtitle">Crea tu cuenta de huésped</p>
            <h2 className="form-title">Crear cuenta</h2>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-grid-inputs">
              
              <div className="grid-column">
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <div className="input-icon-wrapper">
                    <Mail className="input-icon-leftt" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@correo.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('email')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="nombres">Nombres</label>
                  <div className="input-icon-wrapper">
                    <User className="input-icon-leftt" size={18} />
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      placeholder="Tus nombres"
                      value={form.nombres}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('nombres')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="apellidos">Apellidos</label>
                  <div className="input-icon-wrapper">
                    <User className="input-icon-leftt" size={18} />
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      placeholder="Tus apellidos"
                      value={form.apellidos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('apellidos')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Número de teléfono</label>
                  <div className="input-icon-wrapper">
                    <Phone className="input-icon-leftt" size={18} />
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      placeholder="Ej. 970678393"
                      value={form.telefono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('telefono')}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid-column">
                <div className="form-group">
                  <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                  <div className="input-icon-wrapper">
                    <Calendar className="input-icon-leftt" size={18} />
                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      value={form.fechaNacimiento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('fechaNacimiento')}
                      required
                    />
                  </div>
                  {touched.fechaNacimiento && errors.fechaNacimiento === 'Menor de edad' && (
                    <span className="error-text-msg">Debes ser mayor de edad (Mínimo 18 años).</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <div className="input-icon-wrapper">
                    <Lock className="input-icon-leftt" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Crea una contraseña"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('password')}
                      required
                    />
                    <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Repetir contraseña</label>
                  <div className="input-icon-wrapper">
                    <Lock className="input-icon-leftt" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirma tu contraseña"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('confirmPassword')}
                      required
                    />
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className="error-text-msg">Las contraseñas no coinciden.</span>
                  )}
                </div>

                <div className="password-criteria-panel">
                  <p className="criteria-title">La contraseña debe contener:</p>
                  <ul className="criteria-list">
                    <li className={passwordCriteria.hasUppercase ? 'meet' : 'unmeet'}>
                      {passwordCriteria.hasUppercase ? <Check size={14} /> : <X size={14} />}
                      <span>1 Mayúscula (A-Z)</span>
                    </li>
                    <li className={passwordCriteria.hasLowercase ? 'meet' : 'unmeet'}>
                      {passwordCriteria.hasLowercase ? <Check size={14} /> : <X size={14} />}
                      <span>1 Minúscula (a-z)</span>
                    </li>
                    <li className={passwordCriteria.hasNumber ? 'meet' : 'unmeet'}>
                      {passwordCriteria.hasNumber ? <Check size={14} /> : <X size={14} />}
                      <span>1 Número (0-9)</span>
                    </li>
                    <li className={passwordCriteria.hasSpecial ? 'meet' : 'unmeet'}>
                      {passwordCriteria.hasSpecial ? <Check size={14} /> : <X size={14} />}
                      <span>1 Carácter especial (@$#*.)</span>
                    </li>
                    <li className={passwordCriteria.hasLength ? 'meet' : 'unmeet'}>
                      {passwordCriteria.hasLength ? <Check size={14} /> : <X size={14} />}
                      <span>Entre 12 y 16 caracteres</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <button 
              type="submit" 
              className={`btn-submit-register ${isFormValid ? 'btn-active' : 'btn-disabled'}`}
              disabled={!isFormValid || isLoading}
            >
              CREAR CUENTA
            </button>
          </form>
        </div>
      </div>

      {/* PANEL DERECHO: Imagen de Portada Reversible */}
      <div className="register-image-panel">
        <div className="register-image-overlay">
          <h2>¿Ya tienes una cuenta en el Hostal?</h2>
          <p>Inicia sesión para continuar planificando tu estadía perfecta en Ica.</p>
          <Link to="/login" className="btn-redirect-login">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;