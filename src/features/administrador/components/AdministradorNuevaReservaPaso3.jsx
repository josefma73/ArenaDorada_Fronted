import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  FaArrowLeft, FaCheckCircle, FaReceipt, 
  FaCreditCard, FaMoneyCheckAlt, FaMobileAlt 
} from 'react-icons/fa';

import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { reservaService } from '../services/reservaService';
import { pagoService } from '../services/pagoService';
import '../components/AdministradorNuevaReservaPaso3.css';

export default function AdministradorNuevaReservaPaso3() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  
  const [reservaActualizada, setReservaActualizada] = useState(null);
  
  // Opciones: 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Yape'
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('');

  // Mapeo para el Backend según image_0e7a01.png
  const mapMetodoPagoToBackend = (metodoUI) => {
    switch(metodoUI) {
      case 'Tarjeta de Crédito': return 'TARJETA_CREDITO';
      case 'Tarjeta de Débito': return 'TARJETA_DEBITO';
      case 'Yape': return 'YAPE';
      default: return 'EFECTIVO'; // Por si en un futuro agregas más
    }
  };

  useEffect(() => {
    const cargarReservaFinal = async () => {
      const stored = localStorage.getItem('reservaEnProceso');
      if (!stored) {
        Swal.fire('Error', 'No se encontró la reserva.', 'error');
        navigate('/administrador/reservas/nueva');
        return;
      }

      const { id } = JSON.parse(stored);
      
      try {
        setFetchingData(true);
        // Hacemos un GET de la reserva para traer el totalGeneral con los productos ya sumados
        const data = await reservaService.obtenerPorId(id);
        setReservaActualizada(data);
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
        Swal.fire('Error', 'No se pudo cargar el resumen de la cuenta.', 'error');
      } finally {
        setFetchingData(false);
      }
    };

    cargarReservaFinal();
  }, [navigate]);

  const handleProcesarPago = async () => {
    if (!metodoSeleccionado) {
      return Swal.fire('Atención', 'Selecciona un método de pago para continuar.', 'warning');
    }

    try {
      setLoading(true);

      const pagoPayload = {
        reservaId: reservaActualizada.id,
        monto: reservaActualizada.totalGeneral,
        metodoPago: mapMetodoPagoToBackend(metodoSeleccionado)
      };

      // 1. Registramos el pago
      await pagoService.crear(pagoPayload);

      // 2. (Opcional pero recomendado) Cambiamos el estado de la reserva a PAGADA
      await reservaService.cambiarEstado(reservaActualizada.id, 'PAGADA');

      // 3. Limpiamos el proceso
      localStorage.removeItem('reservaEnProceso');

      await Swal.fire({
        icon: 'success',
        title: '¡Pago Procesado con Éxito!',
        text: 'La reserva ha finalizado su registro y está lista.',
        confirmButtonColor: '#C5A059'
      });

      // 4. Regresamos a la vista general de reservas
      navigate('/administrador/reservas');

    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.message || 'Hubo un problema al procesar el pago.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData || !reservaActualizada) {
    return (
      <div className="crear-reserva-container">
        <AdminSidebar />
        <AdminHeader title="Procesar Pago" />
        <main className="crear-reserva-workspace loading-workspace">
          <div className="spinner"></div>
          <h2>Calculando la cuenta final...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="crear-reserva-container">
      <AdminSidebar />
      <AdminHeader title="Procesar Pago" />

      <main className="crear-reserva-workspace">
        
        {/* WIZARD HEADER */}
        <div className="wizard-header">
          <div>
            <h2 className="wizard-title">Registro de Reserva Presencial</h2>
            <p className="wizard-subtitle">Paso 3: Selección de método de pago y confirmación</p>
          </div>
          <div className="wizard-steps">
            <span className="step completed">1. Detalles Base</span>
            <span className="step-divider"></span>
            <span className="step completed">2. Consumos</span>
            <span className="step-divider"></span>
            <span className="step active">3. Pagos</span>
          </div>
        </div>

        <div className="wizard-grid-layout-paso3">
          
          {/* COLUMNA IZQUIERDA: MÉTODOS DE PAGO */}
          <div className="wizard-payment-col">
            <div className="wizard-card fill-height">
              <h3 className="card-title">Método de Pago</h3>
              <p className="payment-instructions">Seleccione cómo el huésped cancelará la cuenta total de su reserva.</p>
              
              <div className="payment-methods-grid">
                
                {/* TARJETA DE CRÉDITO */}
                <div 
                  className={`payment-method-card ${metodoSeleccionado === 'Tarjeta de Crédito' ? 'selected' : ''}`}
                  onClick={() => setMetodoSeleccionado('Tarjeta de Crédito')}
                >
                  <div className="payment-icon"><FaCreditCard /></div>
                  <div className="payment-details">
                    <h4>Tarjeta de Crédito</h4>
                    <p>Visa, MasterCard, Amex</p>
                  </div>
                  <div className="payment-radio">
                    <div className="radio-inner"></div>
                  </div>
                </div>

                {/* TARJETA DE DÉBITO */}
                <div 
                  className={`payment-method-card ${metodoSeleccionado === 'Tarjeta de Débito' ? 'selected' : ''}`}
                  onClick={() => setMetodoSeleccionado('Tarjeta de Débito')}
                >
                  <div className="payment-icon"><FaMoneyCheckAlt /></div>
                  <div className="payment-details">
                    <h4>Tarjeta de Débito</h4>
                    <p>Débito de cualquier banco</p>
                  </div>
                  <div className="payment-radio">
                    <div className="radio-inner"></div>
                  </div>
                </div>

                {/* YAPE */}
                <div 
                  className={`payment-method-card ${metodoSeleccionado === 'Yape' ? 'selected' : ''}`}
                  onClick={() => setMetodoSeleccionado('Yape')}
                >
                  <div className="payment-icon yape-icon"><FaMobileAlt /></div>
                  <div className="payment-details">
                    <h4>Yape / Billetera Digital</h4>
                    <p>Transferencia inmediata</p>
                  </div>
                  <div className="payment-radio">
                    <div className="radio-inner"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN DE LA CUENTA */}
          <div className="wizard-summary-col">
            <div className="wizard-card fill-height summary-card">
              <h3 className="card-title"><FaReceipt /> Resumen de la Cuenta</h3>
              
              <div className="guest-quick-info">
                <strong>Huésped:</strong> {reservaActualizada.usuarioNombre} <br/>
                <strong>Habitación:</strong> #{reservaActualizada.habitacionNumero}
              </div>

              <div className="invoice-breakdown">
                
                <div className="invoice-row">
                  <span>Costo de Estadía (Habitación)</span>
                  <span>S/ {Number(reservaActualizada.costoHabitacion).toFixed(2)}</span>
                </div>

                {reservaActualizada.costoPiscina > 0 && (
                  <div className="invoice-row">
                    <span>Acceso a Piscina</span>
                    <span>S/ {Number(reservaActualizada.costoPiscina).toFixed(2)}</span>
                  </div>
                )}

                {reservaActualizada.costoProductos > 0 && (
                  <div className="invoice-row">
                    <span>Consumos Adicionales (Kiosko)</span>
                    <span>S/ {Number(reservaActualizada.costoProductos).toFixed(2)}</span>
                  </div>
                )}

                <div className="invoice-total">
                  <span>Total a Pagar</span>
                  <span className="total-amount">S/ {Number(reservaActualizada.totalGeneral).toFixed(2)}</span>
                </div>

              </div>

              {metodoSeleccionado && (
                <div className="payment-ready-badge">
                  <FaCheckCircle /> Pago preparado vía {metodoSeleccionado}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* WIZARD FOOTER */}
        <div className="wizard-footer">
          <button 
            className="btn-secondary" 
            onClick={() => navigate('/administrador/reservas/paso2')}
            disabled={loading}
          >
            <FaArrowLeft /> Regresar a Consumos
          </button>
          
          <button 
            className="btn-primary" 
            onClick={handleProcesarPago}
            disabled={loading || !metodoSeleccionado} 
          >
            {loading ? 'Procesando Pago...' : 'Confirmar y Finalizar Reserva'} <FaCheckCircle />
          </button>
        </div>

      </main>
    </div>
  );
}