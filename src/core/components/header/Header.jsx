import React from 'react';
import '../header/Header.css';

const Header = ({ onNavClick = () => {}, currentPage = 'inicio' }) => {
  const navLinks = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Habitaciones', id: 'habitaciones' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Promociones', id: 'promociones' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contacto', id: 'contacto' },
  ];

  const handleNavClick = (id) => {
    onNavClick(id);
    announceSection(`Sección ${id}`);
  };

  const announceSection = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLoginClick = () => {
    announceSection('Abrir sesión');
  };

  return (
    <header className="hd-header__container">
      <div className="hd-header__wrapper">
        <a href="/" className="hd-header__logo">
          ARENA DORADA
        </a>
        
        <nav>
          <ul className="hd-header__nav">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="hd-header__nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.label);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hd-header__actions">
          <button
            className="hd-header__session-btn"
            onClick={handleLoginClick}
            aria-label="Iniciar sesión"
          >
            INICIAR SESIÓN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
