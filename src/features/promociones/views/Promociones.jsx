import { useState } from 'react';
import {
  FaTag,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaBox,
  FaCheckCircle,
  FaClock as FaClockAlt,
  FaLock,
  FaFire,
} from 'react-icons/fa';
import '../styles/Promociones.css';

export default function Promociones() {
  const [copiedCode, setCopiedCode] = useState(null);

  const promotions = [
    {
      id: 1,
      title: 'Festival de la Vendimia',
      icon: FaCalendarAlt,
      color: '#8e44ad',
      discount: '25%',
      description:
        'Paquete especial para la festividad más importante de Ica. Reserva con 15 días de anticipación.',
      code: 'VENDIMIA2024',
      validity: 'Del 1-15 de Marzo',
      terms:
        'Válido solo para habitaciones dobles y triples. No acumulable con otras ofertas.',
    },
    {
      id: 2,
      title: 'Descuento por Horas',
      icon: FaClock,
      color: '#3498db',
      discount: '20%',
      description:
        'Tarifas reducidas para viajeros corporativos. Alojamiento por período corto.',
      code: 'WORKFRIENDLY',
      validity: 'Vigencia permanente',
      terms: 'Mínimo 4 horas. Aplica solo en horarios especiales.',
    },
    {
      id: 3,
      title: 'Registro y Beneficios',
      icon: FaUser,
      color: '#2ecc71',
      discount: '15%',
      description:
        'Crea tu cuenta y accede a tarifas preferenciales. Descuentos exclusivos para usuarios registrados.',
      code: 'MIEMBRO2024',
      validity: 'Permanente para cuentistas',
      terms: 'Válido en segunda y posteriores reservas.',
    },
    {
      id: 4,
      title: 'Todo Incluido Premium',
      icon: FaBox,
      color: '#e74c3c',
      discount: '30%',
      description:
        'Hospedaje + Acceso a piscina en paquete especial. Máximo valor por tu dinero.',
      code: 'PISCINA30',
      validity: 'Del 15 al 30 de cada mes',
      terms: 'Aplica solo habitaciones simples, dobles y triples.',
    },
    {
      id: 5,
      title: 'Fin de Semana Largo',
      icon: FaFire,
      color: '#f39c12',
      discount: '22%',
      description:
        'Reservas en feriados y fines de semana prolongados. Disfruta la región completa.',
      code: 'WEEKEND22',
      validity: 'En fechas de feriados confirmados',
      terms: 'Mínimo 3 noches. Debe ser cuarto de habitación completo.',
    },
    {
      id: 6,
      title: 'Bodega del Mes',
      icon: FaTag,
      color: '#16a085',
      discount: 'Variante',
      description:
        'Promociones especiales en licores y vinos. Ofertas actualizadas mensualmente.',
      code: 'BODEGA2024',
      validity: 'Actualización cada mes',
      terms: 'Consultable en recepción. Limitado a stock disponible.',
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const conditions = [
    {
      title: 'Validez de Códigos',
      description:
        'Los códigos promocionales tienen vigencia limitada. Verifica la fecha antes de reservar.',
    },
    {
      title: 'No Acumulables',
      description:
        'No es posible combinar múltiples promociones en una sola reserva.',
    },
    {
      title: 'Cancelaciones',
      description:
        'Las tarifas promocionales aplican diferentes políticas de cancelación. Revisa al reservar.',
    },
    {
      title: 'Disponibilidad',
      description:
        'Oferta sujeta a disponibilidad de inventario. Se puede agotar rápidamente.',
    },
  ];

  return (
    <div className="promociones-container">
      {/* Hero Section */}
      <div className="promociones-hero">
        <div className="promociones-hero-overlay" />
        <div className="promociones-hero-content">
          <h1 className="promociones-title">Promociones Especiales</h1>
          <p className="promociones-subtitle">
            Ahorra más con nuestras ofertas exclusivas
          </p>
        </div>
      </div>

      {/* Main Promotions Section */}
      <section className="promociones-main-section">
        <div className="promociones-main-container">
          <h2 className="promociones-section-title">Ofertas Vigentes</h2>
          <div className="promociones-grid">
            {promotions.map((promo, idx) => {
              const IconComponent = promo.icon;
              return (
                <div
                  key={promo.id}
                  className="promociones-card"
                  style={{
                    borderTopColor: promo.color,
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s backwards`,
                  }}
                >
                  {/* Badge */}
                  <div
                    className="promociones-badge"
                    style={{ backgroundColor: promo.color }}
                  >
                    <span className="promociones-badge-text">
                      {promo.discount} OFF
                    </span>
                  </div>

                  {/* Header */}
                  <div className="promociones-card-header">
                    <div
                      className="promociones-card-icon"
                      style={{ backgroundColor: `${promo.color}20` }}
                    >
                      <IconComponent style={{ color: promo.color }} size={28} />
                    </div>
                    <h3 className="promociones-card-title">{promo.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="promociones-card-description">{promo.description}</p>

                  {/* Details */}
                  <div className="promociones-card-details">
                    <div className="promociones-detail-item">
                      <span className="promociones-detail-label">Código:</span>
                      <div className="promociones-detail-value-container">
                        <span className="promociones-detail-value">
                          {promo.code}
                        </span>
                        <button
                          className="promociones-copy-btn"
                          onClick={() => copyToClipboard(promo.code)}
                          title="Copiar código"
                        >
                          {copiedCode === promo.code ? (
                            <FaCheckCircle size={16} color={promo.color} />
                          ) : (
                            '📋'
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="promociones-detail-item">
                      <span className="promociones-detail-label">Vigencia:</span>
                      <span className="promociones-detail-value">
                        {promo.validity}
                      </span>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="promociones-card-terms">
                    <h4 className="promociones-terms-title">Términos:</h4>
                    <p className="promociones-terms-text">{promo.terms}</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    className="promociones-card-btn"
                    style={{ backgroundColor: promo.color }}
                  >
                    Reservar Ahora
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bundle Promotions */}
      <section className="promociones-bundle-section">
        <h2 className="promociones-section-title">Paquetes Combinados</h2>
        <div className="promociones-bundle-container">
          <div className="promociones-bundle-card">
            <div className="promociones-bundle-icon">
              <FaBox />
            </div>
            <h3 className="promociones-bundle-title">Hospedaje + Piscina</h3>
            <p className="promociones-bundle-description">
              Habitación doble + acceso incluido a piscina
            </p>
            <div className="promociones-bundle-benefit">
              <span className="promociones-bundle-price">Desde S/. 85/día</span>
              <span className="promociones-bundle-saving">Ahorras S/. 25</span>
            </div>
            <button className="promociones-bundle-btn">Ver Paquete</button>
          </div>

          <div className="promociones-bundle-card">
            <div className="promociones-bundle-icon">
              <FaClock />
            </div>
            <h3 className="promociones-bundle-title">Pausa de Trabajo</h3>
            <p className="promociones-bundle-description">
              4 horas + Wi-Fi + Escritorio dedicado
            </p>
            <div className="promociones-bundle-benefit">
              <span className="promociones-bundle-price">Desde S/. 45</span>
              <span className="promociones-bundle-saving">Ahorras S/. 15</span>
            </div>
            <button className="promociones-bundle-btn">Ver Paquete</button>
          </div>

          <div className="promociones-bundle-card">
            <div className="promociones-bundle-icon">
              <FaCalendarAlt />
            </div>
            <h3 className="promociones-bundle-title">Fin de Semana Completo</h3>
            <p className="promociones-bundle-description">
              3 noches + desayuno + actividades guiadas
            </p>
            <div className="promociones-bundle-benefit">
              <span className="promociones-bundle-price">Desde S/. 280</span>
              <span className="promociones-bundle-saving">Ahorras S/. 60</span>
            </div>
            <button className="promociones-bundle-btn">Ver Paquete</button>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="promociones-conditions-section">
        <h2 className="promociones-section-title">Condiciones Generales</h2>
        <div className="promociones-conditions-grid">
          {conditions.map((condition, idx) => (
            <div key={idx} className="promociones-condition-card">
              <div className="promociones-condition-icon">
                <FaLock />
              </div>
              <h3 className="promociones-condition-title">{condition.title}</h3>
              <p className="promociones-condition-text">{condition.description}</p>
            </div>
          ))}
        </div>

        <div className="promociones-disclaimer">
          <p>
            Todas las promociones están sujetas a cambios sin previo aviso. Verifica
            disponibilidad al momento de hacer tu reserva. Para más información,
            contacta con nuestro equipo de atención al cliente.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="promociones-cta-section">
        <div className="promociones-cta-content">
          <h2 className="promociones-cta-title">
            ¿No viste lo que buscas?
          </h2>
          <p className="promociones-cta-text">
            Contacta con nuestro equipo para ofertas personalizadas y grupos corporativos
          </p>
          <button className="promociones-cta-button">Contactar Ahora</button>
        </div>
      </section>
    </div>
  );
}
