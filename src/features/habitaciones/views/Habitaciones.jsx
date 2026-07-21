import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBed,
  FaWifi,
  FaTv,
  FaThermometerHalf,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaChevronDown,
  FaArrowRight,
  FaStar,
} from 'react-icons/fa';
import '../styles/Habitaciones.css';

export default function Habitaciones() {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const roomCategories = [
    {
      id: 1,
      name: 'Habitación Simple',
      capacity: '1-2 personas',
      beds: '1 cama individual o matrimonial',
      price: 'S/. 35-50/día',
      description: 'Perfecta para viajeros en solitario o parejas. Acceso a la piscina con recargo adicional.',
      icon: FaBed,
      path: '/habitacionsimple',
      image: '/habitacion-simple-detail.png',
      premium: false,
    },
    {
      id: 2,
      name: 'Habitación Doble',
      capacity: '2-3 personas',
      beds: '2 camas individuales o 1 matrimonial + 1 individual',
      price: 'S/. 60-80/día',
      description: 'Espaciosa y cómoda para familias pequeñas o grupos de amigos.',
      icon: FaBed,
      path: '/habitaciondoble',
      image: '/habitacion-doble-detail.png',
      premium: false,
    },
    {
      id: 3,
      name: 'Habitación Triple',
      capacity: '3-4 personas',
      beds: '3 camas individuales o combinaciones variables',
      price: 'S/. 85-110/día',
      description: 'Ideal para grupos pequeños con distribuidor amplio y mayor espacio de almacenamiento.',
      icon: FaUsers,
      path: '/habitaciontriple',
      image: '/habitacion-triple-detail.png',
      premium: true,
      premiumBenefit: 'Acceso Gratis a Piscina y Bar',
    },
    {
      id: 4,
      name: 'Habitación Matrimonial',
      capacity: '2 personas',
      beds: '1 cama matrimonial de lujo',
      price: 'S/. 90-130/día',
      description: 'Premium. Máxima comodidad y elegancia con acceso exclusivo.',
      icon: FaBed,
      path: '/habitacionmatrimonial',
      image: '/habitacion-matrimonial-detail.png',
      premium: true,
      premiumBenefit: 'Acceso Gratis a Piscina y Bar',
    },
  ];

  const amenities = [
    { icon: FaWifi, label: 'Wi-Fi de Alta Velocidad 24/7' },
    { icon: FaTv, label: 'Televisión con Señal por Cable' },
    { icon: FaThermometerHalf, label: 'Agua Caliente Disponible' },
  ];

  const schedules = [
    { label: 'Check-In', time: 'A partir de las 14:00 hrs' },
    { label: 'Check-Out', time: 'Hasta las 11:00 hrs' },
    { label: 'Horario por Horas', time: 'Disponible con tarifa especial' },
  ];

  return (
    <div className="habitaciones-container">
      {/* Hero Section */}
      <div className="habitaciones-hero">
        <div className="habitaciones-hero-content">
          <h1 className="habitaciones-title">Nuestras Habitaciones</h1>
          <p className="habitaciones-subtitle">
            Confortables y elegantes espacios diseñados para tu descanso
          </p>
        </div>
        <img
          src="/habitacion-doble.png"
          alt="Habitación de lujo"
          className="habitaciones-hero-image"
        />
      </div>

      {/* Categorías de Habitaciones */}
      <section className="habitaciones-categories-section">
        <h2 className="habitaciones-section-title">Categorías Disponibles</h2>
        <div className="habitaciones-stack-grid">
          {roomCategories.map((room) => {
            const IconComponent = room.icon;
            return (
              <div
                key={room.id}
                className="habitaciones-room-card"
              >
                {room.premium && (
                  <div className="habitaciones-premium-badge">
                    <FaStar size={14} />
                    <span>{room.premiumBenefit}</span>
                  </div>
                )}
                
                <div className="habitaciones-room-image-container">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="habitaciones-room-image"
                  />
                </div>
                
                <div className="habitaciones-room-card-layout">
                  <div className="habitaciones-room-left">
                    <div className="habitaciones-room-header">
                      <div className="habitaciones-room-icon">
                        <IconComponent size={32} />
                      </div>
                      <div className="habitaciones-room-info">
                        <h3 className="habitaciones-room-name">{room.name}</h3>
                        <p className="habitaciones-room-price">{room.price}</p>
                      </div>
                    </div>

                    <div className="habitaciones-room-details">
                      <p className="habitaciones-room-detail-item">
                        <FaUsers size={16} /> {room.capacity}
                      </p>
                      <p className="habitaciones-room-detail-item">
                        <FaBed size={16} /> {room.beds}
                      </p>
                      <p className="habitaciones-room-description">
                        {room.description}
                      </p>
                    </div>
                  </div>

                  <div className="habitaciones-room-actions">
                    <button 
                      className="habitaciones-btn-secondary"
                      onClick={() => navigate(room.path)}
                    >
                      Ver más <FaArrowRight />
                    </button>
                    <button className="habitaciones-btn-primary">
                      Reserva tu estadía
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Amenidades */}
      <section className="habitaciones-amenities-section">
        <h2 className="habitaciones-section-title">Amenidades Incluidas</h2>
        <div className="habitaciones-amenities-grid">
          {amenities.map((amenity, idx) => {
            const Icon = amenity.icon;
            return (
              <div key={idx} className="habitaciones-amenity-card">
                <div className="habitaciones-amenity-icon">
                  <Icon size={40} />
                </div>
                <p className="habitaciones-amenity-label">{amenity.label}</p>
                <div className="habitaciones-amenity-accent" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Horarios */}
      <section className="habitaciones-schedules-section">
        <h2 className="habitaciones-section-title">Horarios de Entrada y Salida</h2>
        <div className="habitaciones-schedules-container">
          {schedules.map((schedule, idx) => (
            <div key={idx} className="habitaciones-schedule-item">
              <div className="habitaciones-schedule-icon">
                <FaClock />
              </div>
              <div className="habitaciones-schedule-content">
                <h3 className="habitaciones-schedule-label">{schedule.label}</h3>
                <p className="habitaciones-schedule-time">{schedule.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Políticas */}
      <section className="habitaciones-policies-section">
        <div className="habitaciones-policies-grid">
          <div className="habitaciones-policy-card">
            <h3 className="habitaciones-policy-title">Aforo Máximo</h3>
            <div className="habitaciones-policy-icon">
              <FaUsers />
            </div>
            <p className="habitaciones-policy-text">
              Las limitaciones físicas de cada habitación son respetadas
              estrictamente. Sistema automático de validación al reservar.
            </p>
          </div>

          <div className="habitaciones-policy-card">
            <h3 className="habitaciones-policy-title">Sanitización</h3>
            <div className="habitaciones-policy-icon">
              <FaCheckCircle />
            </div>
            <p className="habitaciones-policy-text">
              Protocolo de limpieza profunda y desinfección tras cada salida.
              Estándares profesionales garantizados.
            </p>
          </div>

          <div className="habitaciones-policy-card">
            <h3 className="habitaciones-policy-title">Mantenimiento</h3>
            <div className="habitaciones-policy-icon">
              <FaCheckCircle />
            </div>
            <p className="habitaciones-policy-text">
              Inspección diaria de todas las habitaciones. Reparaciones
              inmediatas para garantizar tu confort.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
