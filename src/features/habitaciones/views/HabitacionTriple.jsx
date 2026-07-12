import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBed,
  FaWifi,
  FaTv,
  FaThermometerHalf,
  FaUsers,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaClock,
  FaDoorOpen,
  FaCalendarAlt,
  FaStar,
  FaWineGlass,
} from 'react-icons/fa';
import '../styles/HabitacionTriple.css';

export default function HabitacionTriple() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  const characteristics = [
    {
      title: 'Espacio Amplio',
      description: '3 camas individuales o combinaciones variables con distribuidor amplio.',
      included: true,
    },
    {
      title: 'Ideal para Grupos',
      description: 'Diseñada para 3-4 personas con mayor espacio de almacenamiento.',
      included: true,
    },
    {
      title: 'Baño Completo',
      description: 'Baño privado moderno con ducha, espejo ampliado y amenities premium.',
      included: true,
    },
    {
      title: 'Acceso Piscina Gratis',
      description: 'Disfruta de la piscina climatizada sin costo adicional durante tu estancia.',
      included: true,
    },
  ];

  const amenities = [
    { icon: FaWifi, label: 'Wi-Fi de Alta Velocidad 24/7', included: true },
    { icon: FaTv, label: 'Televisión LCD con Cable Premium', included: true },
    { icon: FaThermometerHalf, label: 'Agua Caliente 24 Horas', included: true },
    { icon: FaDoorOpen, label: 'Múltiples Tomacorrientes', included: true },
    { icon: FaWineGlass, label: 'Acceso Gratis al Bar', included: true },
  ];

  const pricing = [
    { duration: 'Por día completo', price: 'S/. 95', highlight: true },
    { duration: 'Por 2 noches', price: 'S/. 175', highlight: false },
    { duration: 'Por 1 semana', price: 'S/. 580', highlight: false },
  ];

  const policies = [
    { label: 'Check-In', value: 'A partir de las 14:00 hrs' },
    { label: 'Check-Out', value: 'Hasta las 11:00 hrs' },
    { label: 'Cancelación', value: 'Hasta 24 hrs antes sin cargo' },
    { label: 'Máximo Ocupantes', value: '3-4 adultos' },
  ];

  const addOns = [
    { name: 'Cena Premium 3 Platos', price: 'S/. 40', description: 'Menú ejecutivo con bebida' },
    { name: 'Desayuno Bufet Completo', price: 'S/. 22', description: 'Incluye bebidas calientes' },
    { name: 'Late Checkout (14:00)', price: 'S/. 35', description: 'Extiende tu estancia 3 horas' },
  ];

  return (
    <div className="triple-room-container">
      {/* Header */}
      <div className="triple-room-header">
        <button className="triple-room-back-btn" onClick={() => navigate('/habitaciones')}>
          <FaArrowLeft /> Volver
        </button>
        <h1 className="triple-room-title">Habitación Triple</h1>
        <p className="triple-room-subtitle">Espacios para grupos con acceso gratis a piscina y bar</p>
      </div>

      {/* Premium Badge */}
      <div className="triple-room-premium-banner">
        <FaStar className="triple-room-star" />
        <p className="triple-room-premium-text">Acceso Gratis a Piscina y Bar - Experiencia Premium Incluida</p>
      </div>

      {/* Hero Section */}
      <div className="triple-room-hero">
        <img
          src="/habitacion-triple-detail.png"
          alt="Habitación Triple"
          className="triple-room-hero-image"
        />
        <div className="triple-room-hero-overlay">
          <div className="triple-room-price-tag">
            <p className="triple-room-price-from">Desde</p>
            <p className="triple-room-price-amount">S/. 85</p>
            <p className="triple-room-price-unit">por noche</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="triple-room-nav-tabs">
        <button
          className={`triple-room-tab ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          Descripción General
        </button>
        <button
          className={`triple-room-tab ${selectedTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setSelectedTab('amenities')}
        >
          Amenidades
        </button>
        <button
          className={`triple-room-tab ${selectedTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setSelectedTab('pricing')}
        >
          Precios
        </button>
        <button
          className={`triple-room-tab ${selectedTab === 'policies' ? 'active' : ''}`}
          onClick={() => setSelectedTab('policies')}
        >
          Políticas
        </button>
      </div>

      {/* Content Sections */}
      <div className="triple-room-content">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <section className="triple-room-section overview-section">
            <h2 className="triple-room-section-title">Descripción de la Habitación</h2>
            <div className="triple-room-characteristics">
              {characteristics.map((char, idx) => (
                <div key={idx} className="triple-room-characteristic-card">
                  <div className="triple-room-characteristic-header">
                    <div className="triple-room-characteristic-icon">
                      {char.included ? <FaCheck /> : <FaTimes />}
                    </div>
                    <h3 className="triple-room-characteristic-title">{char.title}</h3>
                  </div>
                  <p className="triple-room-characteristic-desc">{char.description}</p>
                </div>
              ))}
            </div>

            <div className="triple-room-info-box premium-highlight">
              <h3 className="triple-room-info-title">
                <FaStar className="triple-room-icon-inline" /> Beneficios Premium Incluidos
              </h3>
              <ul className="triple-room-info-list">
                <li>Acceso ilimitado a la piscina climatizada durante toda la estancia</li>
                <li>Entrada libre al bar Arena Dorada con consumos facturados por separado</li>
                <li>Horario preferencial para reservar áreas comunes</li>
                <li>Protocolo de sanitización profunda tras cada salida</li>
                <li>Servicio de concierge disponible 24/7</li>
              </ul>
            </div>

            <div className="triple-room-info-box">
              <h3 className="triple-room-info-title">Información Importante</h3>
              <ul className="triple-room-info-list">
                <li>Aforo máximo: 3-4 adultos (sujeto a validación de espacios)</li>
                <li>Sistema de validación automática al reservar</li>
                <li>Brazaletes de acceso a zonas premium incluidos</li>
              </ul>
            </div>
          </section>
        )}

        {/* Amenities Tab */}
        {selectedTab === 'amenities' && (
          <section className="triple-room-section amenities-section">
            <h2 className="triple-room-section-title">Amenidades Incluidas</h2>
            <div className="triple-room-amenities-grid">
              {amenities.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={idx}
                    className={`triple-room-amenity ${amenity.included ? 'included' : 'unavailable'}`}
                  >
                    <div className="triple-room-amenity-icon">
                      <Icon />
                    </div>
                    <p className="triple-room-amenity-label">{amenity.label}</p>
                    <div className="triple-room-amenity-status">
                      {amenity.included ? <FaCheck /> : <FaTimes />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="triple-room-addons">
              <h3 className="triple-room-addons-title">Servicios Adicionales</h3>
              <div className="triple-room-addons-grid">
                {addOns.map((addon, idx) => (
                  <div key={idx} className="triple-room-addon-card">
                    <div className="triple-room-addon-header">
                      <h4 className="triple-room-addon-name">{addon.name}</h4>
                      <p className="triple-room-addon-price">{addon.price}</p>
                    </div>
                    <p className="triple-room-addon-desc">{addon.description}</p>
                    <button className="triple-room-addon-btn">Agregar</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tab */}
        {selectedTab === 'pricing' && (
          <section className="triple-room-section pricing-section">
            <h2 className="triple-room-section-title">Opciones de Tarifa</h2>
            <div className="triple-room-pricing-grid">
              {pricing.map((option, idx) => (
                <div
                  key={idx}
                  className={`triple-room-price-card ${option.highlight ? 'highlighted' : ''}`}
                >
                  {option.highlight && <div className="triple-room-best-badge">Mejor Valor</div>}
                  <p className="triple-room-price-duration">{option.duration}</p>
                  <p className="triple-room-price-value">{option.price}</p>
                  <button className="triple-room-price-btn">Seleccionar</button>
                </div>
              ))}
            </div>

            <div className="triple-room-payment-info">
              <h3 className="triple-room-info-title">Desglose de Costos</h3>
              <p className="triple-room-payment-text">
                El precio final incluye impuestos, tasas y acceso a piscina + bar. Se requiere
                depósito de seguridad equivalente a una noche. Los consumos de bebidas se cobran
                de forma independiente en el bar.
              </p>
            </div>
          </section>
        )}

        {/* Policies Tab */}
        {selectedTab === 'policies' && (
          <section className="triple-room-section policies-section">
            <h2 className="triple-room-section-title">Políticas y Horarios</h2>
            <div className="triple-room-policies-grid">
              {policies.map((policy, idx) => (
                <div key={idx} className="triple-room-policy-item">
                  <div className="triple-room-policy-icon">
                    {policy.label === 'Check-In' || policy.label === 'Check-Out' ? (
                      <FaClock />
                    ) : policy.label === 'Cancelación' ? (
                      <FaCalendarAlt />
                    ) : (
                      <FaUsers />
                    )}
                  </div>
                  <div className="triple-room-policy-content">
                    <h4 className="triple-room-policy-label">{policy.label}</h4>
                    <p className="triple-room-policy-value">{policy.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="triple-room-terms">
              <h3 className="triple-room-info-title">Términos y Condiciones</h3>
              <ul className="triple-room-terms-list">
                <li>El huésped es responsable del cuidado de las instalaciones</li>
                <li>Zona de fumadores disponible en áreas comunes</li>
                <li>Hora de silencio: 22:00 - 08:00</li>
                <li>No se permiten mascotas sin autorización previa</li>
                <li>El incumplimiento de políticas puede resultar en expulsión sin reembolso</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <div className="triple-room-cta premium-cta">
        <div className="triple-room-cta-badge">
          <FaStar /> Experiencia Premium Incluida
        </div>
        <h2 className="triple-room-cta-title">¿Listo para una experiencia premium?</h2>
        <p className="triple-room-cta-text">Reserva tu habitación triple y disfruta de piscina y bar sin costo adicional</p>
        <div className="triple-room-cta-buttons">
          <button className="triple-room-btn-primary">Reservar Ahora</button>
          <button className="triple-room-btn-secondary" onClick={() => navigate('/contacto')}>
            Consultar Disponibilidad
          </button>
        </div>
      </div>
    </div>
  );
}
