'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import '../styles/Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    tipoUsuario: 'estudiante',
    mensaje: '',
  });

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({
      nombre: '',
      correo: '',
      tipoUsuario: 'estudiante',
      mensaje: '',
    });
  };

  const faqs = [
    {
      id: 1,
      pregunta: '¿Cuál es el proceso para reservar una habitación?',
      respuesta:
        'El proceso es sencillo: 1) Busca y selecciona la habitación que te guste, 2) Revisa los detalles y el contrato, 3) Completa tu perfil y verificación, 4) Realiza el pago de la reserva, 5) ¡Listo! Recibirás la confirmación por correo.',
    },
    {
      id: 2,
      pregunta: '¿Qué incluye la verificación de identidad?',
      respuesta:
        'La verificación incluye confirmación de DNI válido, validación de matrícula universitaria, y verificación de referencias. Esto nos ayuda a mantener una comunidad segura para todos.',
    },
    {
      id: 3,
      pregunta: '¿Cuáles son las políticas de cancelación?',
      respuesta:
        'Puedes cancelar con 30 días de anticipación para recibir reembolso completo, o 15 días para reembolso del 50%. Cancelaciones menores a 15 días no son reembolsables.',
    },
    {
      id: 4,
      pregunta: '¿Cómo funciona el servicio de soporte?',
      respuesta:
        'Contamos con soporte disponible 24/7. Puedes comunicarte por correo, WhatsApp o teléfono. Nos comprometemos a responder en máximo 2 horas hábiles.',
    },
    {
      id: 5,
      pregunta: '¿Hay costos ocultos?',
      respuesta:
        'No. El precio que ves es el precio que pagas. No hay comisiones, tasas o cargos adicionales. Todo está incluido en el costo mensual.',
    },
    {
      id: 6,
      pregunta: '¿Puedo cambiar de habitación durante mi contrato?',
      respuesta:
        'Sí, puedes solicitar cambio de habitación bajo ciertas condiciones. Comunícate con nuestro equipo de soporte para evaluar disponibilidad y opciones.',
    },
  ];

  return (
    <div className="contacto-container">
      {/* Hero Section */}
      <section className="contacto-hero">
        <div className="hero-content">
          <h1 className="hero-title">Contacto</h1>
          <p className="hero-subtitle">
            ¿Tienes preguntas? Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className="contact-main-section">
        <div className="contact-wrapper">
          {/* Contact Info */}
          <div className="contact-info-column">
            <h2 className="column-title">Información de Contacto</h2>

            <div className="contact-channels">
              <div className="contact-channel">
                <div className="channel-icon">
                  <Mail size={32} />
                </div>
                <div className="channel-content">
                  <h3 className="channel-title">Email</h3>
                  <a href="mailto:soporte@roomica.com" className="channel-link">
                    soporte@roomica.com
                  </a>
                </div>
              </div>

              <div className="contact-channel">
                <div className="channel-icon">
                  <Phone size={32} />
                </div>
                <div className="channel-content">
                  <h3 className="channel-title">WhatsApp (Emergencias Financieras)</h3>
                  <a href="https://wa.me/51956123456" className="channel-link">
                    +51 956 123 456
                  </a>
                </div>
              </div>

              <div className="contact-channel">
                <div className="channel-icon">
                  <MapPin size={32} />
                </div>
                <div className="channel-content">
                  <h3 className="channel-title">Ubicación</h3>
                  <p className="channel-text">Avenida Grau 456, Ica, Perú</p>
                </div>
              </div>
            </div>

            <div className="hours-section">
              <h3 className="hours-title">Horario de Atención</h3>
              <ul className="hours-list">
                <li>Lunes - Viernes: 9:00 AM - 6:00 PM</li>
                <li>Sábado: 10:00 AM - 2:00 PM</li>
                <li>Domingo: Cerrado (emergencias: 24/7)</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-column">
            <h2 className="column-title">Envíanos un Mensaje</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-input"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="correo" className="form-label">
                  Correo Institucional
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="form-input"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.edu.pe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipoUsuario" className="form-label">
                  Tipo de Usuario
                </label>
                <select
                  id="tipoUsuario"
                  name="tipoUsuario"
                  className="form-select"
                  value={formData.tipoUsuario}
                  onChange={handleInputChange}
                >
                  <option value="estudiante">Estudiante</option>
                  <option value="propietario">Propietario</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje" className="form-label">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className="form-textarea"
                  rows="5"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-wrapper">
          <div className="faq-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-description">
              Encuentra respuestas a las preguntas más comunes
            </p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-button ${expandedFAQ === faq.id ? 'expanded' : ''}`}
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                  }
                  aria-expanded={expandedFAQ === faq.id}
                >
                  <span className="faq-question">{faq.pregunta}</span>
                  <ChevronDown size={20} className="faq-icon" />
                </button>

                {expandedFAQ === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
