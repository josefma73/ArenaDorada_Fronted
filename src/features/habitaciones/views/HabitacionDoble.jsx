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
  FaUtensils,
} from 'react-icons/fa';
import '../styles/HabitacionDoble.css';

export default function HabitacionDoble() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  const characteristics = [
    {
      title: 'Distribución Espaciosa',
      description: 'Dos camas de plaza y media distribuidas simétricamente para máximo confort.',
      included: true,
    },
    {
      title: 'Capacidad Amplia',
      description: 'Diseñada para acomodar 2-3 personas de manera holgada con espacio de circulación.',
      included: true,
    },
    {
      title: 'Baño Moderno',
      description: 'Baño privado completo con ducha, espejo ampliado y amenities premium.',
      included: true,
    },
  ];

  const amenities = [
    { icon: FaWifi, label: 'Wi-Fi de Alta Velocidad 24/7', included: true },
    { icon: FaTv, label: 'Televisión LCD con Cable', included: true },
    { icon: FaThermometerHalf, label: 'Agua Caliente 24 Horas', included: true },
    { icon: FaDoorOpen, label: 'Mesa de Trabajo Pequeña', included: true },
  ];

  const pricing = [
    { duration: 'Por día completo', price: 'S/. 70', highlight: true },
    { duration: 'Por 2 noches', price: 'S/. 130', highlight: false },
    { duration: 'Por 1 semana', price: 'S/. 430', highlight: false },
  ];

  const policies = [
    { label: 'Check-In', value: 'A partir de las 14:00 hrs' },
    { label: 'Check-Out', value: 'Hasta las 11:00 hrs' },
    { label: 'Cancelación', value: 'Hasta 24 hrs antes sin cargo' },
    { label: 'Máximo Ocupantes', value: '2-3 adultos' },
  ];

  const addOns = [
    { name: 'Acceso a Piscina', price: 'S/. 20/día', description: 'Acceso a todas las zonas de piscina' },
    { name: 'Cena 3 Platos', price: 'S/. 35', description: 'Menú regional especializado' },
    { name: 'Late Checkout (14:00)', price: 'S/. 30', description: 'Extiende tu estancia 3 horas más' },
  ];

  return (
    <div className="double-room-container">
      {/* Header */}
      <div className="double-room-header">
        <button className="double-room-back-btn" onClick={() => navigate('/habitaciones')}>
          <FaArrowLeft /> Volver
        </button>
        <h1 className="double-room-title">Habitación Doble</h1>
        <p className="double-room-subtitle">Espaciosa y cómoda para familias pequeñas y grupos</p>
      </div>

      {/* Hero Section */}
      <div className="double-room-hero">
        <img
          src="/habitacion-doble-detail.png"
          alt="Habitación Doble"
          className="double-room-hero-image"
        />
        <div className="double-room-hero-overlay">
          <div className="double-room-price-tag">
            <p className="double-room-price-from">Desde</p>
            <p className="double-room-price-amount">S/. 60</p>
            <p className="double-room-price-unit">por noche</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="double-room-nav-tabs">
        <button
          className={`double-room-tab ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          Descripción General
        </button>
        <button
          className={`double-room-tab ${selectedTab === 'amenities' ? 'active' : ''}`}
          onClick={() => setSelectedTab('amenities')}
        >
          Amenidades
        </button>
        <button
          className={`double-room-tab ${selectedTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setSelectedTab('pricing')}
        >
          Precios
        </button>
        <button
          className={`double-room-tab ${selectedTab === 'policies' ? 'active' : ''}`}
          onClick={() => setSelectedTab('policies')}
        >
          Políticas
        </button>
      </div>

      {/* Content Sections */}
      <div className="double-room-content">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <section className="double-room-section overview-section">
            <h2 className="double-room-section-title">Descripción de la Habitación</h2>
            <div className="double-room-characteristics">
              {characteristics.map((char, idx) => (
                <div key={idx} className="double-room-characteristic-card">
                  <div className="double-room-characteristic-header">
                    <div className="double-room-characteristic-icon">
                      {char.included ? <FaCheck /> : <FaTimes />}
                    </div>
                    <h3 className="double-room-characteristic-title">{char.title}</h3>
                  </div>
                  <p className="double-room-characteristic-desc">{char.description}</p>
                </div>
              ))}
            </div>

            <div className="double-room-info-box">
              <h3 className="double-room-info-title">Información Importante</h3>
              <ul className="double-room-info-list">
                <li>Aforo máximo: 2-3 adultos (sujeto a validación de espacios)</li>
                <li>Acceso a la piscina disponible con cobro adicional</li>
                <li>Consumos del bar se facturan por separado</li>
                <li>Sistema de validación automática al reservar</li>
                <li>Protocolo de sanitización profunda tras cada salida</li>
              </ul>
            </div>
          </section>
        )}

        {/* Amenities Tab */}
        {selectedTab === 'amenities' && (
          <section className="double-room-section amenities-section">
            <h2 className="double-room-section-title">Amenidades Incluidas</h2>
            <div className="double-room-amenities-grid">
              {amenities.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={idx}
                    className={`double-room-amenity ${amenity.included ? 'included' : 'unavailable'}`}
                  >
                    <div className="double-room-amenity-icon">
                      <Icon />
                    </div>
                    <p className="double-room-amenity-label">{amenity.label}</p>
                    <div className="double-room-amenity-status">
                      {amenity.included ? <FaCheck /> : <FaTimes />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="double-room-addons">
              <h3 className="double-room-addons-title">Servicios Adicionales</h3>
              <div className="double-room-addons-grid">
                {addOns.map((addon, idx) => (
                  <div key={idx} className="double-room-addon-card">
                    <div className="double-room-addon-header">
                      <h4 className="double-room-addon-name">{addon.name}</h4>
                      <p className="double-room-addon-price">{addon.price}</p>
                    </div>
                    <p className="double-room-addon-desc">{addon.description}</p>
                    <button className="double-room-addon-btn">Agregar</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tab */}
        {selectedTab === 'pricing' && (
          <section className="double-room-section pricing-section">
            <h2 className="double-room-section-title">Opciones de Tarifa</h2>
            <div className="double-room-pricing-grid">
              {pricing.map((option, idx) => (
                <div
                  key={idx}
                  className={`double-room-price-card ${option.highlight ? 'highlighted' : ''}`}
                >
                  {option.highlight && <div className="double-room-best-badge">Mejor Valor</div>}
                  <p className="double-room-price-duration">{option.duration}</p>
                  <p className="double-room-price-value">{option.price}</p>
                  <button className="double-room-price-btn">Seleccionar</button>
                </div>
              ))}
            </div>

            <div className="double-room-payment-info">
              <h3 className="double-room-info-title">Desglose de Costos</h3>
              <p className="double-room-payment-text">
                El precio final incluye impuestos y tasas. Se requiere depósito de seguridad
                equivalente a una noche. Los consumos adicionales se cobran de forma independiente.
              </p>
            </div>
          </section>
        )}

        {/* Policies Tab */}
        {selectedTab === 'policies' && (
          <section className="double-room-section policies-section">
            <h2 className="double-room-section-title">Políticas y Horarios</h2>
            <div className="double-room-policies-grid">
              {policies.map((policy, idx) => (
                <div key={idx} className="double-room-policy-item">
                  <div className="double-room-policy-icon">
                    {policy.label === 'Check-In' || policy.label === 'Check-Out' ? (
                      <FaClock />
                    ) : policy.label === 'Cancelación' ? (
                      <FaCalendarAlt />
                    ) : (
                      <FaUsers />
                    )}
                  </div>
                  <div className="double-room-policy-content">
                    <h4 className="double-room-policy-label">{policy.label}</h4>
                    <p className="double-room-policy-value">{policy.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="double-room-terms">
              <h3 className="double-room-info-title">Términos y Condiciones</h3>
              <ul className="double-room-terms-list">
                <li>El huésped es responsable del cuidado de las instalaciones</li>
                <li>Prohibido fumar dentro de la habitación (existe zona para fumadores)</li>
                <li>Hora de silencio: 22:00 - 08:00</li>
                <li>No se permiten mascotas sin autorización previa del gerente</li>
                <li>El incumplimiento de políticas puede resultar en expulsión sin reembolso</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <div className="double-room-cta">
        <h2 className="double-room-cta-title">¿Listo para tu estancia en familia?</h2>
        <p className="double-room-cta-text">Reserva tu habitación doble ahora y disfruta de nuestras instalaciones</p>
        <div className="double-room-cta-buttons">
          <button className="double-room-btn-primary">Reservar Ahora</button>
          <button className="double-room-btn-secondary" onClick={() => navigate('/contacto')}>
            Consultar Disponibilidad
          </button>
        </div>
      </div>
    </div>
  );
}
