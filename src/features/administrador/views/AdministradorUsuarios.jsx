import { useState, useEffect } from 'react';
import {
  FaUserShield,
  FaUserTie,
  FaUser,
  FaPlus,
  FaSearch,
  FaTimes,
  FaCheck,
  FaEnvelope,
  FaPhoneAlt
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { usuarioAdminService } from '../services/usuarioAdminService';
import '../styles/AdministradorUsuarios.css';

export default function AdministradorUsuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('Todos');

  // Estado para el formulario de creación (Solo Staff)
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    rol: 'RECEPCIONISTA' // Valor por defecto
  });

  const roles = ['Todos', 'ADMINISTRADOR', 'RECEPCIONISTA', 'CLIENTE'];

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuarioAdminService.listarTodos();
      // Ordenamos por ID descendente para ver los más recientes primero
      const sortedData = data.sort((a, b) => b.id - a.id);
      setUsers(sortedData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo obtener la lista de usuarios. Vuelva a intentarlo.',
        confirmButtonColor: '#C5A059'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleOpenModal = () => {
    setNewUser({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      password: '',
      rol: 'RECEPCIONISTA'
    });
    setShowModal(true);
  };

  const handleCreateStaff = async () => {
    // Validaciones del Frontend
    if (!newUser.nombre.trim() || !newUser.apellidos.trim()) {
      return Swal.fire({ icon: 'warning', title: 'Campos incompletos', text: 'El nombre y apellidos son obligatorios.', confirmButtonColor: '#C5A059' });
    }
    if (!newUser.email.trim() || !/^\S+@\S+\.\S+$/.test(newUser.email)) {
      return Swal.fire({ icon: 'warning', title: 'Email inválido', text: 'Ingrese un correo electrónico válido.', confirmButtonColor: '#C5A059' });
    }
    if (!newUser.password || newUser.password.length < 6) {
      return Swal.fire({ icon: 'warning', title: 'Contraseña débil', text: 'La contraseña debe tener al menos 6 caracteres.', confirmButtonColor: '#C5A059' });
    }

    try {
      await usuarioAdminService.crearStaff(newUser);
      Swal.fire({
        icon: 'success',
        title: '¡Staff Registrado!',
        text: `El usuario ha sido creado como ${newUser.rol}.`,
        timer: 2000,
        showConfirmButton: false
      });
      setShowModal(false);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: error.message || 'Hubo un error al crear la cuenta de staff.',
        confirmButtonColor: '#C5A059'
      });
    }
  };

  // Filtrado de usuarios (Búsqueda + Filtro por Rol)
  const filteredUsers = users.filter((user) => {
    // Prevención contra nulos concatenando con strings vacíos
    const nombreSafe = user.nombre || '';
    const apellidosSafe = user.apellidos || '';
    const emailSafe = user.email || '';
    const telefonoSafe = user.telefono || '';

    const fullName = `${nombreSafe} ${apellidosSafe}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = fullName.includes(searchLower) || 
                          emailSafe.toLowerCase().includes(searchLower) ||
                          telefonoSafe.includes(searchLower);
    
    const matchesRole = filterRole === 'Todos' || user.rol === filterRole;
    
    return matchesSearch && matchesRole;
  });

  // Renderizador de iconos según el rol
  const getRoleIcon = (rol) => {
    switch(rol) {
      case 'ADMINISTRADOR': return <FaUserShield />;
      case 'RECEPCIONISTA': return <FaUserTie />;
      default: return <FaUser />;
    }
  };

  return (
    <div className="admin-usuarios-container">
      <AdminSidebar />
      <AdminHeader title="Gestión de Usuarios" />

      <main className="admin-usuarios-workspace">
        {/* Encabezado */}
        <div className="admin-usuarios-header">
          <div>
            <h2 className="admin-usuarios-title">Directorio de Usuarios</h2>
            <p className="admin-usuarios-subtitle">Visualiza a los clientes y gestiona las cuentas del personal (Staff).</p>
          </div>
          <button className="admin-usuarios-add-btn" onClick={handleOpenModal}>
            <FaPlus /> Nuevo Staff
          </button>
        </div>

        {/* Controles y Filtros */}
        <div className="admin-usuarios-controls">
          <div className="admin-usuarios-search-box">
            <FaSearch className="admin-usuarios-search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellidos, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-usuarios-search-input"
            />
          </div>

          <div className="admin-usuarios-filter-container">
            <div className="admin-usuarios-filter-tabs">
              {roles.map((rol) => (
                <button
                  key={rol}
                  className={`admin-usuarios-tab ${filterRole === rol ? 'active' : ''}`}
                  onClick={() => setFilterRole(rol)}
                >
                  {rol}
                </button>
              ))}
            </div>
            <span className="admin-usuarios-results-count">
              {filteredUsers.length} usuario(s)
            </span>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <div className="admin-usuarios-table-wrapper">
          {loading ? (
            <div className="admin-usuarios-loading">
              <div className="spinner"></div>
              <h3>Cargando directorio de usuarios...</h3>
            </div>
          ) : (
            <table className="admin-usuarios-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Contacto</th>
                  <th>Rol / Acceso</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="admin-usuarios-empty">
                      No se encontraron usuarios que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="admin-table-id">#{user.id}</td>
                      <td className="admin-table-usuario">
                        <div className="user-profile-info">
                          <div className="user-avatar">
                            {/* Prevención de error charAt usando opcionales */}
                            {user.nombre?.charAt(0)?.toUpperCase() || 'U'}
                            {user.apellidos?.charAt(0)?.toUpperCase() || ''}
                          </div>
                          <div className="user-names">
                            {/* Mostrar Nombres o "Usuario" si están nulos */}
                            <strong>{user.nombre || 'Usuario'} {user.apellidos || ''}</strong>
                          </div>
                        </div>
                      </td>
                      <td className="admin-table-contacto">
                        <div className="contact-detail">
                          <FaEnvelope className="contact-icon" /> {user.email || 'Sin correo'}
                        </div>
                        {user.telefono && (
                          <div className="contact-detail">
                            <FaPhoneAlt className="contact-icon" /> {user.telefono}
                          </div>
                        )}
                      </td>
                      <td className="admin-table-rol">
                        <span className={`role-badge role-${(user.rol || 'cliente').toLowerCase()}`}>
                          {getRoleIcon(user.rol)} {user.rol || 'CLIENTE'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Creación de Staff */}
        {showModal && (
          <div className="admin-usuarios-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-usuarios-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-usuarios-modal-header">
                <h2>Registrar Nuevo Miembro del Staff</h2>
                <button className="admin-usuarios-modal-close" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="admin-usuarios-modal-content">
                <div className="admin-usuarios-info-banner">
                  <FaUserShield className="banner-icon" />
                  <p>Este formulario es exclusivo para crear cuentas de <strong>Administradores</strong> o <strong>Recepcionistas</strong>. El registro de clientes se realiza desde la vista pública.</p>
                </div>

                <div className="admin-usuarios-row-group">
                  <div className="admin-usuarios-form-group">
                    <label>Nombres *</label>
                    <input
                      type="text"
                      value={newUser.nombre}
                      onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                      placeholder="Ej: Carlos Alberto"
                    />
                  </div>
                  <div className="admin-usuarios-form-group">
                    <label>Apellidos *</label>
                    <input
                      type="text"
                      value={newUser.apellidos}
                      onChange={(e) => setNewUser({ ...newUser, apellidos: e.target.value })}
                      placeholder="Ej: García Pérez"
                    />
                  </div>
                </div>

                <div className="admin-usuarios-row-group">
                  <div className="admin-usuarios-form-group">
                    <label>Correo Electrónico *</label>
                    <div className="input-with-icon">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="correo@hotel.com"
                      />
                    </div>
                  </div>
                  <div className="admin-usuarios-form-group">
                    <label>Teléfono</label>
                    <div className="input-with-icon">
                      <FaPhoneAlt className="input-icon" />
                      <input
                        type="text"
                        value={newUser.telefono}
                        onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
                        placeholder="Ej: 987654321"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-usuarios-divider"><span>Credenciales de Acceso</span></div>

                <div className="admin-usuarios-row-group">
                  <div className="admin-usuarios-form-group">
                    <label>Rol del Sistema *</label>
                    <select
                      value={newUser.rol}
                      onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                    >
                      <option value="RECEPCIONISTA">Recepcionista</option>
                      <option value="ADMINISTRADOR">Administrador</option>
                    </select>
                  </div>
                  <div className="admin-usuarios-form-group">
                    <label>Contraseña Temporal *</label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-usuarios-modal-footer">
                <button className="admin-usuarios-btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="admin-usuarios-btn-confirm" onClick={handleCreateStaff}>
                  <FaCheck /> Registrar Staff
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}