import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import {
  FaHotel,
  FaUserCircle,
} from "react-icons/fa";

import "./Header.css";

const navigation = [
  {
    name: "Inicio",
    path: "/inicio",
  },
  {
    name: "Habitaciones",
    path: "/habitaciones",
  },
  {
    name: "Servicios",
    path: "/servicios",
  },
  {
    name: "Promociones",
    path: "/promociones",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Contacto",
    path: "/contacto",
  },
];

function Header() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    closeMenu();
  };

  const handleReservation = () => {
    navigate("/habitaciones");
    closeMenu();
  };

  return (
    <header
      className={`hd-header ${
        isScrolled ? "hd-header--scrolled" : ""
      }`}
    >
      <div className="hd-header__container">

        {/* ================= LOGO ================= */}

        <NavLink
          to="/inicio"
          className="hd-header__logo"
        >
          <div className="hd-header__logo-icon">
            <FaHotel />
          </div>

          <div className="hd-header__logo-text">
            <span className="hd-header__brand">
              Arena Dorada
            </span>

            <span className="hd-header__subtitle">
              Hotel & Resort
            </span>
          </div>
        </NavLink>

        {/* ================= NAV ================= */}

        <nav
          className={`hd-header__nav ${
            menuOpen ? "hd-header__nav--active" : ""
          }`}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "hd-header__link hd-header__link--active"
                  : "hd-header__link"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* ================= BOTONES ================= */}

        <div className="hd-header__actions">

          <button
            className="hd-header__reservation-btn"
            onClick={handleReservation}
          >
            Reservar ahora
          </button>

          <button
            className="hd-header__login-btn"
            onClick={handleLogin}
          >
            <FaUserCircle />
            <span>Iniciar sesión</span>
          </button>

          <button
            className="hd-header__menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Abrir menú"
          >
            {menuOpen ? (
              <HiOutlineXMark />
            ) : (
              <HiOutlineBars3 />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;
