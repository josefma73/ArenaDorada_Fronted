import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBed,
  FaTag,
  FaBox,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
} from 'react-icons/fa';
import './AdminSidebar.css';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: FaHome, label: 'Inicio', path: '/administrador/inicio' },
    { icon: FaBed, label: 'Habitaciones', path: '/administrador/habitaciones' },
    { icon: FaTag, label: 'Categorías', path: '/administrador/categorias' },
    { icon: FaBox, label: 'Productos', path: '/administrador/productos' },
    { icon: FaCalendarAlt, label: 'Reservas', path: '/administrador/reservas' },
    { icon: FaUsers, label: 'Usuarios', path: '/administrador/usuarios' },
  ];

  const handleLogout = () => {
    localStorage.clear(); // Limpiar el almacenamiento local al cerrar sesión

    // Aquí iría la lógica de logout
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      {/* Logo Section */}
      <div className="admin-sidebar-logo">
        <div className="admin-logo-container">
          <svg viewBox="0 0 200 200" className="admin-logo-svg">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#C5A059" strokeWidth="2"/>
            <circle cx="100" cy="60" r="8" fill="#C5A059"/>
            <line x1="100" y1="68" x2="100" y2="140" stroke="#C5A059" strokeWidth="2"/>
            <line x1="70" y1="100" x2="130" y2="100" stroke="#C5A059" strokeWidth="2"/>
            <circle cx="100" cy="100" r="15" fill="none" stroke="#C5A059" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="admin-logo-text">
          <h1>ARENA</h1>
          <p>DORADA</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="admin-sidebar-nav">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={index}
              className={`admin-menu-item ${active ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              title={item.label}
            >
              <IconComponent className="admin-menu-icon" />
              <span className="admin-menu-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button className="admin-logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="admin-logout-icon" />
        <span>Cerrar Sesión</span>
      </button>
    </aside>
  );
}
