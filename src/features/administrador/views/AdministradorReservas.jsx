import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  FaList,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaEye,
  FaDoorOpen,
  FaPlus // <-- Nuevo ícono importado
} from 'react-icons/fa';
import Swal from 'sweetalert2';

import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import ReservaDetalle from '../components/ReservaDetalles';
import { reservaService } from '../services/reservaService';
import { habitacionService } from '../services/habitacionService';
import '../styles/AdministradorReservas.css';

moment.locale('es');
const localizer = momentLocalizer(moment);

export default function AdministradorReservas() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterRoom, setFilterRoom] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');

  const [selectedReservaId, setSelectedReservaId] = useState(null);

  const estadosReserva = ['Todos', 'PENDIENTE', 'PAGADA', 'FINALIZADA', 'ANULADA'];

  useEffect(() => {
    if (id) {
      setSelectedReservaId(parseInt(id));
    } else {
      setSelectedReservaId(null);
    }
  }, [id]);

  const handleCloseModal = () => {
    setSelectedReservaId(null);
    if (id) {
      navigate('/administrador/reservas', { replace: true });
    }
  };

  const cargarHabitaciones = async () => {
    try {
      const data = await habitacionService.listarTodas();
      setHabitaciones(data);
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
    }
  };

  const cargarReservas = async () => {
    try {
      setLoading(true);
      let data = [];
      if (filterRoom === 'Todas') {
        data = await reservaService.listarTodas();
      } else {
        data = await reservaService.listarPorHabitacion(filterRoom);
      }
      setReservas(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudieron cargar las reservas.',
        confirmButtonColor: '#C5A059'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  useEffect(() => {
    cargarReservas();
  }, [filterRoom]);

  const filteredReservas = reservas.filter((res) => {
    const matchesStatus = filterStatus === 'Todos' || res.estado === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      res.usuarioNombre?.toLowerCase().includes(searchLower) ||
      res.habitacionNumero?.toLowerCase().includes(searchLower) ||
      res.id.toString().includes(searchLower);
    
    return matchesStatus && matchesSearch;
  });

  const calendarEvents = filteredReservas.map(res => ({
    id: res.id,
    title: `Hab. ${res.habitacionNumero} - ${res.usuarioNombre}`,
    start: new Date(res.fechaHoraEntrada),
    end: new Date(res.fechaHoraSalida),
    estado: res.estado,
    resource: res
  }));

  const eventStyleGetter = (event) => {
    let backgroundColor = '#C5A059'; 
    if (event.estado === 'PAGADA') backgroundColor = '#4CAF50'; 
    if (event.estado === 'FINALIZADA') backgroundColor = '#2196F3'; 
    if (event.estado === 'ANULADA') backgroundColor = '#F44336'; 

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.95,
        color: 'white',
        border: 'none',
        display: 'block',
        fontWeight: '600',
        fontSize: '0.80rem',
        padding: '2px 6px'
      }
    };
  };

  const getStatusBadgeClass = (estado) => {
    switch(estado) {
      case 'PAGADA': return 'status-pagada';
      case 'FINALIZADA': return 'status-finalizada';
      case 'ANULADA': return 'status-anulada';
      default: return 'status-pendiente';
    }
  };

  return (
    <div className="admin-reservas-container">
      <AdminSidebar />
      <AdminHeader title="Gestión de Reservas" />

      <main className="admin-reservas-workspace">
        
        {/* ENCABEZADO MODIFICADO CON EL NUEVO BOTÓN */}
        <div className="admin-reservas-header">
          <div>
            <h2 className="admin-reservas-title">Reservas y Ocupación</h2>
            <p className="admin-reservas-subtitle">Gestiona las estadías, verifica el calendario de ocupación y revisa los estados de pago.</p>
          </div>
          
          <div className="header-actions-group">
            {/* BOTÓN NUEVA RESERVA */}
            <button 
              className="admin-btn-nueva-reserva" 
              onClick={() => navigate('/administrador/reservas/nueva')}
            >
              <FaPlus /> Nueva Reserva
            </button>

            {/* TOGGLE VISTA LISTA / CALENDARIO */}
            <div className="admin-reservas-view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaList /> Lista
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                onClick={() => setViewMode('calendar')}
              >
                <FaCalendarAlt /> Calendario
              </button>
            </div>
          </div>
        </div>

        <div className="admin-reservas-controls">
          <div className="admin-reservas-search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por cliente, N° de reserva o habitación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-reservas-filters">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                {estadosReserva.map(est => <option key={est} value={est}>Estado: {est}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <FaDoorOpen className="filter-icon" />
              <select 
                value={filterRoom} 
                onChange={(e) => setFilterRoom(e.target.value)}
                className="filter-select"
              >
                <option value="Todas">Todas las Habitaciones</option>
                {habitaciones.map(hab => (
                  <option key={hab.id} value={hab.id}>
                    Habitación {hab.numeroHabitacion} ({hab.tipo})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="admin-reservas-content-area">
          {loading ? (
            <div className="admin-reservas-loading">
              <div className="spinner"></div>
              <h3>Cargando información de reservas...</h3>
            </div>
          ) : viewMode === 'list' ? (
            <div className="admin-reservas-table-wrapper">
              <table className="admin-reservas-table">
                <thead>
                  <tr>
                    <th>Reserva ID</th>
                    <th>Cliente</th>
                    <th>Habitación</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservas.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="empty-state">No se encontraron reservas con los filtros actuales.</td>
                    </tr>
                  ) : (
                    filteredReservas.map(res => (
                      <tr key={res.id}>
                        <td className="fw-bold gold-text">#{res.id}</td>
                        <td className="fw-bold">{res.usuarioNombre}</td>
                        <td>Hab. {res.habitacionNumero}</td>
                        <td>{moment(res.fechaHoraEntrada).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(res.fechaHoraSalida).format('DD/MM/YYYY HH:mm')}</td>
                        <td>
                          <span className={`reserva-badge ${getStatusBadgeClass(res.estado)}`}>
                            {res.estado}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-view-details"
                            onClick={() => setSelectedReservaId(res.id)}
                          >
                            <FaEye /> Detalles
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-reservas-calendar-wrapper">
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '70vh', minHeight: '600px' }}
                culture="es"
                date={calendarDate}
                onNavigate={(newDate) => setCalendarDate(newDate)}
                view={calendarView}
                onView={(newView) => setCalendarView(newView)}
                messages={{
                  next: "Sig.",
                  previous: "Ant.",
                  today: "Hoy",
                  month: "Mes",
                  week: "Semana",
                  day: "Día",
                  agenda: "Agenda",
                  date: "Fecha",
                  time: "Hora",
                  event: "Reserva",
                  noEventsInRange: "No hay reservas registradas en este periodo."
                }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={(event) => setSelectedReservaId(event.id)}
                views={['month', 'week', 'day', 'agenda']}
              />
            </div>
          )}
        </div>

        {selectedReservaId && (
          <ReservaDetalle 
            reservaId={selectedReservaId} 
            onClose={handleCloseModal}
          />
        )}

      </main>
    </div>
  );
}