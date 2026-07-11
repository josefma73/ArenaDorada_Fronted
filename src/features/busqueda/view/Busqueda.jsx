import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Wifi, Wind, Bed, Waves, Phone, Tv, MessageCircle } from 'lucide-react';
import '../styles/Busqueda.css';

const Busqueda = ({ bookingData = null, onBack = () => {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      const mockRooms = [
        {
          id: 1,
          name: 'Doble Estándar',
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=400&fit=crop',
          capacity: 4,
          size: 38,
          originalPrice: 248.36,
          currentPrice: 198.69,
          discount: 20,
          offer: 'Oferta',
          services: [
            { id: 1, icon: 'wifi', label: 'WiFi' },
            { id: 2, icon: 'ac', label: 'A/C' },
            { id: 3, icon: 'bed', label: 'Cama Doble' },
            { id: 4, icon: 'shower', label: 'Baño Privado' },
            { id: 5, icon: 'phone', label: 'Teléfono' },
            { id: 6, icon: 'safe', label: 'Caja de Seguridad' },
          ],
          description: 'Habitación confortable con cama doble, perfecta para parejas. Incluye desayuno buffet y wifi.'
        },
        {
          id: 2,
          name: 'Doble Superior',
          image: 'https://images.unsplash.com/photo-1598928506242-824f4f7b4e59?w=500&h=400&fit=crop',
          capacity: 4,
          size: 45,
          originalPrice: 307.76,
          currentPrice: 246.21,
          discount: 20,
          offer: 'Alta demanda',
          services: [
            { id: 1, icon: 'wifi', label: 'WiFi' },
            { id: 2, icon: 'ac', label: 'A/C' },
            { id: 3, icon: 'bed', label: 'Cama King' },
            { id: 4, icon: 'shower', label: 'Baño Premium' },
            { id: 5, icon: 'pool', label: 'Acceso Piscina' },
            { id: 6, icon: 'tv', label: 'Smart TV' },
          ],
          description: 'Habitación premium con vista a la piscina. Incluye desayuno buffet, wifi y acceso a área VIP.'
        },
        {
          id: 3,
          name: 'Suite Presidencial',
          image: 'https://images.unsplash.com/photo-1595521624304-4c4726e67334?w=500&h=400&fit=crop',
          capacity: 6,
          size: 65,
          originalPrice: 450.00,
          currentPrice: 360.00,
          discount: 20,
          offer: 'Lujo',
          services: [
            { id: 1, icon: 'wifi', label: 'WiFi Premium' },
            { id: 2, icon: 'ac', label: 'A/C Dual' },
            { id: 3, icon: 'bed', label: 'Cama King + Sala' },
            { id: 4, icon: 'shower', label: 'Jacuzzi' },
            { id: 5, icon: 'pool', label: 'Acceso Piscina' },
            { id: 6, icon: 'tv', label: 'Home Theater' },
          ],
          description: 'Suntuosa suite con sala de estar separada. Servicios VIP incluidos, minibar y amenities premium.'
        },
      ];

      setRooms(mockRooms);
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(loadTimer);
  }, []);

  const getServiceIcon = (iconType) => {
    const iconProps = { size: 24 };
    switch (iconType) {
      case 'wifi':
        return <Wifi {...iconProps} />;
      case 'ac':
        return <Wind {...iconProps} />;
      case 'bed':
        return <Bed {...iconProps} />;
      case 'shower':
        return <Waves {...iconProps} />;
      case 'phone':
        return <Phone {...iconProps} />;
      case 'tv':
        return <Tv {...iconProps} />;
      case 'pool':
        return <Users {...iconProps} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="bs-loading__container">
        <div className="bs-loading__spinner">
          <div className="bs-loading__dot"></div>
          <div className="bs-loading__dot"></div>
          <div className="bs-loading__dot"></div>
          <div className="bs-loading__dot"></div>
        </div>
        <div className="bs-loading__text">
          <h2 className="bs-loading__title">Estamos buscando la mejor opción para usted</h2>
          <p className="bs-loading__subtitle">Gracias por tu paciencia</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bs-search__container">
      {/* Header con Filtros */}
      <div className="bs-results__header">
        <div className="bs-results__header-wrapper">
          <div className="bs-results__step">Paso 1/2</div>
          
          <h1 className="bs-results__title">
            Seleccione su tipo de estancia para la habitación 1
          </h1>

          <div className="bs-results__filters">
            <div className="bs-results__filter-item">
              <span className="bs-results__filter-icon">📅</span>
              <span>
                {bookingData?.checkIn && bookingData?.checkOut && (
                  <>
                    <span className="bs-results__filter-value">
                      {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                    </span>
                  </>
                )}
              </span>
            </div>

            <div className="bs-results__filter-item">
              <span className="bs-results__filter-icon">👥</span>
              <span className="bs-results__filter-value">
                {bookingData?.totalRooms} Habitación{bookingData?.totalRooms > 1 ? 'es' : ''} | {bookingData?.totalGuests} Huéspedes
              </span>
            </div>
          </div>

          <div className="bs-results__controls">
            <button className="bs-results__control-btn">
              CLASIFICAR
            </button>
            <button className="bs-results__control-btn">
              FILTROS
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bs-results__content">
        <div className="bs-results__grid">
          {rooms.map((room) => (
            <div key={room.id} className="bs-room-card__container">
              {/* Imagen */}
              <div style={{ position: 'relative' }}>
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="bs-room-card__image"
                />
                <div className="bs-room-card__badge">
                  {room.offer}
                </div>
                <div className="bs-room-card__image-nav">
                  <button className="bs-room-card__nav-btn">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="bs-room-card__nav-btn">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Detalles */}
              <div className="bs-room-card__details">
                <h2 className="bs-room-card__name">{room.name}</h2>

                <div className="bs-room-card__info">
                  <div className="bs-room-card__info-item">
                    <span className="bs-room-card__info-icon">👥</span>
                    <div>
                      <span className="bs-room-card__info-label">Máxima ocupación</span>
                      <span className="bs-room-card__info-value">{room.capacity} capacidad</span>
                    </div>
                  </div>
                  <div className="bs-room-card__info-item">
                    <span className="bs-room-card__info-icon">📏</span>
                    <div>
                      <span className="bs-room-card__info-label">Tamaño</span>
                      <span className="bs-room-card__info-value">{room.size} m²</span>
                    </div>
                  </div>
                </div>

                {/* Servicios */}
                <div className="bs-room-card__services">
                  <span className="bs-room-card__services-label">Servicios de la habitación</span>
                  <ul className="bs-room-card__services-list">
                    {room.services.map((service) => (
                      <li key={service.id} title={service.label} className="bs-room-card__service-icon">
                        {getServiceIcon(service.icon)}
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="#" className="bs-room-card__details-link">
                  Información detallada de la habitación →
                </a>
              </div>

              {/* Pricing y Acciones */}
              <div className="bs-room-card__pricing">
                <div className="bs-room-card__price">
                  <span className="bs-room-card__offer-badge">Oferta</span>
                  <span className="bs-room-card__price-original">USD {room.originalPrice.toFixed(2)}</span>
                  <div>
                    <span className="bs-room-card__price-current">USD {room.currentPrice.toFixed(2)}</span>
                    <span className="bs-room-card__price-period">Media por noche</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#666', margin: '1rem 0' }}>
                  Incluye desayuno buffet y wifi
                </p>

                <div className="bs-room-card__actions">
                  <button className="bs-room-card__select-btn">
                    SELECCIONE ESTA TARIFA
                  </button>
                  <button className="bs-room-card__more-options">
                    MÁS TARIFAS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Button */}
      <button className="hm-whatsapp__btn" title="Contactar por WhatsApp">
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default Busqueda;
