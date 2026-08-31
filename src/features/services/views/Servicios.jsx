import { useState } from 'react';
import {
  FaSwimmingPool,
  FaCoffee,
  FaWineGlassAlt,
  FaWifi,
  FaParking,
  FaShoppingBag,
  FaCheckCircle,
  FaChevronRight,
} from 'react-icons/fa';
import '../styles/Servicios.css';

export default function Servicios() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 1,
      title: 'La Piscina Arena Dorada',
      icon: FaSwimmingPool,
      color: '#3498db',
      image: '/piscina-arena-dorada.png',
      description:
        'Nuestro oasis personal en el desierto de Ica. Acceso gratuito para huéspedes de habitaciones matrimoniales. Recargo especial para otras categorías.',
      features: [
        'Agua cristalina y climatizada',
        'Área de sombrillas y descanso',
        'Bares laterales con servicio',
        'Horario: 8:00 - 20:00 hrs',
      ],
    },
    {
      id: 2,
      title: 'Panadería Fina y Cafetería',
      icon: FaCoffee,
      color: '#e67e22',
      image: './cafeteria-panaderia.png',
      description:
        'Desayunos gourmet preparados diariamente. Panes artesanales y bebidas calientes. Disponible para preordenar durante tu reserva.',
      features: [
        'Panes artesanales frescos',
        'Café especial de la región',
        'Repostería gourmet',
        'Horario: 6:30 - 11:00 hrs',
      ],
    },
    {
      id: 3,
      title: 'Bodega de Vinos y Licores',
      icon: FaWineGlassAlt,
      color: '#8e44ad',
      image: '/ubicacion-ica.png',
      description:
        'Catálogo exclusivo de piscos y vinos de la región de Ica. Catas y recomendaciones personalizadas. Consumo responsable.',
      features: [
        'Piscos Acholado y Puro',
        'Vinos de bodegas locales',
        'Catas temáticas',
        'Servicio de barra disponible',
      ],
    },
    {
      id: 4,
      title: 'Conectividad y Espacios de Trabajo',
      icon: FaWifi,
      color: '#2ecc71',
      image: '/blog-viajes.png',
      description:
        'Infraestructura moderna para viajeros corporativos. Wi-Fi de alta velocidad en áreas comunes y habitaciones. Zonas de trabajo productivo.',
      features: [
        'Wi-Fi de 150 Mbps',
        'Zonas de coworking',
        'Enchufes y escritorios',
        'Disponible 24/7 sin interrupciones',
      ],
    },
    {
      id: 5,
      title: 'Estacionamiento Seguro',
      icon: FaParking,
      color: '#e74c3c',
      image: '/habitacion-doble.png',
      description:
        'Espacio exclusivo para vehículos de huéspedes. Sistema de vigilancia 24 horas. Acceso incluido en tus noches de hospedaje.',
      features: [
        'Vigilancia continua',
        'Portón automático',
        'Cubierto y seguro',
        'Incluido en el alojamiento',
      ],
    },
    {
      id: 6,
      title: 'Kiosko de Autoservicio',
      icon: FaShoppingBag,
      color: '#f39c12',
      image: '/piscina-arena-dorada.png',
      description:
        'Artículos de primera necesidad, snacks y golosinas. Carga directa a tu cuenta. Compra fácil y rápida.',
      features: [
        'Snacks premium',
        'Bebidas variadas',
        'Artículos de uso personal',
        'Pago a cuenta de habitación',
      ],
    },
  ];

  const currentService = services[activeService];
  const IconComponent = currentService.icon;

  return (
    <div className="servicios-container">
      {/* Hero Section */}
      <div className="servicios-hero">
        <div className="servicios-hero-content">
          <h1 className="servicios-title">Servicios Exclusivos</h1>
          <p className="servicios-subtitle">
            Completa experiencia de hospedaje con todas las comodidades que necesitas
          </p>
        </div>
      </div>

      {/* Main Services Section */}
      <section className="servicios-main-section">
        <div className="servicios-main-container">
          {/* Service Selector */}
          <div className="servicios-selector">
            <div className="servicios-selector-grid">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    className={`servicios-selector-item ${
                      activeService === idx ? 'active' : ''
                    }`}
                    onClick={() => setActiveService(idx)}
                    style={
                      activeService === idx
                        ? { borderColor: service.color, backgroundColor: `${service.color}15` }
                        : {}
                    }
                  >
                    <Icon
                      size={24}
                      style={activeService === idx ? { color: service.color } : {}}
                    />
                    <span>{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Display */}
          <div className="servicios-display">
            <div className="servicios-display-content">
              <div className="servicios-display-image">
                <img src={currentService.image} alt={currentService.title} />
                <div className="servicios-display-icon-badge">
                  <IconComponent size={40} style={{ color: currentService.color }} />
                </div>
              </div>

              <div className="servicios-display-info">
                <h2 className="servicios-display-title">{currentService.title}</h2>
                <p className="servicios-display-description">
                  {currentService.description}
                </p>

                <div className="servicios-display-features">
                  <h3 className="servicios-features-title">Características Destacadas</h3>
                  <ul className="servicios-features-list">
                    {currentService.features.map((feature, idx) => (
                      <li key={idx} className="servicios-feature-item">
                        <FaCheckCircle
                          style={{ color: currentService.color }}
                          size={18}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="servicios-cta-button"
                  style={{ backgroundColor: currentService.color }}
                >
                  Más Información
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Overview */}
      <section className="servicios-overview-section">
        <h2 className="servicios-section-title">Todos Nuestros Servicios</h2>
        <div className="servicios-overview-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="servicios-overview-card"
                onClick={() => setActiveService(services.indexOf(service))}
              >
                <div className="servicios-overview-icon" style={{ backgroundColor: `${service.color}20` }}>
                  <Icon size={32} style={{ color: service.color }} />
                </div>
                <h3 className="servicios-overview-name">{service.title}</h3>
                <p className="servicios-overview-description">{service.description}</p>
                <div className="servicios-overview-accent" style={{ backgroundColor: service.color }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Additional Information */}
      <section className="servicios-info-section">
        <div className="servicios-info-container">
          <div className="servicios-info-card">
            <h3 className="servicios-info-title">Calidad Garantizada</h3>
            <p className="servicios-info-text">
              Cada servicio está diseñado con los más altos estándares de calidad.
              Nuestro equipo se compromete con tu experiencia.
            </p>
          </div>

          <div className="servicios-info-card">
            <h3 className="servicios-info-title">Atención 24/7</h3>
            <p className="servicios-info-text">
              El personal de recepción está disponible en todo momento para
              coordinar cualquier servicio o resolver tus consultas.
            </p>
          </div>

          <div className="servicios-info-card">
            <h3 className="servicios-info-title">Precios Competitivos</h3>
            <p className="servicios-info-text">
              Disfruta de servicios premium a precios justos. Muchos de ellos
              incluidos en tu paquete de hospedaje.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
