// src/features/auth/views/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Librería de alertas estéticas
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Iconos profesionales sin emojis
import { authService } from '../services/authService';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  
  // Estado para las credenciales
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Estados interactivos solicitados
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Alternar la visibilidad de la contraseña (Función del Ojito)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Envío del formulario con alertas y persistencia
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activa el Spinner de carga institucional

    try {
      // Llamada asíncrona al backend en Railway usando las variables de entorno .env
      const sessionData = await authService.login(credentials);
      
      // Persistencia en LocalStorage
      localStorage.setItem('token', sessionData.token);
      localStorage.setItem('usuarioId', sessionData.usuario.id);
      localStorage.setItem('usuarioNombre', sessionData.usuario.nombre);
      localStorage.setItem('usuarioApellidos', sessionData.usuario.apellidos);
      localStorage.setItem('usuarioEmail', sessionData.usuario.email);
      localStorage.setItem('usuarioRol', sessionData.usuario.rol);

      // Alerta de Éxito con SweetAlert2
      await Swal.fire({
        title: '¡Acceso Autorizado!',
        text: `Bienvenido de vuelta, ${sessionData.nombre}`,
        icon: 'success',
        confirmButtonColor: '#C5A059', // Azul institucional de Arena Dorada
        timer: 2000,
        timerProgressBar: true
      });

      // Redirección inteligente por roles del Hostal Arena Dorada
      const userRol = sessionData.usuario.rol; // 'ADMINISTRADOR', 'RECEPCIONISTA' o 'CLIENTE'
      
      if (userRol === 'ADMINISTRADOR') {
        navigate('/administrador/inicio');
      } else if (userRol === 'RECEPCIONISTA') {
        navigate('/panel/recepcion');
      } else {
        navigate('/cliente/inicio');
      }

    } catch (error) {
      // Alerta de Error controlada con SweetAlert2 (Evita mostrar el 400/500 crudo en pantalla)
      Swal.fire({
        title: 'Error en la autenticación',
        text: 'El correo electrónico o la contraseña ingresada son incorrectos. Por favor, verifícalos e inténtalo de nuevo.',
        icon: 'error',
        confirmButtonColor: '#1A1A1A'
      });
    } finally {
      setIsLoading(false); // Apaga el Spinner de carga
    }
  };

  return (
    <div className="login-container">
      {/* COMPONENTE DE LOADING INTERNO (Relacionado con la identidad de Arena Dorada) */}
      {isLoading && (
        <div className="roomica-loader-overlay">
          <div className="roomica-loader-box">
            <div className="roomica-spinner"></div>
            <p className="roomica-loader-text">Validando credenciales en Arena Dorada...</p>
          </div>
        </div>
      )}

      {/* PANEL IZQUIERDO: Portada de Alta Fidelidad */}
      <div className="login-image-panel">
        <div className="login-image-overlay">
          <h2>Arena Dorada</h2>
          <p>Tu hogar ideal en la ciudad de Ica.</p>
        </div>
      </div>

      {/* PANEL DERECHO: Formulario Transaccional */}
      <div className="login-form-panel">
        <div className="login-form-card">
          
          <div className="login-header">
            <h1 className="brand-title">Arena Dorada</h1>
            <p className="brand-subtitle">Tu lugar ideal</p>
            <h2 className="form-title">Iniciar sesión</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            
            {/* Campo: Correo Electrónico con Icono */}
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-icon-wrapper">
                <Mail className="input-icon-left" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingresa tu correo institucional"
                  value={credentials.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Campo: Contraseña con Icono y Ojito Dinámico */}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-icon-wrapper">
                <Lock className="input-icon-left" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'} // Cambia dinámicamente el tipo
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  value={credentials.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                {/* Botón interactivo del ojo */}
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1" // Evita que interfiera con la navegación por teclado (Tab)
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-actions-helper">
              <Link to="/recovery" className="forgot-password-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn-submit-login" 
              disabled={isLoading}
            >
              Iniciar sesión
            </button>
          </form>

          <div className="login-divider">
            <span>O continuar con</span>
          </div>

          <button type="button" className="btn-google-login" disabled={isLoading}>
            <img 
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
              alt="Google Logo" 
              className="google-icon"
            />
            Iniciar sesión con Google
          </button>

          <div className="login-footer-redirect">
            <span>¿No tienes cuenta? </span>
            <Link to="/register" className="register-redirect-link">
              Crear cuenta
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;