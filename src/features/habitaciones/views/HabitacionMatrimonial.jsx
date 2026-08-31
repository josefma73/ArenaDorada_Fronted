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
  FaHeart,
} from 'react-icons/fa';
import '../styles/HabitacionMatrimonial.css';

export default function HabitacionMatrimonial() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  const characteristics = [
    {
      title: 'Cama Queen de Lujo',
      description: 'Cama king size de dos plazas con ropa de cama premium de la más alta calidad.',
      included: true,
    },
    {
      title: 'Diseño Romántico',
      description: 'Ambiente elegante y sofisticado especialmente decorado para parejas.',
      included: true,
    },
    {
      title: 'Baño Luxury',
      description: 'Baño privado completo con artículos de baño premium y amenities exclusivos.',
      included: true,
    },
    {
      title: 'Acceso Piscina Incluida',
      description: 'Disfruta de la piscina climatizada sin costo adicional durante tu estancia.',
      included: true,
    },
  ];

  const amenities = [
    { icon: FaWifi, label: 'Wi-Fi de Alta Velocidad 24/7', included: true },
    { icon: FaTv, label: 'Televisor Smart TV de 55"', included: true },
    { icon: FaThermometerHalf, label: 'Agua Caliente 24 Horas', included: true },
    { icon: FaDoorOpen, label: 'Clóset Amplio', included: true },
    { icon: FaWineGlass, label: 'Acceso Gratis al Bar', included: true },
    { icon: FaHeart, label: 'Decoración Romántica', included: true },
  ];

  const pricing = [
    { duration: 'Por día completo', price: 'S/. 110', highlight: true },
    { duration: 'Por 2 noches', price: 'S/. 200', highlight: false },
    { duration: 'Por 1 semana', price: 'S/. 680', highlight: false },
  ];

  const policies = [
    { label: 'Check-In', value: 'A partir de las 14:00 hrs' },
    { label: 'Check-Out', value: 'Hasta las 11:00 hrs' },
    { label: 'Cancelación', value: 'Hasta 48 hrs antes sin cargo' },
    { label: 'Máximo Ocupantes', value: '2 adultos' },
  ];

  const addOns = [
    { name: 'Cena Romántica 4 Platos', price: 'S/. 65', description: 'Menú especial para parejas' },
    { name: 'Champagne Premium', price: 'S/. 45', description: 'Botella para celebrar' },
    { name: 'Late Checkout (14:00)', price: 'S/. 40', description: 'Extiende tu estancia 3 horas' },
  ];

  return (
    <div className="matrimonial-room-container">
      {/* Header */}
      <div className="matrimonial-room-header">
        <button className="matrimonial-room-back-btn" onClick={() => navigate('/habitaciones')}>
          <FaArrowLeft /> Volver
        </button>
        <h1 className="matrimonial-room-title">Habitación Matrimonial</h1>
        <p className="matrimonial-room-subtitle">Suite de lujo para parejas con experiencia premium</p>
      </div>

      {/* Premium Banner */}
      <div className="matrimonial-room-premium-banner">
        <FaStar className="matrimonial-room-star" />
        <p className="matrimonial-room-premium-text">Suite Premium - Acceso Gratis a Piscina y Bar Incluido</p>
        <FaStar className="matrimonial-room-star" />
      </div>

      {/* Hero Section */}
      <div className="matrimonial-room-hero">
        <img
          src="/habitacion-matrimonial-detail.png"
          alt="Habitación Matrimonial"
          className="matrimonial-room-hero-image"
        />
        <div className="matrimonial-room-hero-overlay">
          <div className="matrimonial-room-price-tag">
            <p className="matrimonial-room-price-from">Desde</p>
            <p className="matrimonial-room-price-amount">S/. 90</p>
            <p className="matrimonial-room-price-unit">por noche</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="matrimonial-room-nav-tabs">
        <button
          className={`matrimonial-room-tab ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          Descripción General
        </button>
        <button
          className={`matrimonial-room-tab ${selectedTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setSelectedTab('amenities')}
        >
          Amenidades
        </button>
        <button
          className={`matrimonial-room-tab ${selectedTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setSelectedTab('pricing')}
        >
          Precios
        </button>
        <button
          className={`matrimonial-room-tab ${selectedTab === 'policies' ? 'active' : ''}`}
          onClick={() => setSelectedTab('policies')}
        >
          Políticas
        </button>
      </div>

      {/* Content Sections */}
      <div className="matrimonial-room-content">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <section className="matrimonial-room-section overview-section">
            <h2 className="matrimonial-room-section-title">Descripción de la Habitación</h2>
            <div className="matrimonial-room-characteristics">
              {characteristics.map((char, idx) => (
                <div key={idx} className="matrimonial-room-characteristic-card">
                  <div className="matrimonial-room-characteristic-header">
                    <div className="matrimonial-room-characteristic-icon">
                      {char.included ? <FaCheck /> : <FaTimes />}
                    </div>
                    <h3 className="matrimonial-room-characteristic-title">{char.title}</h3>
                  </div>
                  <p className="matrimonial-room-characteristic-desc">{char.description}</p>
                </div>
              ))}
            </div>

            <div className="matrimonial-room-info-box premium-highlight">
              <h3 className="matrimonial-room-info-title">
                <FaStar className="matrimonial-room-icon-inline" /> Experiencia Matrimonial Premium
              </h3>
              <ul className="matrimonial-room-info-list">
                <li>Acceso ilimitado a la piscina climatizada durante toda la estancia</li>
                <li>Entrada libre al bar Arena Dorada con consumos facturados por separado</li>
                <li>Desayuno a la habitación disponible con cobro especial</li>
                <li>Servicio de concierge disponible 24/7 para reservaciones especiales</li>
                <li>Paquetes románticos personalizados bajo solicitud</li>
              </ul>
            </div>

            <div className="matrimonial-room-info-box">
              <h3 className="matrimonial-room-info-title">Información Importante</h3>
              <ul className="matrimonial-room-info-list">
                <li>Aforo máximo: 2 adultos (máxima privacidad garantizada)</li>
                <li>Sistema de validación automática al reservar</li>
                <li>Política de cancelación flexible hasta 48 horas antes</li>
              </ul>
            </div>
          </section>
        )}

        {/* Amenities Tab */}
        {selectedTab === 'amenities' && (
          <section className="matrimonial-room-section amenities-section">
            <h2 className="matrimonial-room-section-title">Amenidades Incluidas</h2>
            <div className="matrimonial-room-amenities-grid">
              {amenities.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={idx}
                    className={`matrimonial-room-amenity ${amenity.included ? 'included' : 'unavailable'}`}
                  >
                    <div className="matrimonial-room-amenity-icon">
                      <Icon />
                    </div>
                    <p className="matrimonial-room-amenity-label">{amenity.label}</p>
                    <div className="matrimonial-room-amenity-status">
                      {amenity.included ? <FaCheck /> : <FaTimes />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="matrimonial-room-addons">
              <h3 className="matrimonial-room-addons-title">Servicios Especiales para Parejas</h3>
              <div className="matrimonial-room-addons-grid">
                {addOns.map((addon, idx) => (
                  <div key={idx} className="matrimonial-room-addon-card">
                    <div className="matrimonial-room-addon-header">
                      <h4 className="matrimonial-room-addon-name">{addon.name}</h4>
                      <p className="matrimonial-room-addon-price">{addon.price}</p>
                    </div>
                    <p className="matrimonial-room-addon-desc">{addon.description}</p>
                    <button className="matrimonial-room-addon-btn">Agregar</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tab */}
        {selectedTab === 'pricing' && (
          <section className="matrimonial-room-section pricing-section">
            <h2 className="matrimonial-room-section-title">Opciones de Tarifa</h2>
            <div className="matrimonial-room-pricing-grid">
              {pricing.map((option, idx) => (
                <div
                  key={idx}
                  className={`matrimonial-room-price-card ${option.highlight ? 'highlighted' : ''}`}
                >
                  {option.highlight && <div className="matrimonial-room-best-badge">Mejor Valor</div>}
                  <p className="matrimonial-room-price-duration">{option.duration}</p>
                  <p className="matrimonial-room-price-value">{option.price}</p>
                  <button className="matrimonial-room-price-btn">Seleccionar</button>
                </div>
              ))}
            </div>

            <div className="matrimonial-room-payment-info">
              <h3 className="matrimonial-room-info-title">Desglose de Costos</h3>
              <p className="matrimonial-room-payment-text">
                El precio final incluye impuestos, tasas y acceso a piscina + bar. Se requiere
                depósito de seguridad equivalente a una noche. Los consumos de bebidas y servicios
                especiales se cobran de forma independiente.
              </p>
            </div>
          </section>
        )}

        {/* Policies Tab */}
        {selectedTab === 'policies' && (
          <section className="matrimonial-room-section policies-section">
            <h2 className="matrimonial-room-section-title">Políticas y Horarios</h2>
            <div className="matrimonial-room-policies-grid">
              {policies.map((policy, idx) => (
                <div key={idx} className="matrimonial-room-policy-item">
                  <div className="matrimonial-room-policy-icon">
                    {policy.label === 'Check-In' || policy.label === 'Check-Out' ? (
                      <FaClock />
                    ) : policy.label === 'Cancelación' ? (
                      <FaCalendarAlt />
                    ) : (
                      <FaUsers />
                    )}
                  </div>
                  <div className="matrimonial-room-policy-content">
                    <h4 className="matrimonial-room-policy-label">{policy.label}</h4>
                    <p className="matrimonial-room-policy-value">{policy.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="matrimonial-room-terms">
              <h3 className="matrimonial-room-info-title">Términos y Condiciones</h3>
              <ul className="matrimonial-room-terms-list">
                <li>El huésped es responsable del cuidado de las instalaciones</li>
                <li>Ambiente especial: se solicita máxima privacidad y consideración</li>
                <li>Hora de silencio: 22:00 - 08:00 (especialmente respetada en suites)</li>
                <li>No se permiten mascotas sin autorización previa</li>
                <li>El incumplimiento de políticas puede resultar en expulsión sin reembolso</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <div className="matrimonial-room-cta premium-cta">
        <div className="matrimonial-room-cta-badge">
          <FaStar /> Suite Premium Exclusiva
        </div>
        <h2 className="matrimonial-room-cta-title">Vive una experiencia inolvidable</h2>
        <p className="matrimonial-room-cta-text">Reserva tu suite matrimonial y disfruta de lujo, piscina y bar sin costo adicional</p>
        <div className="matrimonial-room-cta-buttons">
          <button className="matrimonial-room-btn-primary">Reservar Ahora</button>
          <button className="matrimonial-room-btn-secondary" onClick={() => navigate('/contacto')}>
            Consultar Disponibilidad
          </button>
        </div>
      </div>
    </div>
  );
}
