import { Routes, Route, Navigate } from 'react-router-dom';
// Layout público
import PublicLayout from '../components/PublicLayout';

// PAGINAS PUBLICAS
import Home from '../../features/home/views/Home';
import Servicios from '../../features/services/views/Servicios';
import Contacto from '../../features/contact/views/Contacto';
import Blog from '../../features/blog/views/Blog';
import Busqueda from "../../features/busqueda/view/Busqueda";
import Habitaciones from '../../features/habitaciones/views/Habitaciones';
import Promociones from '../../features/promociones/views/Promociones';
import HabitacionSimple from '../../features/habitaciones/views/HabitacionSimple';
import HabitacionDoble from '../../features/habitaciones/views/HabitacionDoble';
import HabitacionTriple from '../../features/habitaciones/views/HabitacionTriple';
import HabitacionMatrimonial from '../../features/habitaciones/views/HabitacionMatrimonial';

// AUTENTICACION
import Login from '../../features/auth/views/Login';
import Register from '../../features/auth/views/Register';
import Recovery from '../../features/auth/views/ForgotPassword';
import ResetPassword from '../../features/auth/views/ResetPassword';

// ADMINISTRADOR
import AdministradorInicio from '../../features/administrador/views/AdministradorInicio';
import AdministradorProductos from '../../features/administrador/views/AdministradorProductos';
import AdministradorUsuarios from '../../features/administrador/views/AdministradorUsuarios';
import AdministradorCategorias from '../../features/administrador/views/AdministradorCategorias';
import AdministradorHabitaciones from '../../features/administrador/views/AdministradorHabitaciones';

// CLIENTE
import ClienteInicio from '../../features/cliente/views/ClienteInicio';

// METODO PAGO
import MetodoPago from '../../features/metodopago/views/MetodoPago';

// SEGURIDAD
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';


function AppRoutes(){

  return (

      <Routes>
        <Route element={<PublicLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/servicios" element={<Servicios/>}/>
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/busqueda" element={<Busqueda/>}/>
        <Route path="/habitaciones" element={<Habitaciones/>}/>
        <Route path="/promociones" element={<Promociones/>}/>
        <Route path="/habitacionsimple" element={<HabitacionSimple/>}/>
        <Route path="/habitaciondoble" element={<HabitacionDoble/>}/>
        <Route path="/habitaciontriple" element={<HabitacionTriple/>}/>
        <Route path="/habitacionmatrimonial" element={<HabitacionMatrimonial/>}/>
      </Route>

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/recovery" element={<Recovery/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/metodospago" element={<MetodoPago/>}/>

        

      {/*    RUTAS PRIVADAS -Requieren TOKEN */}
      <Route element={<ProtectedRoute/>}>
      {/*ADMINISTRADOR*/}
      <Route element={
          <RoleRoute
              allowedRoles={[
                  "ADMINISTRADOR"
              ]}
          />
      }>
      <Route 
          path="/administrador/inicio"
          element={<AdministradorInicio/>}
      />
      <Route 
          path="/administrador/productos"
          element={<AdministradorProductos/>}
      />
      <Route 
          path="/administrador/usuarios"
          element={<AdministradorUsuarios/>}
      />
      <Route 
          path="/administrador/categorias"
          element={<AdministradorCategorias/>}
      />
      <Route 
          path="/administrador/habitaciones"
          element={<AdministradorHabitaciones/>}
      />
      </Route>


  {/*      RECEPCIONISTA
      Futuras paginas
      Ejemplo:
      /recepcionista/inicio
      /recepcionista/reservas
      /recepcionista/habitaciones

      Roles permitidos:

      RECEPCIONISTA
  ===================================================== */



  /*
  <Route element={
      <RoleRoute
          allowedRoles={[
              "RECEPCIONISTA"
          ]}
      />
  }>


  <Route
      path="/recepcionista/inicio"
      element={<RecepcionistaInicio/>}
  />


  <Route
      path="/recepcionista/reservas"
      element={<RecepcionistaReservas/>}
  />


  </Route>
  */



    
    <Route element={
        <RoleRoute
            allowedRoles={[
                "CLIENTE"
            ]}
        />
    }>
        <Route
            path="/cliente/inicio"
            element={<ClienteInicio/>}
        />
    </Route>
  }
  </Route>*/





  {/*ERRORES*/}
  <Route 
      path="/404"
      element={
          <h1>
              Error 404 - Página no encontrada
          </h1>
      }
  />

  <Route
      path="*"
      element={
          <Navigate
              to="/404"
              replace
          />
      }
  />

  </Routes>
  );

}

export default AppRoutes;