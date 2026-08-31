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
  FaPhoneAlt,
  FaIdCard
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { usuarioAdminService } from '../services/usuarioAdminService';
import { emailService } from '../services/emailServices';
import '../styles/AdministradorUsuarios.css';

export default function AdministradorUsuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('CLIENTE'); // 'CLIENTE' | 'STAFF'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('Todos');

  // Estado del formulario
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    rol: 'CLIENTE'
  });

  const roles = ['Todos', 'ADMINISTRADOR', 'RECEPCIONISTA', 'CLIENTE'];

  // --- LÓGICA DE VALIDACIÓN ESTRICTA ---
  const isNameValid = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,}$/.test(newUser.nombre.trim());
  const isLastNameValid = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,}$/.test(newUser.apellidos.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email);
  const isPhoneValid = /^\d{9}$/.test(newUser.telefono); // Exactamente 9 dígitos
  const isPasswordValid = newUser.password.length >= 6;

  const isFormValid = isNameValid && isLastNameValid && isEmailValid && isPhoneValid && isPasswordValid;

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuarioAdminService.listarTodos();
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

  const handleOpenModal = (type) => {
    setModalType(type);
    setNewUser({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      password: '',
      rol: type === 'CLIENTE' ? 'CLIENTE' : 'RECEPCIONISTA'
    });
    setShowModal(true);
  };

  const handleRegisterUser = async () => {
    if (!isFormValid) return; // Doble seguridad por si manipulan el DOM

    Swal.fire({
      title: 'Registrando...',
      text: 'Por favor, espere un momento.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // 1. Guardar en Base de Datos según el tipo
      if (modalType === 'CLIENTE') {
        await usuarioAdminService.crearClientePresencial(newUser);
      } else {
        await usuarioAdminService.crearStaff(newUser);
      }

      // 2. Enviar correo de bienvenida al cliente/staff
      try {
        await emailService.enviarCorreoBienvenida(
          newUser.email,
          `${newUser.nombre} ${newUser.apellidos}`,
          newUser.password
        );
      } catch (emailError) {
        console.warn("Usuario creado en BD, pero falló el envío del correo:", emailError);
        // No bloqueamos el flujo porque el usuario ya existe en el sistema
      }

      Swal.fire({
        icon: 'success',
        title: modalType === 'CLIENTE' ? '¡Cliente Registrado!' : '¡Staff Registrado!',
        text: `Se ha creado la cuenta y enviado las credenciales a ${newUser.email}.`,
        timer: 3000,
        showConfirmButton: false
      });
      
      setShowModal(false);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: error.message || 'Hubo un error al crear la cuenta. Verifique los datos.',
        confirmButtonColor: '#C5A059'
      });
    }
  };

  // Filtrado de usuarios
  const filteredUsers = users.filter((user) => {
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
          <div className="header-actions">
            <button className="admin-usuarios-outline-btn" onClick={() => handleOpenModal('STAFF')}>
              <FaUserShield /> Nuevo Staff
            </button>
            <button className="admin-usuarios-add-btn" onClick={() => handleOpenModal('CLIENTE')}>
              <FaPlus /> Nuevo Cliente
            </button>
          </div>
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
                            {user.nombre?.charAt(0)?.toUpperCase() || 'U'}
                            {user.apellidos?.charAt(0)?.toUpperCase() || ''}
                          </div>
                          <div className="user-names">
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

        {/* Modal Dinámico (Cliente / Staff) */}
        {showModal && (
          <div className="admin-usuarios-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-usuarios-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-usuarios-modal-header">
                <h2>{modalType === 'CLIENTE' ? 'Registrar Nuevo Cliente' : 'Registrar Miembro del Staff'}</h2>
                <button className="admin-usuarios-modal-close" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="admin-usuarios-modal-content">
                <div className="admin-usuarios-info-banner">
                  {modalType === 'CLIENTE' ? <FaIdCard className="banner-icon client-icon" /> : <FaUserShield className="banner-icon" />}
                  <p>
                    {modalType === 'CLIENTE' 
                      ? 'Registre los datos del huésped en mostrador. Se le enviará un correo automáticamente con sus credenciales de acceso.'
                      : 'Registre cuentas con privilegios elevados (Administrador o Recepcionista). Las credenciales se enviarán por correo.'}
                  </p>
                </div>

                <div className="admin-usuarios-row-group">
                  <div className="admin-usuarios-form-group">
                    <label>Nombres *</label>
                    <input
                      type="text"
                      value={newUser.nombre}
                      onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                      placeholder="Ej: Carlos Alberto"
                      className={newUser.nombre.length > 0 && !isNameValid ? 'input-error' : ''}
                    />
                    {newUser.nombre.length > 0 && !isNameValid && <span className="error-text">Solo letras (mín. 2)</span>}
                  </div>
                  <div className="admin-usuarios-form-group">
                    <label>Apellidos *</label>
                    <input
                      type="text"
                      value={newUser.apellidos}
                      onChange={(e) => setNewUser({ ...newUser, apellidos: e.target.value })}
                      placeholder="Ej: García Pérez"
                      className={newUser.apellidos.length > 0 && !isLastNameValid ? 'input-error' : ''}
                    />
                    {newUser.apellidos.length > 0 && !isLastNameValid && <span className="error-text">Solo letras (mín. 2)</span>}
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
                        className={newUser.email.length > 0 && !isEmailValid ? 'input-error' : ''}
                      />
                    </div>
                    {newUser.email.length > 0 && !isEmailValid && <span className="error-text">Formato de correo inválido</span>}
                  </div>
                  <div className="admin-usuarios-form-group">
                    <label>Teléfono (9 dígitos) *</label>
                    <div className="input-with-icon">
                      <FaPhoneAlt className="input-icon" />
                      <input
                        type="text"
                        maxLength="9"
                        value={newUser.telefono}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, ''); // Solo números
                          setNewUser({ ...newUser, telefono: val });
                        }}
                        placeholder="Ej: 987654321"
                        className={newUser.telefono.length > 0 && !isPhoneValid ? 'input-error' : ''}
                      />
                    </div>
                    {newUser.telefono.length > 0 && !isPhoneValid && <span className="error-text">Debe tener exactamente 9 dígitos</span>}
                  </div>
                </div>

                <div className="admin-usuarios-divider"><span>Credenciales de Acceso</span></div>

                <div className="admin-usuarios-row-group">
                  <div className="admin-usuarios-form-group">
                    <label>Rol del Sistema *</label>
                    {modalType === 'CLIENTE' ? (
                      <input type="text" value="CLIENTE (Automático)" disabled className="input-locked" />
                    ) : (
                      <select
                        value={newUser.rol}
                        onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                      >
                        <option value="RECEPCIONISTA">Recepcionista</option>
                        <option value="ADMINISTRADOR">Administrador</option>
                      </select>
                    )}
                  </div>
                  <div className="admin-usuarios-form-group">
                    <label>Contraseña Temporal *</label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Mínimo 6 caracteres"
                      className={newUser.password.length > 0 && !isPasswordValid ? 'input-error' : ''}
                    />
                    {newUser.password.length > 0 && !isPasswordValid && <span className="error-text">Mínimo 6 caracteres requeridos</span>}
                  </div>
                </div>
              </div>

              <div className="admin-usuarios-modal-footer">
                <button className="admin-usuarios-btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button 
                  className="admin-usuarios-btn-confirm" 
                  onClick={handleRegisterUser}
                  disabled={!isFormValid} // Se deshabilita si no pasa la validación
                >
                  <FaCheck /> Confirmar Registro
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}