import { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaUsers,
  FaComment,
  FaAccessibleIcon,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa';
import '../styles/Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactChannels = [
    {
      title: 'Teléfono Principal',
      icon: FaPhone,
      color: '#3498db',
      info: '+51 (56) 222-0000',
      description: 'Llama directamente a recepción',
    },
    {
      title: 'Correo Administrativo',
      icon: FaEnvelope,
      color: '#e74c3c',
      info: 'info@arenadorada.com',
      description: 'Para consultas generales',
    },
    {
      title: 'Correo de Soporte',
      icon: FaEnvelope,
      color: '#f39c12',
      info: 'soporte@arenadorada.com',
      description: 'Para problemas técnicos',
    },
    {
      title: 'WhatsApp Directo',
      icon: FaPhone,
      color: '#2ecc71',
      info: '+51 999 123 456',
      description: 'Atención inmediata disponible',
    },
  ];

  const additionalInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Ubicación',
      content: 'Av. Juan de Loyola 1026, Ica - Perú',
      subtext: 'Centro histórico de la ciudad',
    },
    {
      icon: FaClock,
      title: 'Recepción 24/7',
      content: 'Abierto los 365 días del año',
      subtext: 'Disponible para check-in y check-out a cualquier hora',
    },
    {
      icon: FaUsers,
      title: 'Grupos Corporativos',
      content: 'Cotización personalizada',
      subtext: 'Contacta a nuestro gerente de ventas',
    },
    {
      icon: FaComment,
      title: 'Feedback',
      content: 'Tu opinión es importante',
      subtext: 'Cuéntanos tu experiencia',
    },
  ];

  const faqs = [
    {
      question: '¿Cómo puedo hacer una reserva?',
      answer:
        'Puedes reservar directamente a través de nuestra plataforma web, llamando al teléfono de recepción o enviando un correo con tus datos.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos transferencias bancarias, tarjetas de crédito, tarjetas de débito y efectivo en recepción.',
    },
    {
      question: '¿El hostal es accesible para personas con movilidad reducida?',
      answer:
        'Sí, contamos con rampas de acceso, baños adaptados y áreas comunes diseñadas para la accesibilidad.',
    },
    {
      question: '¿Puedo cancelar mi reserva?',
      answer:
        'Las cancelaciones están sujetas a nuestra política. Las cancelaciones con 48 horas de anticipación reciben reembolso completo.',
    },
    {
      question: '¿Hay servicio de transporte desde el aeropuerto?',
      answer:
        'Podemos coordinar transporte. Consulta con recepción para más información sobre tarifas y disponibilidad.',
    },
    {
      question: '¿Ofrecen tours y actividades?',
      answer:
        'Sí, contamos con asociaciones con operadores locales. Podemos recomendar y coordinar tours a Huacachina, bodegas y otros atractivos.',
    },
  ];

  return (
    <div className="contacto-container">
      {/* Hero Section */}
      <div className="contacto-hero">
        <div className="contacto-hero-overlay" />
        <div className="contacto-hero-content">
          <h1 className="contacto-title">Contáctanos</h1>
          <p className="contacto-subtitle">
            Estamos aquí para ayudarte. Comunícate con nosotros de la forma que prefieras
          </p>
        </div>
      </div>

      {/* Contact Channels Section */}
      <section className="contacto-channels-section">
        <div className="contacto-channels-container">
          <h2 className="contacto-section-title">Canales de Atención</h2>
          <div className="contacto-channels-grid">
            {contactChannels.map((channel, idx) => {
              const IconComponent = channel.icon;
              return (
                <div
                  key={idx}
                  className="contacto-channel-card"
                  style={{
                    borderTopColor: channel.color,
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s backwards`,
                  }}
                >
                  <div
                    className="contacto-channel-icon"
                    style={{ backgroundColor: `${channel.color}20` }}
                  >
                    <IconComponent style={{ color: channel.color }} size={32} />
                  </div>
                  <h3 className="contacto-channel-title">{channel.title}</h3>
                  <p className="contacto-channel-info">{channel.info}</p>
                  <p className="contacto-channel-description">{channel.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contacto-main-section">
        <div className="contacto-main-container">
          {/* Form */}
          <div className="contacto-form-wrapper">
            <h2 className="contacto-form-title">Envíanos un Mensaje</h2>
            <p className="contacto-form-subtitle">
              Completa el formulario y nos pondremos en contacto pronto
            </p>

            {submitted ? (
              <div className="contacto-success-message">
                <FaCheckCircle size={48} />
                <h3>¡Mensaje Enviado!</h3>
                <p>Gracias por tu mensaje. Nos comunicaremos pronto.</p>
              </div>
            ) : (
              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="contacto-form-group">
                  <label htmlFor="nombre" className="contacto-label">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="contacto-input"
                  />
                </div>

                <div className="contacto-form-group">
                  <label htmlFor="correo" className="contacto-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    required
                    className="contacto-input"
                  />
                </div>

                <div className="contacto-form-group">
                  <label htmlFor="asunto" className="contacto-label">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    placeholder="Asunto de tu consulta"
                    required
                    className="contacto-input"
                  />
                </div>

                <div className="contacto-form-group">
                  <label htmlFor="mensaje" className="contacto-label">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows="5"
                    required
                    className="contacto-textarea"
                  />
                </div>

                <button type="submit" className="contacto-submit-btn">
                  <FaPaperPlane /> Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          {/* Info Cards */}
          <div className="contacto-info-wrapper">
            <div className="contacto-info-cards">
              {additionalInfo.map((info, idx) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={idx}
                    className="contacto-info-card"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1 + 0.4}s backwards`,
                    }}
                  >
                    <div className="contacto-info-icon">
                      <IconComponent size={28} />
                    </div>
                    <h3 className="contacto-info-title">{info.title}</h3>
                    <p className="contacto-info-content">{info.content}</p>
                    <p className="contacto-info-subtext">{info.subtext}</p>
                  </div>
                );
              })}
            </div>

            {/* Location Card */}
            <div className="contacto-location-card">
              <div className="contacto-location-placeholder">
                <FaMapMarkerAlt size={48} />
                <p>Mapa Interactivo</p>
              </div>
              <div className="contacto-location-details">
                <h3>Visítanos</h3>
                <p>
                  <strong>Dirección:</strong> Av. Juan de Loyola 1026<br />
                  <strong>Ciudad:</strong> Ica, Perú<br />
                  <strong>Referencia:</strong> Cerca de la Plaza Principal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="contacto-services-section">
        <h2 className="contacto-section-title">Servicios Especiales</h2>
        <div className="contacto-services-grid">
          <div className="contacto-service-card">
            <FaUsers size={40} />
            <h3>Reservas Corporativas</h3>
            <p>
              Ofertas especiales para empresas y grupos. Contáctanos para cotizaciones
              personalizadas y paquetes a medida.
            </p>
          </div>

          <div className="contacto-service-card">
            <FaComment size={40} />
            <h3>Sugerencias y Reclamos</h3>
            <p>
              Tu opinión nos importa. Queremos mejorar continuamente. Envíanos tus
              comentarios y sugerencias.
            </p>
          </div>

          <div className="contacto-service-card">
            <FaAccessibleIcon size={40} />
            <h3>Accesibilidad</h3>
            <p>
              Contamos con facilidades para personas con movilidad reducida. Consulta
              disponibilidad de habitaciones adaptadas.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contacto-faq-section">
        <h2 className="contacto-section-title">Preguntas Frecuentes</h2>
        <div className="contacto-faq-container">
          <div className="contacto-faq-grid">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="contacto-faq-item"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.08}s backwards`,
                }}
              >
                <div className="contacto-faq-question">
                  <FaArrowRight className="contacto-faq-icon" />
                  <h4>{faq.question}</h4>
                </div>
                <p className="contacto-faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contacto-cta-section">
        <div className="contacto-cta-content">
          <h2 className="contacto-cta-title">¿Aún tienes dudas?</h2>
          <p className="contacto-cta-text">
            Nuestro equipo está disponible para ayudarte en cualquier momento
          </p>
          <div className="contacto-cta-buttons">
            <button className="contacto-cta-btn primary">Llamar Ahora</button>
            <button className="contacto-cta-btn secondary">Enviar Email</button>
          </div>
        </div>
      </section>
    </div>
  );
}
