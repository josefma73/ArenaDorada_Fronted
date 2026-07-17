import { useState, useEffect } from 'react';
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
  FaConciergeBell
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { habitacionService } from '../services/habitacionService';
import '../styles/AdministradorHabitaciones.css';

export default function AdministradorHabitaciones() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFloor, setFilterFloor] = useState('Todos');

  const roomTypes = ['SIMPLE', 'DOBLE', 'MATRIMONIAL', 'FAMILIAR'];
  const floors = ['Todos', 'Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];

  const cargarHabitaciones = async () => {
    try {
      setLoading(true);
      const data = await habitacionService.listarTodas();
      const sortedData = data.sort((a, b) => 
        a.numeroHabitacion.localeCompare(b.numeroHabitacion, undefined, {numeric: true})
      );
      setRooms(sortedData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo obtener el inventario de habitaciones. Vuelva a intentarlo.',
        confirmButtonColor: '#C5A059'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom({
        id: room.id,
        numeroHabitacion: room.numeroHabitacion,
        tipo: room.tipo,
        precioDia: room.precioDia,
        precioHora: room.precioHora,
        imagenUrl: room.imagenUrl || '',
        activo: room.activo
      });
    } else {
      setEditingRoom({
        id: null,
        numeroHabitacion: '',
        tipo: roomTypes[0],
        precioDia: 0,
        precioHora: 0,
        imagenUrl: '',
        activo: true
      });
    }
    setShowModal(true);
  };

  const handleSaveRoom = async () => {
    if (!editingRoom.numeroHabitacion.trim()) {
      return Swal.fire({ icon: 'warning', title: 'Aviso', text: 'El número de habitación es obligatorio.', confirmButtonColor: '#C5A059' });
    }
    if (!editingRoom.precioDia || editingRoom.precioDia <= 0) {
      return Swal.fire({ icon: 'warning', title: 'Aviso', text: 'El precio por día debe ser mayor a 0.', confirmButtonColor: '#C5A059' });
    }
    if (!editingRoom.precioHora || editingRoom.precioHora <= 0) {
      return Swal.fire({ icon: 'warning', title: 'Aviso', text: 'El precio por hora debe ser mayor a 0.', confirmButtonColor: '#C5A059' });
    }

    try {
      if (editingRoom.id === null) {
        await habitacionService.crear(editingRoom);
        Swal.fire({ icon: 'success', title: '¡Registrada!', text: 'La habitación se agregó al inventario.', timer: 2000, showConfirmButton: false });
      } else {
        await habitacionService.actualizar(editingRoom.id, editingRoom);
        Swal.fire({ icon: 'success', title: '¡Actualizada!', text: 'Los datos fueron guardados con éxito.', timer: 2000, showConfirmButton: false });
      }
      setShowModal(false);
      cargarHabitaciones();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Error al procesar', text: error.message || 'Error al guardar la habitación.', confirmButtonColor: '#C5A059' });
    }
  };

  const handleToggleActive = async (room) => {
    try {
      await habitacionService.cambiarEstadoActivo(room.id, !room.activo);
      cargarHabitaciones();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cambiar la disponibilidad.', confirmButtonColor: '#C5A059' });
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.numeroHabitacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    const floorNumber = filterFloor.replace('Piso ', '');
    const matchesFloor = filterFloor === 'Todos' || room.numeroHabitacion.startsWith(floorNumber);
    return matchesSearch && matchesFloor;
  });

  return (
    <div className="admin-habitaciones-container">
      <AdminSidebar />
      <AdminHeader title="Gestión de Habitaciones" />

      <main className="admin-habitaciones-workspace">
        {/* Encabezado */}
        <div className="admin-habitaciones-header">
          <div>
            <h2 className="admin-habitaciones-title">Inventario de Cuartos</h2>
            <p className="admin-habitaciones-subtitle">Administra la disponibilidad, precios y detalles de cada habitación.</p>
          </div>
          <button className="admin-habitaciones-add-btn" onClick={() => handleOpenModal()}>
            <FaPlus /> Añadir Habitación
          </button>
        </div>

        {/* Controles y Filtros */}
        <div className="admin-habitaciones-controls">
          <div className="admin-habitaciones-search-box">
            <FaSearch className="admin-habitaciones-search-icon" />
            <input
              type="text"
              placeholder="Buscar por N° o tipo (ej. Doble)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-habitaciones-search-input"
            />
          </div>

          <div className="admin-habitaciones-filter-container">
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
            <span className="admin-habitaciones-results-count">
              {filteredRooms.length} resultados
            </span>
          </div>
        </div>

        {/* Grid de Habitaciones */}
        {loading ? (
          <div className="admin-habitaciones-loading">
            <div className="spinner"></div>
            <h3>Cargando inventario del edificio...</h3>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="admin-habitaciones-empty">
            <FaBed className="empty-icon" />
            <h3>Sin resultados</h3>
            <p>No se encontraron habitaciones para los filtros aplicados.</p>
          </div>
        ) : (
          <div className="admin-rooms-grid" key={filterFloor}>
            {filteredRooms.map((room, index) => (
              <div 
                className={`admin-room-card ${!room.activo ? 'room-inactive' : ''}`} 
                key={room.id}
                style={{ '--delay': `${index * 0.05}s` }}
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
                    title={room.activo ? 'Deshabilitar habitación' : 'Habilitar habitación'}
                  >
                    {room.activo ? <><FaToggleOn /> Habilitada</> : <><FaToggleOff /> Clausurada</>}
                  </button>
                  <button className="room-edit-btn" onClick={() => handleOpenModal(room)}>
                    <FaEdit /> Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Creación/Edición */}
        {showModal && editingRoom && (
          <div className="admin-habitaciones-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-habitaciones-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-habitaciones-modal-header">
                <h2>{editingRoom.id ? `Editar Habitación #${editingRoom.numeroHabitacion}` : 'Registrar Nueva Habitación'}</h2>
                <button className="admin-habitaciones-modal-close" onClick={() => setShowModal(false)}><FaTimes /></button>
              </div>

              <div className="admin-habitaciones-modal-content">
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
                      <label>URL de la Fotografía</label>
                      <input
                        type="text"
                        value={editingRoom.imagenUrl}
                        onChange={(e) => setEditingRoom({ ...editingRoom, imagenUrl: e.target.value })}
                        placeholder="https://ejemplo.com/foto.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-habitaciones-modal-right">
                  <div className="admin-habitaciones-row-group">
                    <div className="admin-habitaciones-form-group">
                      <label>Número de Habitación *</label>
                      <input
                        type="text"
                        value={editingRoom.numeroHabitacion}
                        onChange={(e) => setEditingRoom({ ...editingRoom, numeroHabitacion: e.target.value })}
                        placeholder="Ej: 304"
                        disabled={editingRoom.id !== null}
                        title={editingRoom.id ? "El número físico no se puede modificar" : ""}
                        className={editingRoom.id ? 'input-locked' : ''}
                      />
                    </div>
                    <div className="admin-habitaciones-form-group">
                      <label>Tipo de Habitación *</label>
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

                  <div className="admin-habitaciones-divider"><span>Tarifas</span></div>

                  <div className="admin-habitaciones-row-group">
                    <div className="admin-habitaciones-form-group">
                      <label>Precio / Día (S/) *</label>
                      <div className="input-with-icon">
                        <FaMoneyBillWave className="input-icon" />
                        <input
                          type="number"
                          step="0.01"
                          value={editingRoom.precioDia || ''}
                          onChange={(e) => setEditingRoom({ ...editingRoom, precioDia: parseFloat(e.target.value) || 0 })}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="admin-habitaciones-form-group">
                      <label>Precio / Hora (S/) *</label>
                      <div className="input-with-icon">
                        <FaRegClock className="input-icon" />
                        <input
                          type="number"
                          step="0.01"
                          value={editingRoom.precioHora || ''}
                          onChange={(e) => setEditingRoom({ ...editingRoom, precioHora: parseFloat(e.target.value) || 0 })}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-habitaciones-modal-footer">
                <button className="admin-habitaciones-btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="admin-habitaciones-btn-confirm" onClick={handleSaveRoom}>
                  <FaCheck /> Guardar Datos
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}