import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBed,
  FaPlus,
  FaEdit,
  FaSearch,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
  FaImage,
  FaLayerGroup,
  FaMoneyBillWave,
  FaRegClock,
  FaConciergeBell,
  FaUser,
  FaCalendarAlt,
  FaInfoCircle,
  FaEye
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { habitacionService } from '../services/habitacionService';
import { reservaService } from '../services/reservaService';
import '../styles/AdministradorHabitaciones.css';

export default function AdministradorHabitaciones() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  // Estados de filtros y búsquedas
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFloor, setFilterFloor] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const roomTypes = ['SIMPLE', 'DOBLE', 'TRIPLE', 'MATRIMONIAL'];
  const floors = ['Todos', 'Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  const statusOptions = ['Todos', 'LIBRE', 'OCUPADO', 'MANTENIMIENTO'];

  const cargarDatos = async () => {
    try {
      setLoading(true);
      // Peticiones paralelas asíncronas de alto rendimiento
      const [roomsData, reservationsData] = await Promise.all([
        habitacionService.listarTodas(),
        reservaService.listarTodas().catch(() => []) // Previene caídas si falla temporalmente el rol staff
      ]);

      const sortedRooms = roomsData.sort((a, b) => 
        a.numeroHabitacion.localeCompare(b.numeroHabitacion, undefined, { numeric: true })
      );

      setRooms(sortedRooms);
      setAllReservations(reservationsData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de sincronización',
        text: 'No se pudieron recuperar los datos operativos del servidor.',
        confirmButtonColor: '#C5A059'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Busca los datos analíticos de la reserva vinculada a la habitación
  const obtenerReservaContexto = (habitacionId, esUltima = false) => {
    const filtradas = allReservations.filter(res => res.habitacionId === habitacionId);
    if (filtradas.length === 0) return null;

    if (esUltima) {
      // Retorna la última reserva histórica que no esté anulada
      return filtradas.find(res => res.estado !== 'ANULADA') || null;
    }
    // Retorna la reserva actualmente activa en el sistema (PENDIENTE o CONFIRMADA/PAGADA)
    return filtradas.find(res => res.estado === 'PENDIENTE' || res.estado === 'CONFIRMADA' || res.estado === 'PAGADA') || null;
  };

  const handleOpenModal = (room = null) => {
    if (room) {
      // Al dar click cargamos el estado transaccional completo
      const reservaActiva = room.estado === 'OCUPADO' ? obtenerReservaContexto(room.id, false) : null;
      const ultimaReserva = room.estado === 'LIBRE' ? obtenerReservaContexto(room.id, true) : null;

      setEditingRoom({
        id: room.id,
        numeroHabitacion: room.numeroHabitacion,
        tipo: room.tipo,
        precioDia: room.precioDia,
        precioHora: room.precioHora,
        imagenUrl: room.imagenUrl || '',
        activo: room.activo,
        estado: room.estado,
        reservaActiva,
        ultimaReserva
      });
    } else {
      setEditingRoom({
        id: null,
        numeroHabitacion: '',
        tipo: roomTypes[0],
        precioDia: 0,
        precioHora: 0,
        imagenUrl: '',
        activo: true,
        estado: 'LIBRE',
        reservaActiva: null,
        ultimaReserva: null
      });
    }
    setShowModal(true);
  };

  const handleSaveRoom = async () => {
    if (!editingRoom.numeroHabitacion.trim()) {
      return Swal.fire({ icon: 'warning', title: 'Aviso', text: 'El número de habitación es requerido.', confirmButtonColor: '#C5A059' });
    }
    if (!editingRoom.precioDia || editingRoom.precioDia <= 0) {
      return Swal.fire({ icon: 'warning', title: 'Aviso', text: 'El precio diario debe ser mayor a 0.', confirmButtonColor: '#C5A059' });
    }
    if (!editingRoom.precioHora || editingRoom.precioHora <= 0) {
      return Swal.fire({ icon: 'warning', title: 'Aviso', text: 'El precio por hora debe ser mayor a 0.', confirmButtonColor: '#C5A059' });
    }

    try {
      if (editingRoom.id === null) {
        await habitacionService.crear(editingRoom);
        Swal.fire({ icon: 'success', title: '¡Registrada!', text: 'La habitación se incorporó al inventario.', timer: 1800, showConfirmButton: false });
      } else {
        await habitacionService.actualizar(editingRoom.id, editingRoom);
        Swal.fire({ icon: 'success', title: '¡Actualizada!', text: 'Los cambios fueron aplicados con éxito.', timer: 1800, showConfirmButton: false });
      }
      setShowModal(false);
      cargarDatos();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error operativo', text: error.message || 'Fallo al guardar.', confirmButtonColor: '#C5A059' });
    }
  };

  const handleToggleActive = async (room) => {
    try {
      await habitacionService.cambiarEstadoActivo(room.id, !room.activo);
      cargarDatos();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo alterar la disponibilidad lógica.', confirmButtonColor: '#C5A059' });
    }
  };

  const formatFecha = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('es-PE', { hour12: false });
  };

  // Motor síncrono de filtrado de matriz de datos
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.numeroHabitacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const floorNumber = filterFloor.replace('Piso ', '');
    const matchesFloor = filterFloor === 'Todos' || room.numeroHabitacion.startsWith(floorNumber);
    
    const matchesStatus = filterStatus === 'Todos' || room.estado === filterStatus;

    return matchesSearch && matchesFloor && matchesStatus;
  });

  return (
    <div className="admin-habitaciones-container">
      <AdminSidebar />
      <AdminHeader title="Gestión de Habitaciones" />

      <main className="admin-habitaciones-workspace">
        <div className="admin-habitaciones-header">
          <div>
            <h2 className="admin-habitaciones-title">Inventario Operativo de Cuartos</h2>
            <p className="admin-habitaciones-subtitle">Monitorea en tiempo real el estado, flujos de check-in y tarifas del hostal.</p>
          </div>
          <button className="admin-habitaciones-add-btn" onClick={() => handleOpenModal()}>
            <FaPlus /> Registrar Habitación
          </button>
        </div>

        {/* Sección de Controles y Filtros Avanzados */}
        <div className="admin-habitaciones-controls">
          <div className="admin-habitaciones-search-box">
            <FaSearch className="admin-habitaciones-search-icon" />
            <input
              type="text"
              placeholder="Buscar por número o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-habitaciones-search-input"
            />
          </div>

          <div className="admin-habitaciones-filter-container">
            {/* Filtro por Pisos */}
            <div className="admin-habitaciones-filter-tabs">
              {floors.map((piso) => (
                <button
                  key={piso}
                  className={`admin-habitaciones-tab ${filterFloor === piso ? 'active' : ''}`}
                  onClick={() => setFilterFloor(piso)}
                >
                  {piso === 'Todos' ? <FaLayerGroup /> : null} {piso}
                </button>
              ))}
            </div>

            {/* Filtro Dinámico por Estados */}
            <div className="admin-habitaciones-status-filters">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`status-filter-btn filter-${status.toLowerCase()} ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  <span className="status-dot"></span> {status}
                </button>
              ))}
            </div>

            <span className="admin-habitaciones-results-count">
              {filteredRooms.length} cuartos listados
            </span>
          </div>
        </div>

        {/* Renderizado de Grid */}
        {loading ? (
          <div className="admin-habitaciones-loading">
            <div className="spinner"></div>
            <h3>Sincronizando el inventario con el servidor...</h3>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="admin-habitaciones-empty">
            <FaBed className="empty-icon" />
            <h3>Búsqueda sin coincidencia</h3>
            <p>No existen registros que coincidan con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="admin-rooms-grid">
            {filteredRooms.map((room, index) => (
              <div 
                className={`admin-room-card ${!room.activo ? 'room-inactive' : ''}`} 
                key={room.id}
                style={{ '--delay': `${index * 0.04}s` }}
              >
                <div className="room-card-header">
                  {room.imagenUrl ? (
                    <img src={room.imagenUrl} alt={`Hab. ${room.numeroHabitacion}`} className="room-image" />
                  ) : (
                    <div className="room-image-placeholder"><FaBed /></div>
                  )}
                  <div className="room-number-badge">#{room.numeroHabitacion}</div>
                  <div className={`room-status-badge status-${room.estado.toLowerCase()}`}>
                    <FaConciergeBell /> {room.estado}
                  </div>
                </div>

                <div className="room-card-body">
                  <h3 className="room-type">{room.tipo}</h3>
                  <div className="room-prices">
                    <div className="price-item">
                      <FaMoneyBillWave className="price-icon" />
                      <span>S/ {Number(room.precioDia).toFixed(2)} <em>/día</em></span>
                    </div>
                    <div className="price-item">
                      <FaRegClock className="price-icon" />
                      <span>S/ {Number(room.precioHora).toFixed(2)} <em>/hora</em></span>
                    </div>
                  </div>
                </div>

                <div className="room-card-footer">
                  <button
                    className={`room-toggle-btn ${room.activo ? 'activo' : 'inactivo'}`}
                    onClick={() => handleToggleActive(room)}
                  >
                    {room.activo ? <><FaToggleOn /> Operativa</> : <><FaToggleOff /> Inactiva</>}
                  </button>
                  <button className="room-edit-btn" onClick={() => handleOpenModal(room)}>
                    <FaEdit /> Administrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Multifuncional Rediseñado */}
        {showModal && editingRoom && (
          <div className="admin-habitaciones-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-habitaciones-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-habitaciones-modal-header">
                <h2>{editingRoom.id ? `Administración Integral - Habitación #${editingRoom.numeroHabitacion}` : 'Registrar Nueva Habitación'}</h2>
                <button className="admin-habitaciones-modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
              </div>

              <div className="admin-habitaciones-modal-content">
                {/* Columna Izquierda: Imagen y Datos Técnicos */}
                <div className="admin-habitaciones-modal-left">
                  <div className="admin-habitaciones-image-upload">
                    <div className="admin-habitaciones-large-placeholder">
                      {editingRoom.imagenUrl ? (
                        <img src={editingRoom.imagenUrl} alt="Vista previa" />
                      ) : (
                        <FaImage className="placeholder-icon" />
                      )}
                    </div>
                    <div className="admin-habitaciones-form-group input-full">
                      <label>URL de la Imagen</label>
                      <input
                        type="text"
                        value={editingRoom.imagenUrl}
                        onChange={(e) => setEditingRoom({ ...editingRoom, imagenUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Parámetros y Contexto Transaccional */}
                <div className="admin-habitaciones-modal-right">
                  <div className="admin-habitaciones-row-group">
                    <div className="admin-habitaciones-form-group">
                      <label>Número de Habitación *</label>
                      <input
                        type="text"
                        value={editingRoom.numeroHabitacion}
                        onChange={(e) => setEditingRoom({ ...editingRoom, numeroHabitacion: e.target.value })}
                        disabled={editingRoom.id !== null}
                        className={editingRoom.id ? 'input-locked' : ''}
                      />
                    </div>
                    <div className="admin-habitaciones-form-group">
                      <label>Tipo / Categoría *</label>
                      <select
                        value={editingRoom.tipo}
                        onChange={(e) => setEditingRoom({ ...editingRoom, tipo: e.target.value })}
                      >
                        {roomTypes.map((tipo) => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="admin-habitaciones-row-group">
                    <div className="admin-habitaciones-form-group">
                      <label>Tarifa Diaria (S/) *</label>
                      <div className="input-with-icon">
                        <FaMoneyBillWave className="input-icon" />
                        <input
                          type="number"
                          step="0.01"
                          value={editingRoom.precioDia || ''}
                          onChange={(e) => setEditingRoom({ ...editingRoom, precioDia: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="admin-habitaciones-form-group">
                      <label>Tarifa Horaria (S/) *</label>
                      <div className="input-with-icon">
                        <FaRegClock className="input-icon" />
                        <input
                          type="number"
                          step="0.01"
                          value={editingRoom.precioHora || ''}
                          onChange={(e) => setEditingRoom({ ...editingRoom, precioHora: parseFloat(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ==========================================================================
                      SECCIÓN DINÁMICA: CONTEXTO TRANSACCIONAL DE LAS RESERVAS
                     ========================================================================== */}
                  {editingRoom.id && (
                    <div className="room-realtime-context-panel">
                      <div className="admin-habitaciones-divider"><span>Situación de Operación</span></div>
                      
                      {/* CASO 1: LA HABITACIÓN ESTÁ OCUPADA (RESERVA ACTIVA) */}
                      {editingRoom.estado === 'OCUPADO' && editingRoom.reservaActiva && (
                        <div className="context-box state-occupied-panel">
                          <h4 className="context-box-title"><span className="pulse-dot red"></span> Ocupada por Reserva Activa</h4>
                          <div className="context-grid-details">
                            <p><FaUser /> <strong>Huésped:</strong> {editingRoom.reservaActiva.usuarioNombre}</p>
                            <p><FaInfoCircle /> <strong>Modalidad:</strong> {editingRoom.reservaActiva.modalidad}</p>
                            <p><FaCalendarAlt /> <strong>Entrada:</strong> {formatFecha(editingRoom.reservaActiva.fechaHoraEntrada)}</p>
                            <p><FaCalendarAlt /> <strong>Salida:</strong> {formatFecha(editingRoom.reservaActiva.fechaHoraSalida)}</p>
                            <p>👥 <strong>Aforo:</strong> {editingRoom.reservaActiva.cantAdultos} Ad. / {editingRoom.reservaActiva.cantNinos} Ni.</p>
                            <p className="context-total-highlight"><FaMoneyBillWave /> <strong>Total General:</strong> S/ {Number(editingRoom.reservaActiva.totalGeneral).toFixed(2)}</p>
                          </div>
                          <button 
                            className="btn-context-action view-reserva"
                            onClick={() => navigate(`/administrador/reserva/${editingRoom.reservaActiva.id}`)}
                          >
                            <FaEye /> Ver reserva completa
                          </button>
                        </div>
                      )}

                      {/* CASO 2: LA HABITACIÓN ESTÁ LIBRE */}
                      {editingRoom.estado === 'LIBRE' && (
                        <div className="context-box state-free-panel">
                          <h4 className="context-box-title"><span className="pulse-dot green"></span> Habitación Disponible</h4>
                          <p className="context-box-desc">Este cuarto no cuenta con reservas activas. Está visible en el catálogo de cara al público.</p>
                          
                          {editingRoom.ultimaReserva && (
                            <div className="last-reservation-helper">
                              <span>Última reserva procesada: <strong>#{editingRoom.ultimaReserva.id}</strong></span>
                              <button 
                                className="btn-last-res-detail"
                                onClick={() => navigate(`/administrador/reserva/${editingRoom.ultimaReserva.id}`)}
                                title="Auditar historial"
                              >
                                <FaEye /> Ver detalle
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* CASO 3: LA HABITACIÓN ESTÁ EN MANTENIMIENTO */}
                      {editingRoom.estado === 'MANTENIMIENTO' && (
                        <div className="context-box state-maintenance-panel">
                          <h4 className="context-box-title"><span className="pulse-dot orange"></span> Fuera de Servicio: Mantenimiento</h4>
                          <p className="context-box-desc">La habitación está siendo sanitizada o reparada por el personal. Están bloqueados cualquier intento de compra temporalmente.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-habitaciones-modal-footer">
                <button className="admin-habitaciones-btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="admin-habitaciones-btn-confirm" onClick={handleSaveRoom}>
                  <FaCheck /> Guardar Configuración
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}