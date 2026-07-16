// src/core/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Importación del Layout estructural
import PublicLayout from '../components/PublicLayout';

// Vistas de la Feature: Home / Landing Pública
import Home from '../../features/home/views/Home';
import Servicios from '../../features/services/views/Servicios';
import Contacto from '../../features/contact/views/Contacto';
import Blog from '../../features/blog/views/Blog';
import Busqueda from "../../features/busqueda/view/Busqueda"
import Habitaciones from '../../features/habitaciones/views/Habitaciones';
import Promociones from '../../features/promociones/views/Promociones';
import HabitacionSimple from '../../features/habitaciones/views/HabitacionSimple';
import HabitacionDoble from '../../features/habitaciones/views/HabitacionDoble';
import HabitacionTriple from '../../features/habitaciones/views/HabitacionTriple';
import HabitacionMatrimonial from '../../features/habitaciones/views/HabitacionMatrimonial';

// Vistas de la Feature: Autenticación (Sin Header ni Footer)
import Login from '../../features/auth/views/Login';
import Register from '../../features/auth/views/Register';
import Recovery from '../../features/auth/views/ForgotPassword'
import ResetPassword from '../../features/auth/views/ResetPassword';

//Vistas de la Featura: Administrador
import AdministradorInicio from '../../features/administrador/views/AdministradorInicio';
import AdministradorProductos from '../../features/administrador/views/AdministradorProductos';
import AdministradorUsuarios from '../../features/administrador/views/AdministradorUsuarios';


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
         <Route path="/busqueda" element={<Busqueda />} />
         <Route path="/habitaciones" element={<Habitaciones />} />
         <Route path="/promociones" element={<Promociones />} />
         <Route path="/habitacionsimple" element={<HabitacionSimple />} />
         <Route path="/habitaciondoble" element={<HabitacionDoble />} />
         <Route path="/habitaciontriple" element={<HabitacionTriple />} />
         <Route path="/habitacionmatrimonial" element={<HabitacionMatrimonial />} />
         
         
      </Route>

      {/* ===================================================================
          GRUPO 2: RUTAS DE AUTENTICACIÓN (Completamente limpias / Sin Layout)
          =================================================================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ===================================================================
          GRUPO 3: DASHBOARDS / PANELES PRIVADOS 
          =================================================================== */}
      <Route path="/administrador/inicio" element={<AdministradorInicio />} />
      <Route path="/administrador/productos" element={<AdministradorProductos />} />
      <Route path="/administrador/usuarios" element={<AdministradorUsuarios />} />

      {/* Manejo de Errores global */}
      <Route path="/404" element={<h1>Error 404 - Página No Encontrada</h1>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRoutes;