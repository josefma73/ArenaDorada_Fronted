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
} from 'react-icons/fa';
import '../styles/HabitacionSimple.css';

export default function HabitacionSimple() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  const characteristics = [
    {
      title: 'Espacio Óptimo',
      description: 'Diseño minimalista que maximiza el confort en un espacio compacto y funcional.',
      included: true,
    },
    {
      title: 'Cama Plaza y Media',
      description: 'Cama individual confortable, ideal para viajeros individuales con máximo de 1 adulto.',
      included: true,
    },
    {
      title: 'Baño Privado',
      description: 'Baño completo con ducha, lavabo y amenities de cortesía disponibles 24/7.',
      included: true,
    },
  ];

  const amenities = [
    { icon: FaWifi, label: 'Wi-Fi de Alta Velocidad 24/7', included: true },
    { icon: FaTv, label: 'Televisión con Cable', included: true },
    { icon: FaThermometerHalf, label: 'Agua Caliente 24 Horas', included: true },
    { icon: FaDoorOpen, label: 'Acceso a Zonas Comunes', included: true },
  ];

  const pricing = [
    { duration: 'Por 4 horas', price: 'S/. 20', highlight: false },
    { duration: 'Por día completo', price: 'S/. 45', highlight: true },
    { duration: 'Por 2 noches', price: 'S/. 80', highlight: false },
  ];

  const policies = [
    { label: 'Check-In', value: 'A partir de las 14:00 hrs' },
    { label: 'Check-Out', value: 'Hasta las 11:00 hrs' },
    { label: 'Cancelación', value: 'Hasta 24 hrs antes sin cargo' },
    { label: 'Máximo Ocupantes', value: '1 adulto' },
  ];

  const addOns = [
    { name: 'Acceso a Piscina', price: 'S/. 15/día', description: 'Disfruta de la piscina climatizada' },
    { name: 'Desayuno Buffet', price: 'S/. 18', description: 'Incluye bebidas calientes y snacks' },
    { name: 'Late Checkout (14:00)', price: 'S/. 25', description: 'Extiende tu estancia 3 horas más' },
  ];

  return (
    <div className="simple-room-container">
      {/* Header */}
      <div className="simple-room-header">
        <button className="simple-room-back-btn" onClick={() => navigate('/habitaciones')}>
          <FaArrowLeft /> Volver
        </button>
        <h1 className="simple-room-title">Habitación Simple</h1>
        <p className="simple-room-subtitle">Confortables espacios para viajeros en solitario</p>
      </div>

      {/* Hero Section */}
      <div className="simple-room-hero">
        <img
          src="/habitacion-simple-detail.png"
          alt="Habitación Simple"
          className="simple-room-hero-image"
        />
        <div className="simple-room-hero-overlay">
          <div className="simple-room-price-tag">
            <p className="simple-room-price-from">Desde</p>
            <p className="simple-room-price-amount">S/. 35</p>
            <p className="simple-room-price-unit">por noche</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="simple-room-nav-tabs">
        <button
          className={`simple-room-tab ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          Descripción General
        </button>
        <button
          className={`simple-room-tab ${selectedTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setSelectedTab('amenities')}
        >
          Amenidades
        </button>
        <button
          className={`simple-room-tab ${selectedTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setSelectedTab('pricing')}
        >
          Precios
        </button>
        <button
          className={`simple-room-tab ${selectedTab === 'policies' ? 'active' : ''}`}
          onClick={() => setSelectedTab('policies')}
        >
          Políticas
        </button>
      </div>

      {/* Content Sections */}
      <div className="simple-room-content">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <section className="simple-room-section overview-section">
            <h2 className="simple-room-section-title">Descripción de la Habitación</h2>
            <div className="simple-room-characteristics">
              {characteristics.map((char, idx) => (
                <div key={idx} className="simple-room-characteristic-card">
                  <div className="simple-room-characteristic-header">
                    <div className="simple-room-characteristic-icon">
                      {char.included ? <FaCheck /> : <FaTimes />}
                    </div>
                    <h3 className="simple-room-characteristic-title">{char.title}</h3>
                  </div>
                  <p className="simple-room-characteristic-desc">{char.description}</p>
                </div>
              ))}
            </div>

            <div className="simple-room-info-box">
              <h3 className="simple-room-info-title">Información Importante</h3>
              <ul className="simple-room-info-list">
                <li>Aforo máximo estricto: 1 adulto</li>
                <li>Acceso a la piscina disponible con cobro adicional</li>
                <li>Protocolo de sanitización profunda después de cada salida</li>
                <li>Sistema de validación automática al reservar</li>
                <li>Reparaciones inmediatas ante cualquier inconveniente</li>
              </ul>
            </div>
          </section>
        )}

        {/* Amenities Tab */}
        {selectedTab === 'amenities' && (
          <section className="simple-room-section amenities-section">
            <h2 className="simple-room-section-title">Amenidades Incluidas</h2>
            <div className="simple-room-amenities-grid">
              {amenities.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={idx}
                    className={`simple-room-amenity ${amenity.included ? 'included' : 'unavailable'}`}
                  >
                    <div className="simple-room-amenity-icon">
                      <Icon />
                    </div>
                    <p className="simple-room-amenity-label">{amenity.label}</p>
                    <div className="simple-room-amenity-status">
                      {amenity.included ? <FaCheck /> : <FaTimes />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="simple-room-addons">
              <h3 className="simple-room-addons-title">Servicios Adicionales</h3>
              <div className="simple-room-addons-grid">
                {addOns.map((addon, idx) => (
                  <div key={idx} className="simple-room-addon-card">
                    <div className="simple-room-addon-header">
                      <h4 className="simple-room-addon-name">{addon.name}</h4>
                      <p className="simple-room-addon-price">{addon.price}</p>
                    </div>
                    <p className="simple-room-addon-desc">{addon.description}</p>
                    <button className="simple-room-addon-btn">Agregar</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tab */}
        {selectedTab === 'pricing' && (
          <section className="simple-room-section pricing-section">
            <h2 className="simple-room-section-title">Opciones de Tarifa</h2>
            <div className="simple-room-pricing-grid">
              {pricing.map((option, idx) => (
                <div
                  key={idx}
                  className={`simple-room-price-card ${option.highlight ? 'highlighted' : ''}`}
                >
                  {option.highlight && <div className="simple-room-best-badge">Mejor Valor</div>}
                  <p className="simple-room-price-duration">{option.duration}</p>
                  <p className="simple-room-price-value">{option.price}</p>
                  <button className="simple-room-price-btn">Seleccionar</button>
                </div>
              ))}
            </div>

            <div className="simple-room-payment-info">
              <h3 className="simple-room-info-title">Desglose de Costos</h3>
              <p className="simple-room-payment-text">
                El precio final incluye impuestos y tasas. Se requiere depósito de seguridad
                equivalente a una noche. Los consumos de servicios adicionales se cobran por separado.
              </p>
            </div>
          </section>
        )}

        {/* Policies Tab */}
        {selectedTab === 'policies' && (
          <section className="simple-room-section policies-section">
            <h2 className="simple-room-section-title">Políticas y Horarios</h2>
            <div className="simple-room-policies-grid">
              {policies.map((policy, idx) => (
                <div key={idx} className="simple-room-policy-item">
                  <div className="simple-room-policy-icon">
                    {policy.label === 'Check-In' || policy.label === 'Check-Out' ? (
                      <FaClock />
                    ) : policy.label === 'Cancelación' ? (
                      <FaCalendarAlt />
                    ) : (
                      <FaUsers />
                    )}
                  </div>
                  <div className="simple-room-policy-content">
                    <h4 className="simple-room-policy-label">{policy.label}</h4>
                    <p className="simple-room-policy-value">{policy.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="simple-room-terms">
              <h3 className="simple-room-info-title">Términos y Condiciones</h3>
              <ul className="simple-room-terms-list">
                <li>El huésped es responsable del cuidado de las instalaciones</li>
                <li>Prohibido fumar dentro de la habitación</li>
                <li>Hora de silencio: 22:00 - 08:00</li>
                <li>No se permiten mascotas sin autorización previa</li>
                <li>El incumplimiento de políticas puede resultar en expulsión sin reembolso</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <div className="simple-room-cta">
        <h2 className="simple-room-cta-title">¿Listo para tu estancia?</h2>
        <p className="simple-room-cta-text">Reserva ahora y asegura tu lugar en Hostal Arena Dorada</p>
        <div className="simple-room-cta-buttons">
          <button className="simple-room-btn-primary">Reservar Ahora</button>
          <button className="simple-room-btn-secondary" onClick={() => navigate('/contacto')}>
            Consultar Disponibilidad
          </button>
        </div>
      </div>
    </div>
  );
}
