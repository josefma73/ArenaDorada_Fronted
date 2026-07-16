import { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShieldAlt,
  FaTimes,
  FaEdit,
  FaKey,
  FaCheck,
  FaSearch,
  FaPlus,
  FaGoogle,
  FaCalendarAlt,
} from 'react-icons/fa';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import '../styles/AdministradorUsuarios.css';

export default function AdministradorUsuarios() {
  const [users, setUsers] = useState([
    {
      id: 1,
      nombre: 'Juan',
      apellidos: 'Pérez García',
      email: 'juan.perez@email.com',
      telefono: '951234567',
      rol: 'Administrador',
      google_auth: false,
      activo: true,
      fecha_creacion: '2024-01-15',
    },
    {
      id: 2,
      nombre: 'María',
      apellidos: 'López Ruiz',
      email: 'maria.lopez@email.com',
      telefono: '952345678',
      rol: 'Recepcionista',
      google_auth: true,
      activo: true,
      fecha_creacion: '2024-02-20',
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellidos: 'Sánchez Toro',
      email: 'carlos.sanchez@email.com',
      telefono: '953456789',
      rol: 'Cliente',
      google_auth: false,
      activo: true,
      fecha_creacion: '2024-03-10',
    },
    {
      id: 4,
      nombre: 'Ana',
      apellidos: 'Martínez Cruz',
      email: 'ana.martinez@email.com',
      telefono: '954567890',
      rol: 'Recepcionista',
      google_auth: false,
      activo: false,
      fecha_creacion: '2024-01-05',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const getRolColor = (rol) => {
    switch (rol) {
      case 'Administrador':
        return 'rol-admin';
      case 'Recepcionista':
        return 'rol-recep';
      case 'Cliente':
        return 'rol-cliente';
      default:
        return '';
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser({ ...user });
    setShowModal(true);
  };

  const handleDisable = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, activo: false } : u)));
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u)));
  };

  const handleSaveChanges = () => {
    if (selectedUser && editingField) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? { ...u, [editingField]: editValue }
            : u
        )
      );
      setEditingField(null);
      setEditValue('');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-usuarios-container">
      <AdminSidebar />
      <AdminHeader title="Gestión de Usuarios" />

      <main className="admin-usuarios-workspace">
        {/* Header */}
        <div className="admin-usuarios-header">
          <h2 className="admin-usuarios-title">Usuarios del Sistema</h2>
          <button className="admin-usuarios-add-btn">
            <FaPlus /> Nuevo Usuario
          </button>
        </div>

        {/* Search Bar */}
        <div className="admin-usuarios-search">
          <div className="admin-search-box">
            <FaSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <span className="admin-search-result">
            {filteredUsers.length} usuario(s) encontrado(s)
          </span>
        </div>

        {/* Users Table */}
        <div className="admin-usuarios-table-wrapper">
          <table className="admin-usuarios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario / Nombre</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Autenticación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`estado-${user.activo ? 'activo' : 'inactivo'}`}>
                  <td className="admin-table-id">#{user.id}</td>
                  <td className="admin-table-nombre">
                    <div className="admin-user-cell">
                      <div className="admin-user-avatar">
                        {user.nombre[0]}{user.apellidos[0]}
                      </div>
                      <div>
                        <strong>{user.nombre} {user.apellidos}</strong>
                      </div>
                    </div>
                  </td>
                  <td className="admin-table-email">
                    <FaEnvelope size={14} /> {user.email}
                  </td>
                  <td className="admin-table-telefono">
                    <FaPhone size={14} /> {user.telefono}
                  </td>
                  <td>
                    <span className={`admin-rol-badge ${getRolColor(user.rol)}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="admin-table-auth">
                    {user.google_auth ? (
                      <span className="admin-auth-badge google">
                        <FaGoogle /> Google
                      </span>
                    ) : (
                      <span className="admin-auth-badge local">Local</span>
                    )}
                  </td>
                  <td className="admin-table-estado">
                    <button
                      className={`admin-status-toggle ${user.activo ? 'activo' : 'inactivo'}`}
                      onClick={() => handleToggleStatus(user.id)}
                      title={user.activo ? 'Activo' : 'Inactivo'}
                    >
                      <FaCheck /> {user.activo ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="admin-table-acciones">
                    <button
                      className="admin-action-detail"
                      onClick={() => handleViewDetails(user)}
                    >
                      <FaEdit /> Detalles
                    </button>
                    {user.activo && (
                      <button
                        className="admin-action-disable"
                        onClick={() => handleDisable(user.id)}
                      >
                        <FaTimes /> Inhabilitar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && selectedUser && (
          <div className="admin-usuarios-modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="admin-usuarios-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="admin-modal-header">
                <div className="admin-modal-user-info">
                  <div className="admin-modal-avatar">
                    {selectedUser.nombre[0]}{selectedUser.apellidos[0]}
                  </div>
                  <div>
                    <h2 className="admin-modal-name">
                      {selectedUser.nombre} {selectedUser.apellidos}
                    </h2>
                    <p className="admin-modal-rol">{selectedUser.rol}</p>
                  </div>
                </div>
                <button
                  className="admin-modal-close"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Content */}
              <div className="admin-modal-content">
                {/* Datos Personales */}
                <section className="admin-modal-section">
                  <h3 className="admin-modal-section-title">Datos Personales</h3>
                  <div className="admin-modal-form">
                    <div className="admin-form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        value={
                          editingField === 'nombre'
                            ? editValue
                            : selectedUser.nombre
                        }
                        onChange={(e) => setEditValue(e.target.value)}
                        onFocus={() => {
                          setEditingField('nombre');
                          setEditValue(selectedUser.nombre);
                        }}
                        className={editingField === 'nombre' ? 'editing' : ''}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Apellidos</label>
                      <input
                        type="text"
                        value={
                          editingField === 'apellidos'
                            ? editValue
                            : selectedUser.apellidos
                        }
                        onChange={(e) => setEditValue(e.target.value)}
                        onFocus={() => {
                          setEditingField('apellidos');
                          setEditValue(selectedUser.apellidos);
                        }}
                        className={editingField === 'apellidos' ? 'editing' : ''}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={
                          editingField === 'email'
                            ? editValue
                            : selectedUser.email
                        }
                        onChange={(e) => setEditValue(e.target.value)}
                        onFocus={() => {
                          setEditingField('email');
                          setEditValue(selectedUser.email);
                        }}
                        className={editingField === 'email' ? 'editing' : ''}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Teléfono</label>
                      <input
                        type="tel"
                        value={
                          editingField === 'telefono'
                            ? editValue
                            : selectedUser.telefono
                        }
                        onChange={(e) => setEditValue(e.target.value)}
                        onFocus={() => {
                          setEditingField('telefono');
                          setEditValue(selectedUser.telefono);
                        }}
                        className={editingField === 'telefono' ? 'editing' : ''}
                      />
                    </div>
                  </div>
                </section>

                {/* Seguridad */}
                <section className="admin-modal-section">
                  <h3 className="admin-modal-section-title">
                    <FaShieldAlt /> Seguridad
                  </h3>
                  <div className="admin-security-info">
                    <div className="admin-security-item">
                      <span className="admin-security-label">Tipo de Autenticación:</span>
                      <span className="admin-security-value">
                        {selectedUser.google_auth ? 'Google Auth' : 'Registro Local'}
                      </span>
                    </div>
                    <div className="admin-security-item">
                      <span className="admin-security-label">Fecha de Registro:</span>
                      <span className="admin-security-value">
                        <FaCalendarAlt /> {selectedUser.fecha_creacion}
                      </span>
                    </div>
                  </div>
                  {selectedUser.rol !== 'Cliente' && (
                    <button className="admin-reset-password-btn">
                      <FaKey /> Restablecer Contraseña
                    </button>
                  )}
                </section>
              </div>

              {/* Modal Footer */}
              <div className="admin-modal-footer">
                <button
                  className="admin-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                {editingField && (
                  <button className="admin-btn-save" onClick={handleSaveChanges}>
                    Guardar Cambios
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
