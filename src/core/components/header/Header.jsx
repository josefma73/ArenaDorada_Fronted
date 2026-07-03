'use client';

import React, { useState } from 'react';
import { User, ShoppingCart } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [cartCount] = useState(0);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Habitaciones', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="header-container">
      <div className="header-wrapper">
        {/* Logo */}
        <div className="header-logo">
          <h1>RoomIca</h1>
        </div>

        {/* Navigation Links */}
        <nav className="header-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Icons */}
        <div className="header-actions">
          <button className="action-btn profile-btn" aria-label="Perfil de usuario">
            <User size={24} />
          </button>
          <div className="cart-wrapper">
            <button className="action-btn cart-btn" aria-label="Carrito de reservas">
              <ShoppingCart size={24} />
            </button>
            {cartCount > 0 && (
              <span className="cart-counter">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
