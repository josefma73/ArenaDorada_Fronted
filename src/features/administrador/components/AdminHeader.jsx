import { useState } from 'react';
import { FaUser, FaCog, FaChevronDown } from 'react-icons/fa';
import './AdminHeader.css';

export default function AdminHeader({ title = 'Panel de Administración' }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h2 className="admin-header-title">{title}</h2>
        <p className="admin-header-subtitle">Panel de Administración &gt; {title}</p>
      </div>

      <div className="admin-header-center">
        <div className="admin-header-info">
          <span className="admin-header-date">Ica, {currentDate}</span>
          <div className="admin-server-status">
            <div className="admin-status-dot online"></div>
            <span className="admin-status-text">Servidor conectado</span>
          </div>
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-user-section">
          <button
            className="admin-user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="admin-user-avatar">
              <FaUser />
            </div>
            <FaChevronDown className={`admin-chevron ${showUserMenu ? 'active' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="admin-user-menu">
              <button className="admin-menu-option">
                <FaUser /> Ver Perfil
              </button>
              <button className="admin-menu-option">
                <FaCog /> Configuración
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
