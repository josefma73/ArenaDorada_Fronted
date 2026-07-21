import { Routes, Route, Navigate } from "react-router-dom";

// Layout público
import PublicLayout from "../components/PublicLayout";

// Páginas públicas
import Home from "../../features/home/views/Home";
import Servicios from "../../features/services/views/Servicios";
import Contacto from "../../features/contact/views/Contacto";
import Blog from "../../features/blog/views/Blog";
import Busqueda from "../../features/busqueda/view/Busqueda";
import Habitaciones from "../../features/habitaciones/views/Habitaciones";
import Promociones from "../../features/promociones/views/Promociones";
import HabitacionSimple from "../../features/habitaciones/views/HabitacionSimple";
import HabitacionDoble from "../../features/habitaciones/views/HabitacionDoble";
import HabitacionTriple from "../../features/habitaciones/views/HabitacionTriple";
import HabitacionMatrimonial from "../../features/habitaciones/views/HabitacionMatrimonial";

// Autenticación
import Login from "../../features/auth/views/Login";
import Register from "../../features/auth/views/Register";
import Recovery from "../../features/auth/views/ForgotPassword";
import ResetPassword from "../../features/auth/views/ResetPassword";

// Método de pago
import MetodoPago from "../../features/metodopago/views/MetodoPago";

// Administrador
import AdministradorInicio from "../../features/administrador/views/AdministradorInicio";
import AdministradorProductos from "../../features/administrador/views/AdministradorProductos";
import AdministradorUsuarios from "../../features/administrador/views/AdministradorUsuarios";
import AdministradorCategorias from "../../features/administrador/views/AdministradorCategorias";
import AdministradorHabitaciones from "../../features/administrador/views/AdministradorHabitaciones";
import AdministradorReservas from "../../features/administrador/views/AdministradorReservas";
import AdministradorNuevaReserva from "../../features/administrador/components/AdministradorNuevaReserva";
import AdministradorNuevaReservaPaso2 from "../../features/administrador/components/AdministradorNuevaReservaPaso2";
import AdministradorNuevaReservaPaso3 from "../../features/administrador/components/AdministradorNuevaReservaPaso3";

// Cliente
import ClienteInicio from "../../features/cliente/views/ClienteInicio";

// Seguridad
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= RUTAS PÚBLICAS ================= */}

      <Route element={<PublicLayout />}>
        <Route path="/inicio" element={<Home />} />
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

      {/* ================= AUTENTICACIÓN ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/metodospago" element={<MetodoPago />} />

      {/* ================= RUTAS PRIVADAS ================= */}

      <Route element={<ProtectedRoute />}>

        {/* ---------- ADMINISTRADOR ---------- */}

        <Route element={<RoleRoute allowedRoles={["ADMINISTRADOR"]} />}>

          <Route
            path="/administrador/inicio"
            element={<AdministradorInicio />}
          />

          <Route
            path="/administrador/productos"
            element={<AdministradorProductos />}
          />

          <Route
            path="/administrador/usuarios"
            element={<AdministradorUsuarios />}
          />

          <Route
            path="/administrador/categorias"
            element={<AdministradorCategorias />}
          />

          <Route
            path="/administrador/habitaciones"
            element={<AdministradorHabitaciones />}
          />

          <Route
            path="/administrador/reservas"
            element={<AdministradorReservas />}
          />

          <Route
            path="/administrador/reserva/:id"
            element={<AdministradorReservas />}
          />

          <Route
            path="/administrador/reservas/nueva"
            element={<AdministradorNuevaReserva />}
          />

          <Route
            path="/administrador/reservas/nueva/paso2"
            element={<AdministradorNuevaReservaPaso2 />}
          />
          <Route
            path="/administrador/reservas/nueva/paso3"
            element={<AdministradorNuevaReservaPaso3 />}
          />

        </Route>

        {/* ---------- CLIENTE ---------- */}

        <Route element={<RoleRoute allowedRoles={["CLIENTE"]} />}>

          <Route
            path="/cliente/inicio"
            element={<ClienteInicio />}
          />

        </Route>

      </Route>

      {/* ================= ERROR 404 ================= */}

      <Route
        path="/404"
        element={<h1>Error 404 - Página no encontrada</h1>}
      />

      {/* ================= REDIRECCIÓN ================= */}

      <Route
        path="*"
        element={<Navigate to="/404" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;