// src/core/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Importación del Layout estructural
import PublicLayout from '../components/PublicLayout';

// Vistas de la Feature: Home / Landing Pública
import Home from '../../features/home/views/Home';
import Servicios from '../../features/services/views/Servicios';
import Contacto from '../../features/contact/views/Contacto';
import Blog from '../../features/blog/views/Blog';

// Vistas de la Feature: Autenticación (Sin Header ni Footer)
import Login from '../../features/auth/views/Login';
import Register from '../../features/auth/views/Register';
import Recovery from '../../features/auth/views/ForgotPassword'
import ResetPassword from '../../features/auth/views/ResetPassword';

function AppRoutes() {
  return (
    <Routes>
      
      {/* ===================================================================
          GRUPO 1: RUTAS PÚBLICAS (Llevan Header y Footer automáticamente)
          =================================================================== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
         <Route path="/servicios" element={<Servicios />} />
         <Route path="/contacto" element={<Contacto />} />
         <Route path="/blog" element={<Blog />} /> 
      </Route>

      {/* ===================================================================
          GRUPO 2: RUTAS DE AUTENTICACIÓN (Completamente limpias / Sin Layout)
          =================================================================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ===================================================================
          GRUPO 3: DASHBOARDS / PANELES PRIVADOS (Llevarán su propio Layout de Panel)
          =================================================================== */}
      {/* En los siguientes Sprints, cuando crees los paneles, se estructurarán igual: */}
      {/* <Route element={<DashboardLayout />}> */}
      {/* <Route path="/panel/estudiante" element={<PanelEstudiante />} /> */}
      {/* <Route path="/panel/propietario" element={<PanelPropietario />} /> */}
      {/* <Route path="/panel/admin" element={<PanelAdmin />} /> */}
      {/* </Route> */}

      {/* Manejo de Errores global */}
      <Route path="/404" element={<h1>Error 404 - Página No Encontrada</h1>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRoutes;