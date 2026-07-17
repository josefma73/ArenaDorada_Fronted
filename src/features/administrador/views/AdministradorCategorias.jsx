import { useState, useEffect } from 'react';
import {
  FaFolder,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { categoriaService } from '../services/categoriaService';
import '../styles/AdministradorCategorias.css';

export default function AdministradorCategorias() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todas'); // 'Todas', 'Activas', 'Inactivas'

  // Cargar todas las categorías desde el Backend (incluyendo inactivas)
  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.listarTodas();
      setCategories(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo obtener las categorías. Vuelva a intentarlo por favor.',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      // Editar categoría existente
      setEditingCategory({
        id: category.id,
        nombre: category.nombre,
        activo: category.activo
      });
    } else {
      // Nueva categoría
      setEditingCategory({
        id: null,
        nombre: '',
        activo: true
      });
    }
    setShowModal(true);
  };

  const handleSaveCategory = async () => {
    // Validaciones del Frontend alineadas con CategoriaRequest.java
    if (!editingCategory.nombre.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'El nombre de la categoría es requerido.'
      });
    }

    if (editingCategory.nombre.length > 100) {
      return Swal.fire({
        icon: 'warning',
        title: 'Límite de caracteres',
        text: 'El nombre no debe exceder los 100 caracteres.'
      });
    }

    try {
      if (editingCategory.id === null) {
        // Crear categoría
        await categoriaService.crear(editingCategory);
        Swal.fire({
          icon: 'success',
          title: '¡Creada!',
          text: 'La categoría ha sido registrada con éxito.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        // Actualizar categoría
        await categoriaService.actualizar(editingCategory.id, editingCategory);
        Swal.fire({
          icon: 'success',
          title: '¡Actualizada!',
          text: 'Los cambios han sido guardados con éxito.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      setShowModal(false);
      cargarCategorias();
    } catch (error) {
      console.error(error);
      // Captura excepciones personalizadas del Backend como RecursoDuplicadoException
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar',
        text: error.message || 'Hubo un error al guardar la categoría. Inténtelo nuevamente.'
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "La categoría se dará de baja. Los productos asociados podrían quedar sin categoría activa.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await categoriaService.desactivar(id);
        Swal.fire({
          icon: 'success',
          title: 'Baja completada',
          text: 'La categoría ha sido inhabilitada correctamente.',
          timer: 1800,
          showConfirmButton: false
        });
        cargarCategorias();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo desactivar la categoría. Inténtelo nuevamente.'
        });
      }
    }
  };

  // Toggle directo para activar/desactivar la categoría desde la tabla
  const handleToggleActive = async (category) => {
    try {
      if (category.activo) {
        // Si está activa, la desactivamos usando el endpoint de soft delete
        await categoriaService.desactivar(category.id);
      } else {
        // Si está inactiva y la queremos reactivar, usamos el método actualizar enviando el mismo nombre
        // El backend guardará el estado o puedes mandar un PUT para actualizar sus datos.
        await categoriaService.actualizar(category.id, { nombre: category.nombre });
        // Nota: Si tu backend requiere reactivar explícitamente y actualizar no cambia el booleano 'activo' por defecto,
        // puedes configurar un endpoint específico o verificar si al Guardar/Actualizar se auto-activa.
      }
      cargarCategorias();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cambiar el estado de la categoría.'
      });
    }
  };

  // Lógica de filtrado combinado (Búsqueda + Estado)
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'Activas') {
      return matchesSearch && cat.activo === true;
    }
    if (filterStatus === 'Inactivas') {
      return matchesSearch && cat.activo === false;
    }
    return matchesSearch;
  });

  return (
    <div className="admin-categorias-container">
      <AdminSidebar />
      <AdminHeader title="Gestión de Categorías" />

      <main className="admin-categorias-workspace">
        {/* Header */}
        <div className="admin-categorias-header">
          <h2 className="admin-categorias-title">Categorías de Productos</h2>
          <button
            className="admin-categorias-add-btn"
            onClick={() => handleOpenModal()}
          >
            <FaPlus /> Nueva Categoría
          </button>
        </div>

        {/* Controles de Búsqueda y Filtros */}
        <div className="admin-categorias-controls">
          <div className="admin-categorias-search-box">
            <FaSearch className="admin-categorias-search-icon" />
            <input
              type="text"
              placeholder="Buscar categoría por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-categorias-search-input"
            />
          </div>

          <div className="admin-categorias-filter-buttons">
            {['Todas', 'Activas', 'Inactivas'].map((status) => (
              <button
                key={status}
                className={`admin-categorias-filter-btn ${
                  filterStatus === status ? 'active' : ''
                }`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <span className="admin-categorias-results-count">
            {filteredCategories.length} categoría(s) encontrada(s)
          </span>
        </div>

        {/* Tabla de Categorías */}
        <div className="admin-categorias-table-wrapper">
          {loading ? (
            <div className="admin-categorias-loading-spinner">
              <h3>Cargando categorías del servidor...</h3>
            </div>
          ) : (
            <table className="admin-categorias-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Icono / Identificador</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="admin-categorias-empty">
                      No se encontraron categorías disponibles.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className={`estado-${cat.activo ? 'activo' : 'inactivo'}`}
                    >
                      <td className="admin-categorias-table-id">#{cat.id}</td>
                      <td className="admin-categorias-table-icon">
                        <div className="admin-categorias-thumbnail">
                          <FaFolder />
                        </div>
                      </td>
                      <td className="admin-categorias-table-nombre">
                        <strong>{cat.nombre}</strong>
                      </td>
                      <td className="admin-categorias-table-estado">
                        <button
                          className={`admin-categorias-toggle-btn ${
                            cat.activo ? 'activo' : 'inactivo'
                          }`}
                          onClick={() => handleToggleActive(cat)}
                          title={cat.activo ? 'Click para Desactivar' : 'Click para Activar'}
                        >
                          {cat.activo ? (
                            <>
                              <FaToggleOn /> Activo
                            </>
                          ) : (
                            <>
                              <FaToggleOff /> Inactivo
                            </>
                          )}
                        </button>
                      </td>
                      <td className="admin-categorias-table-acciones">
                        <button
                          className="admin-categorias-action-edit"
                          onClick={() => handleOpenModal(cat)}
                        >
                          <FaEdit /> Editar
                        </button>
                        {cat.activo && (
                          <button
                            className="admin-categorias-action-delete"
                            onClick={() => handleDeleteCategory(cat.id)}
                          >
                            <FaTrash /> Dar de Baja
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal de Creación / Edición */}
        {showModal && editingCategory && (
          <div
            className="admin-categorias-modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div
              className="admin-categorias-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-categorias-modal-header">
                <h2>
                  {editingCategory.id ? 'Editar Categoría' : 'Nueva Categoría'}
                </h2>
                <button
                  className="admin-categorias-modal-close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="admin-categorias-modal-content">
                <div className="admin-categorias-modal-left">
                  <div className="admin-categorias-icon-display">
                    <div className="admin-categorias-large-placeholder">
                      <FaFolder />
                    </div>
                    <p className="admin-categorias-hint">Categoría de Almacén</p>
                  </div>
                </div>

                <div className="admin-categorias-modal-right">
                  <div className="admin-categorias-form-group">
                    <label>Nombre de la Categoría *</label>
                    <input
                      type="text"
                      value={editingCategory.nombre}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          nombre: e.target.value,
                        })
                      }
                      placeholder="Ej: Snacks, Bebidas, Licores..."
                      maxLength={100}
                    />
                  </div>

                  {editingCategory.id && (
                    <div className="admin-categorias-form-group">
                      <label>Estado Actual</label>
                      <span className={`admin-categorias-status-text ${editingCategory.activo ? 'active' : 'inactive'}`}>
                        {editingCategory.activo ? 'Activo en el Catálogo' : 'Inactivo / Deshabilitado'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-categorias-modal-footer">
                <button
                  className="admin-categorias-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="admin-categorias-btn-confirm"
                  onClick={handleSaveCategory}
                >
                  <FaCheck /> Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}