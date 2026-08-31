import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import '../footer/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Habitaciones', href: '#habitaciones' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Promociones', href: '#promociones' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contacto', href: '#contacto' },
    { label: 'Iniciar Sesión', href: '#login' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Ubicanos',
      value: 'Av. Juan de Loyola 1026, Ica, Perú',
      ariaLabel: 'Dirección',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+51 970-678-393',
      ariaLabel: 'Número de teléfono',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@arenadorada.com',
      ariaLabel: 'Correo electrónico',
    },
  ];

  return (
    <footer className="ft-footer__container">
      <div className="ft-footer__wrapper">
        <div className="ft-footer__grid">
          <section>
            <h3 className="ft-footer__section-title">Hostal Arena Dorada</h3>
            <p className="ft-footer__section-text">
              Tu refugio de lujo en el corazón de Ica, Perú. Ofrecemos una experiencia única combinando comfort, elegancia y servicio excepcional.
            </p>
            <ul className="ft-footer__social-list">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-footer__social-link"
                  aria-label="Síguenos en Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-footer__social-link"
                  aria-label="Síguenos en Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-footer__social-link"
                  aria-label="Síguenos en Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="ft-footer__section-title">Enlaces Rápidos</h3>
            <ul className="ft-footer__link-list">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="ft-footer__link">{link.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="ft-footer__section-title">Contacto</h3>
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className="ft-footer__contact-item">
                  <div className="ft-footer__contact-icon">
                    <Icon size={20} />
                  </div>
                  <div className="ft-footer__contact-info">
                    <strong>{info.label}</strong>
                    <span aria-label={info.ariaLabel}>{info.value}</span>
                  </div>
                </div>
              );
            })}
          </section>
        </div>

        <div className="ft-footer__copyright">
          <p>
            &copy; {currentYear} Hostal Arena Dorada. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
