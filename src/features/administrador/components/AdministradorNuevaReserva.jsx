import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  FaUser, FaSearch, FaBed, FaCalendarAlt, FaClock, 
  FaUsers, FaChild, FaSwimmingPool, FaArrowRight, FaCheckCircle 
} from 'react-icons/fa';

import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { usuarioAdminService } from '../services/usuarioAdminService';
import { habitacionService } from '../services/habitacionService';
import { reservaService } from '../services/reservaService';
import '../components/AdministradorNuevaReserva.css';

export default function AdministradorNuevaReserva() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- ESTADOS DE DATOS ---
  const [usuarios, setUsuarios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  
  // --- ESTADOS DE BÚSQUEDA Y FILTROS ---
  const [searchUsuario, setSearchUsuario] = useState('');
  const [filterTipoHabitacion, setFilterTipoHabitacion] = useState('TODAS');

  // --- ESTADOS DEL FORMULARIO DE RESERVA ---
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const [modalidad, setModalidad] = useState('POR_DIA');
  
  // Fechas y horas (Aplica ahora para ambas modalidades)
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  
  // Aforo
  const [cantAdultos, setCantAdultos] = useState(1);
  const [cantNinos, setCantNinos] = useState(0);

  const tiposHabitacion = ['TODAS', 'SIMPLE', 'DOBLE', 'TRIPLE', 'MATRIMONIAL'];

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, roomsData] = await Promise.all([
          usuarioAdminService.listarTodos(),
          habitacionService.listarActivas()
        ]);
        setUsuarios(usersData);
        // Mostrar solo habitaciones LIBRES
        setHabitaciones(roomsData.filter(h => h.estado === 'LIBRE'));
      } catch (error) {
        console.error("Error al cargar datos:", error);
        Swal.fire({ 
          icon: 'error', 
          title: 'Error de conexión', 
          text: 'No se pudieron cargar los datos.',
          confirmButtonColor: '#C5A059'
        });
      }
    };
    fetchData();
  }, []);

  // Filtro de Usuarios (top 5)
  const filteredUsuarios = usuarios.filter(u => {
    if (!searchUsuario) return false; 
    const fullName = `${u.nombre} ${u.apellidos}`.toLowerCase();
    return fullName.includes(searchUsuario.toLowerCase());
  }).slice(0, 5); 

  // Filtro de Habitaciones
  const filteredHabitaciones = habitaciones.filter(h => {
    if (filterTipoHabitacion === 'TODAS') return true;
    return h.tipo === filterTipoHabitacion;
  });

  // Acceso a Piscina dinámico
  const accesoPiscina = selectedHabitacion 
    ? (selectedHabitacion.tipo === 'TRIPLE' || selectedHabitacion.tipo === 'MATRIMONIAL')
    : false;

  // Validación dinámica: Ahora los 4 campos de fecha y hora son obligatorios siempre
  const isFormValid = selectedUsuario && selectedHabitacion && fechaEntrada && horaEntrada && fechaSalida && horaSalida;

  const handleSiguiente = async () => {
    if (!isFormValid) return;

    // Validación extra: Verificar lógicamente que la salida sea después de la entrada en el FrontEnd
    const entradaObj = new Date(`${fechaEntrada}T${horaEntrada}:00`);
    const salidaObj = new Date(`${fechaSalida}T${horaSalida}:00`);

    if (salidaObj <= entradaObj) {
      return Swal.fire('Fechas Inválidas', 'La fecha y hora de salida debe ser posterior a la de entrada.', 'warning');
    }

    try {
      setLoading(true);
      
      // Enviamos exactamente el formato que pide Spring Boot DTO (ej. 2026-07-21T21:58:54.465Z)
      const reservaPayload = {
        usuarioId: Number(selectedUsuario.id),
        habitacionId: Number(selectedHabitacion.id),
        modalidad: modalidad,
        fechaHoraEntrada: entradaObj.toISOString(),
        fechaHoraSalida: salidaObj.toISOString(),
        cantAdultos: Number(cantAdultos),
        cantNinos: Number(cantNinos),
        accesoPiscina: Boolean(accesoPiscina)
      };

      // Petición al Backend
      const nuevaReserva = await reservaService.crearPresencial(reservaPayload);

      // Guardar contexto en LocalStorage para el paso 2
      localStorage.setItem('reservaEnProceso', JSON.stringify({
        ...nuevaReserva,
        habitacionTipo: selectedHabitacion.tipo,
        clienteNombre: `${selectedUsuario.nombre} ${selectedUsuario.apellidos}`
      }));

      Swal.fire({
        icon: 'success',
        title: '¡Reserva Iniciada!',
        text: 'La reserva ha sido creada en estado CONFIRMADA. Redirigiendo al siguiente paso...',
        timer: 1500,
        showConfirmButton: false
      });

      // Navegar al paso 2
      setTimeout(() => {
        navigate('/administrador/reservas/nueva/paso2'); 
      }, 1500);

    } catch (error) {
      console.error("Detalle del error:", error);
      Swal.fire({
        title: 'No se pudo crear la reserva',
        text: error.message || 'Verifique que las fechas sean futuras y no se solapen con otra reserva.',
        icon: 'error',
        confirmButtonColor: '#C5A059'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-reserva-container">
      <AdminSidebar />
      <AdminHeader title="Nueva Reserva" />

      <main className="crear-reserva-workspace">
        
        <div className="wizard-header">
          <div>
            <h2 className="wizard-title">Registro de Reserva Presencial</h2>
            <p className="wizard-subtitle">Paso 1: Selección de cliente y configuración de estadía</p>
          </div>
          <div className="wizard-steps">
            <span className="step active">1. Detalles Base</span>
            <span className="step-divider"></span>
            <span className="step pending">2. Consumos y Pagos</span>
          </div>
        </div>

        <div className="wizard-grid-layout">
          
          {/* COLUMNA IZQUIERDA: CLIENTE Y FECHAS */}
          <div className="wizard-col-left">
            
            {/* SECCIÓN 1: CLIENTE */}
            <div className="wizard-card">
              <h3 className="card-title"><FaUser /> Datos del Huésped</h3>
              
              {!selectedUsuario ? (
                <div className="search-client-box">
                  <div className="search-input-wrapper">
                    <FaSearch className="icon" />
                    <input 
                      type="text" 
                      placeholder="Buscar por nombres o apellidos..."
                      value={searchUsuario}
                      onChange={(e) => setSearchUsuario(e.target.value)}
                    />
                  </div>
                  
                  {searchUsuario && (
                    <ul className="search-results-list">
                      {filteredUsuarios.length > 0 ? (
                        filteredUsuarios.map(u => (
                          <li key={u.id} onClick={() => setSelectedUsuario(u)}>
                            <div className="res-name">{u.nombre} {u.apellidos}</div>
                            <div className="res-doc">{u.email} - {u.telefono || 'Sin Teléfono'}</div>
                          </li>
                        ))
                      ) : (
                        <li className="no-results">No se encontraron clientes registrados con esos datos.</li>
                      )}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="selected-client-card">
                  <div className="client-info">
                    <div className="client-avatar">
                      {selectedUsuario.nombre.charAt(0)}{selectedUsuario.apellidos?.charAt(0)}
                    </div>
                    <div>
                      <p className="client-name">{selectedUsuario.nombre} {selectedUsuario.apellidos}</p>
                      <p className="client-email">{selectedUsuario.email}</p>
                    </div>
                  </div>
                  <button className="btn-change-outline" onClick={() => { setSelectedUsuario(null); setSearchUsuario(''); }}>Cambiar</button>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: CONFIGURACIÓN DE ESTADÍA */}
            <div className="wizard-card">
              <h3 className="card-title"><FaCalendarAlt /> Configuración de Estadía</h3>
              
              <div className="form-group">
                <label>Modalidad de Reserva</label>
                <div className="radio-group">
                  <label className={`radio-btn ${modalidad === 'POR_DIA' ? 'active' : ''}`}>
                    <input type="radio" name="modalidad" value="POR_DIA" checked={modalidad === 'POR_DIA'} onChange={() => setModalidad('POR_DIA')} />
                    POR DÍA
                  </label>
                  <label className={`radio-btn ${modalidad === 'POR_HORAS' ? 'active' : ''}`}>
                    <input type="radio" name="modalidad" value="POR_HORAS" checked={modalidad === 'POR_HORAS'} onChange={() => setModalidad('POR_HORAS')} />
                    POR HORAS
                  </label>
                </div>
              </div>

              {/* RENDERIZADO DE FECHAS (AHORA VISIBLE PARA AMBAS MODALIDADES) */}
              <div className="dates-grid">
                <div className="form-group">
                  <label>Fecha y Hora de Entrada</label>
                  <div className="datetime-wrapper">
                    <input type="date" value={fechaEntrada} onChange={e => setFechaEntrada(e.target.value)} />
                    <input type="time" value={horaEntrada} onChange={e => setHoraEntrada(e.target.value)} />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Fecha y Hora de Salida</label>
                  <div className="datetime-wrapper">
                    <input type="date" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} />
                    <input type="time" value={horaSalida} onChange={e => setHoraSalida(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="occupancy-grid">
                <div className="form-group">
                  <label><FaUsers /> Adultos</label>
                  <div className="spinner-input">
                    <button type="button" onClick={() => setCantAdultos(Math.max(1, cantAdultos - 1))}>-</button>
                    <input type="number" value={cantAdultos} onChange={e => setCantAdultos(Number(e.target.value))} min="1" />
                    <button type="button" onClick={() => setCantAdultos(cantAdultos + 1)}>+</button>
                  </div>
                </div>
                <div className="form-group">
                  <label><FaChild /> Niños</label>
                  <div className="spinner-input">
                    <button type="button" onClick={() => setCantNinos(Math.max(0, cantNinos - 1))}>-</button>
                    <input type="number" value={cantNinos} onChange={e => setCantNinos(Number(e.target.value))} min="0" />
                    <button type="button" onClick={() => setCantNinos(cantNinos + 1)}>+</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* COLUMNA DERECHA: SELECCIÓN DE HABITACIÓN */}
          <div className="wizard-col-right">
            <div className="wizard-card fill-height">
              <div className="room-header">
                <h3 className="card-title"><FaBed /> Selección de Habitación</h3>
                {selectedHabitacion && (
                  <button className="btn-change-room" onClick={() => setSelectedHabitacion(null)}>
                    Cambiar
                  </button>
                )}
              </div>

              {!selectedHabitacion ? (
                <>
                  <div className="room-filters">
                    {tiposHabitacion.map(tipo => (
                      <button 
                        key={tipo} 
                        className={`filter-room-btn ${filterTipoHabitacion === tipo ? 'active' : ''}`}
                        onClick={() => setFilterTipoHabitacion(tipo)}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>

                  <div className="rooms-selection-grid">
                    {filteredHabitaciones.map(hab => (
                      <div 
                        key={hab.id} 
                        className="room-select-card"
                        onClick={() => setSelectedHabitacion(hab)}
                      >
                        <div className="room-num">#{hab.numeroHabitacion}</div>
                        <div className="room-type">{hab.tipo}</div>
                        <div className="room-price">
                          {/* Muestra tarifa dependiendo si es por dia o por horas */}
                          S/ {Number(modalidad === 'POR_HORAS' ? hab.precioHora : hab.precioDia).toFixed(2)} 
                          <span> /{modalidad === 'POR_HORAS' ? 'hora' : 'día'}</span>
                        </div>
                      </div>
                    ))}
                    {filteredHabitaciones.length === 0 && (
                      <div className="no-rooms-msg">No hay habitaciones Libres de este tipo en el inventario.</div>
                    )}
                  </div>
                </>
              ) : (
                <div className="selected-room-view">
                  <div className="selected-room-badge"><FaCheckCircle /> Habitación Seleccionada</div>
                  <div className="room-big-details">
                    <h1>Hab. {selectedHabitacion.numeroHabitacion}</h1>
                    <h3>{selectedHabitacion.tipo}</h3>
                  </div>
                  
                  <div className="room-perks">
                    <div className="perk-item">
                      <FaClock className="perk-icon" />
                      <div>
                        <strong>Tarifa Aplicada ({modalidad.replace('_', ' ')}):</strong> <br/>
                        S/ {Number(modalidad === 'POR_HORAS' ? selectedHabitacion.precioHora : selectedHabitacion.precioDia).toFixed(2)}
                      </div>
                    </div>
                    
                    {/* Logica del acceso a piscina (Triple o Matrimonial es TRUE) */}
                    {accesoPiscina ? (
                      <div className="perk-item perk-gold">
                        <FaSwimmingPool className="perk-icon" />
                        <div>
                          <strong>Piscina:</strong> ACCESO INCLUIDO
                          <span> (Beneficio por habitación {selectedHabitacion.tipo})</span>
                        </div>
                      </div>
                    ) : (
                      <div className="perk-item perk-disabled">
                        <FaSwimmingPool className="perk-icon" />
                        <div>
                          <strong>Piscina:</strong> NO INCLUIDA
                          <span> (Exclusivo para Triple o Matrimonial)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* WIZARD FOOTER */}
        <div className="wizard-footer">
          <button className="btn-secondary" onClick={() => navigate(-1)}>Cancelar y Volver</button>
          
          <button 
            className="btn-primary" 
            onClick={handleSiguiente}
            disabled={loading || !isFormValid} 
          >
            {loading ? 'Procesando...' : 'Siguiente Paso'} <FaArrowRight />
          </button>
        </div>

      </main>
    </div>
  );
}