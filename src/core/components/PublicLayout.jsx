// src/core/components/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // <--- OBLIGATORIO para React Router DOM
import Header from './header/Header';       // Ajustado a tu estructura real de carpetas
import Footer from './footer/Footer';       // Ajustado a tu estructura real de carpetas
import AccessibilityPanel from './AccessibilityPanel'; // Si está en la misma raíz de core/components
import './PublicLayout.css';

export default function PublicLayout() {
  return (
    <div className="public-layout">
      {/* 1. Header fijo en la parte superior */}
      <Header />
      
      {/* 2. El Outlet reemplaza a {children} e inyecta dinámicamente Home, Servicios, etc. */}
      <main className="main-content">
        <Outlet /> 
      </main>
      
      {/* 3. Footer fijo en la parte inferior */}
      <Footer />
      
      {/* 4. Panel de Accesibilidad flotante de Alta Fidelidad */}
      <AccessibilityPanel />
    </div>
  );
}