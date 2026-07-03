'use client';

import React from 'react';
import { Heart, Share2, MessageCircle, Phone, Mail, MapPin, FileText } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1: Logo and Social */}
        <div className="footer-column">
          <div className="footer-logo">
            <h2>RoomIca</h2>
          </div>
          <p className="footer-description">
            Conectando estudiantes con habitaciones verificadas y seguras
          </p>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
              <Heart size={20} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="social-link" target="_blank" rel="noopener noreferrer">
              <Share2 size={20} />
            </a>
            <a href="https://wa.me/51956123456" aria-label="WhatsApp" className="social-link" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Explore */}
        <div className="footer-column">
          <h3 className="footer-column-title">Explora</h3>
          <ul className="footer-links">
            <li><a href="/" className="footer-link">Inicio</a></li>
            <li><a href="/" className="footer-link">Habitaciones</a></li>
            <li><a href="/" className="footer-link">Reservas</a></li>
            <li><a href="/" className="footer-link">Promociones</a></li>
            <li><a href="/contacto" className="footer-link">Contacto</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-column">
          <h3 className="footer-column-title">Contacto</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Horario:</span>
              <p>Lun - Vie: 9:00 AM - 6:00 PM</p>
              <p>Sábado: 10:00 AM - 2:00 PM</p>
            </div>
            <div className="contact-item">
              <span className="contact-label">Teléfono:</span>
              <a href="tel:+51956123456" className="contact-link">+51 956 123 456</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:soporte@roomica.com" className="contact-link">soporte@roomica.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Dirección:</span>
              <p>Avenida Grau 456, Ica, Perú</p>
            </div>
          </div>
        </div>

        {/* Column 4: Legal */}
        <div className="footer-column">
          <h3 className="footer-column-title">Legal</h3>
          <ul className="footer-links">
            <li><a href="/terminos" className="footer-link">Términos de Servicio</a></li>
            <li><a href="/privacidad" className="footer-link">Política de Privacidad</a></li>
            <li><a href="/reclamaciones" className="footer-link">Libro de Reclamaciones</a></li>
          </ul>
          <div className="ruc-info">
            <p className="ruc-label">RUC: 20654321234</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="copyright">
          &copy; 2024 RoomIca. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
