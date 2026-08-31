import { useState, useEffect } from 'react';
import { 
  FaTimes, 
  FaUser, 
  FaBed, 
  FaCalendarCheck, 
  FaCalendarTimes, 
  FaMoneyBillWave,
  FaReceipt
} from 'react-icons/fa';
import moment from 'moment';
import { reservaService } from '../services/reservaService';
import '../components/ReservaDetalles.css';

export default function ReservaDetalle({ reservaId, onClose }) {
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        setLoading(true);
        const data = await reservaService.obtenerPorId(reservaId);
        setDetalle(data);
      } catch (error) {
        console.error("Error al cargar detalle:", error);
      } finally {
        setLoading(false);
      }
    };
    if (reservaId) fetchDetalle();
  }, [reservaId]);

  if (loading || !detalle) return null; // El componente principal ya tiene loading general, pero evitamos crasheos

  const getStatusBadge = (estado) => {
    switch(estado) {
      case 'PAGADA': return 'badge-pagada';
      case 'FINALIZADA': return 'badge-finalizada';
      case 'ANULADA': return 'badge-anulada';
      default: return 'badge-pendiente';
    }
  };

  return (
    <div className="detalle-reserva-overlay" onClick={onClose}>
      <div className="detalle-reserva-modal" onClick={e => e.stopPropagation()}>
        
        {/* Cabecera del Modal */}
        <div className="detalle-reserva-header">
          <div>
            <h2>Reserva #{detalle.id}</h2>
            <span className="fecha-creacion">
              Creada el {moment(detalle.fechaCreacion).format('DD MMMM YYYY, HH:mm')}
            </span>
          </div>
          <div className="header-actions">
            <span className={`estado-etiqueta ${getStatusBadge(detalle.estado)}`}>
              {detalle.estado}
            </span>
            <button className="btn-close-modal" onClick={onClose}><FaTimes /></button>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="detalle-reserva-body">
          
          <div className="info-grid">
            {/* Info Huésped */}
            <div className="info-card">
              <div className="card-icon"><FaUser /></div>
              <div className="card-content">
                <p className="card-label">Huésped Principal</p>
                <p className="card-value">{detalle.usuarioNombre}</p>
                <p className="card-subtext">ID Sistema: {detalle.usuarioId}</p>
              </div>
            </div>

            {/* Info Habitación */}
            <div className="info-card">
              <div className="card-icon"><FaBed /></div>
              <div className="card-content">
                <p className="card-label">Habitación Asignada</p>
                <p className="card-value">Habitación {detalle.habitacionNumero}</p>
                <p className="card-subtext">ID Sistema: {detalle.habitacionId}</p>
              </div>
            </div>

            {/* Fechas */}
            <div className="info-card">
              <div className="card-icon"><FaCalendarCheck /></div>
              <div className="card-content">
                <p className="card-label">Check-In</p>
                <p className="card-value">{moment(detalle.fechaHoraEntrada).format('DD/MM/YYYY')}</p>
                <p className="card-subtext">{moment(detalle.fechaHoraEntrada).format('HH:mm A')}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-icon"><FaCalendarTimes /></div>
              <div className="card-content">
                <p className="card-label">Check-Out</p>
                <p className="card-value">{moment(detalle.fechaHoraSalida).format('DD/MM/YYYY')}</p>
                <p className="card-subtext">{moment(detalle.fechaHoraSalida).format('HH:mm A')}</p>
              </div>
            </div>
          </div>

          {/* Detalles de Ocupación */}
          <div className="ocupacion-details">
            <h3 className="section-title">Detalles de Ocupación</h3>
            <div className="ocupacion-tags">
              <span className="tag">Modalidad: <strong>{detalle.modalidad.replace('_', ' ')}</strong></span>
              <span className="tag">Adultos: <strong>{detalle.cantAdultos}</strong></span>
              <span className="tag">Niños: <strong>{detalle.cantNinos}</strong></span>
              <span className={`tag ${detalle.accesoPiscina ? 'tag-gold' : ''}`}>
                Piscina: <strong>{detalle.accesoPiscina ? 'INCLUIDA' : 'NO INCLUIDA'}</strong>
              </span>
            </div>
          </div>

          {/* Desglose Financiero */}
          <div className="financiero-details">
            <h3 className="section-title"><FaReceipt /> Desglose de Facturación</h3>
            
            <div className="invoice-row">
              <span>Costo por Estancia (Habitación)</span>
              <span>S/{Number(detalle.costoHabitacion).toFixed(2)}</span>
            </div>
            
            {detalle.costoPiscina > 0 && (
              <div className="invoice-row">
                <span>Acceso a Piscina (Adicional)</span>
                <span>S/{Number(detalle.costoPiscina).toFixed(2)}</span>
              </div>
            )}
            
            {detalle.costoProductos > 0 && (
              <div className="invoice-row">
                <span>Consumos de Room Service / Kiosko</span>
                <span>S/{Number(detalle.costoProductos).toFixed(2)}</span>
              </div>
            )}

            <div className="invoice-total">
              <span>TOTAL GENERAL</span>
              <span className="total-amount">S/{Number(detalle.totalGeneral).toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}