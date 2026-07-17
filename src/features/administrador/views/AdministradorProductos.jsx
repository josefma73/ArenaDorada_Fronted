import { useState, useEffect } from 'react';
import {
  FaBox,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaImage,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { productoService } from '../services/productoService';
import { categoriaService } from '../services/categoriaService';
import '../styles/AdministradorProductos.css';

export default function AdministradorProductos() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');

  // Cargar productos y categorías dinámicamente desde el backend
  const cargarDatosIniciales = async () => {
    try {
      setLoading(true);
      const [productosData, categoriasData] = await Promise.all([
        productoService.listarTodos(),
        categoriaService.listarActivas()
      ]);
      setProducts(productosData);
      setCategories(categoriasData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo obtener la información del servidor. Vuelva a intentarlo por favor.',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      // Editar producto existente (Usando el "categoriaId" directo del JSON de la API)
      setEditingProduct({
        id: product.id,
        nombre: product.nombre,
        categoriaId: product.categoriaId || (categories[0]?.id || ''),
        precio: product.precio,
        imagenUrl: product.imagenUrl || '',
        activo: product.activo,
      });
    } else {
      // Nuevo producto (Asigna por defecto la primera categoría que encuentre en la BD)
      setEditingProduct({
        id: null,
        nombre: '',
        categoriaId: categories[0]?.id || '',
        precio: 0,
        imagenUrl: '',
        activo: true,
      });
    }
    setShowModal(true);
  };

  const handleSaveProduct = async () => {
    // Validaciones del Frontend
    if (!editingProduct.nombre.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Campo obligatorio',
        text: 'El nombre del producto es requerido.'
      });
    }

    if (!editingProduct.categoriaId) {
      return Swal.fire({
        icon: 'warning',
        title: 'Categoría requerida',
        text: 'Debes seleccionar una categoría para el producto.'
      });
    }

    if (editingProduct.precio === undefined || parseFloat(editingProduct.precio) <= 0) {
      return Swal.fire({
        icon: 'warning',
        title: 'Precio inválido',
        text: 'El precio debe ser un número mayor a 0.'
      });
    }

    try {
      if (editingProduct.id === null) {
        // Enviar creación al backend
        await productoService.crear(editingProduct);
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'El producto ha sido registrado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        // Enviar actualización al backend
        await productoService.actualizar(editingProduct.id, editingProduct);
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'Los cambios fueron guardados con éxito.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      setShowModal(false);
      cargarDatosIniciales(); // Recargar tablas de forma limpia
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar',
        text: error.message || 'Hubo un error al guardar el producto. Vuelva a intentarlo por favor.'
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "El producto será dado de baja del catálogo activo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await productoService.desactivar(id);
        Swal.fire({
          icon: 'success',
          title: 'Baja completada',
          text: 'El producto ha sido inhabilitado correctamente.',
          timer: 1800,
          showConfirmButton: false
        });
        cargarDatosIniciales();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo desactivar el producto. Vuelva a intentarlo por favor.'
        });
      }
    }
  };

  const handleToggleActive = async (product) => {
    try {
      const updatedProduct = {
        nombre: product.nombre,
        categoriaId: product.categoriaId,
        precio: product.precio,
        imagenUrl: product.imagenUrl,
        activo: !product.activo
      };
      
      await productoService.actualizar(product.id, updatedProduct);
      cargarDatosIniciales();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cambiar el estado del producto. Vuelva a intentarlo por favor.'
      });
    }
  };

  // Filtrado de productos utilizando la respuesta exacta del backend (categoriaNombre)
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoriaNombre?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      filterCategory === 'Todos' || product.categoriaNombre === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-productos-container">
      <AdminSidebar />
      <AdminHeader title="Gestión de Productos" />

      <main className="admin-productos-workspace">
        {/* Header */}
        <div className="admin-productos-header">
          <h2 className="admin-productos-title">Inventario de Productos</h2>
          <button
            className="admin-productos-add-btn"
            onClick={() => handleOpenModal()}
            disabled={categories.length === 0}
          >
            <FaPlus /> Nuevo Producto
          </button>
        </div>

        {/* Search and Filter */}
        <div className="admin-productos-controls">
          <div className="admin-search-box">
            <FaSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Buscar producto o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div className="admin-filter-buttons">
            <button
              className={`admin-filter-btn ${filterCategory === 'Todos' ? 'active' : ''}`}
              onClick={() => setFilterCategory('Todos')}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`admin-filter-btn ${
                  filterCategory === cat.nombre ? 'active' : ''
                }`}
                onClick={() => setFilterCategory(cat.nombre)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          <span className="admin-results-count">
            {filteredProducts.length} producto(s)
          </span>
        </div>

        {/* Products Table */}
        <div className="admin-productos-table-wrapper">
          {loading ? (
            <div className="admin-loading-spinner" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3 style={{ color: '#666' }}>Cargando catálogo e inventario...</h3>
            </div>
          ) : (
            <table className="admin-productos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio (S/.)</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                      No se encontraron productos en el inventario.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className={`estado-${product.activo ? 'activo' : 'inactivo'}`}
                    >
                      <td className="admin-table-id">#{product.id}</td>
                      <td className="admin-table-imagen">
                        <div className="admin-product-thumbnail">
                          {product.imagenUrl ? (
                            <img 
                              src={product.imagenUrl} 
                              alt={product.nombre} 
                              style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
                            />
                          ) : (
                            <FaImage />
                          )}
                        </div>
                      </td>
                      <td className="admin-table-nombre">
                        <strong>{product.nombre}</strong>
                      </td>
                      <td className="admin-table-categoria">
                        <span className="admin-category-badge">
                          {product.categoriaNombre || 'Sin Categoría'}
                        </span>
                      </td>
                      <td className="admin-table-precio">
                        S/. {Number(product.precio).toFixed(2)}
                      </td>
                      <td className="admin-table-estado">
                        <button
                          className={`admin-toggle-btn ${
                            product.activo ? 'activo' : 'inactivo'
                          }`}
                          onClick={() => handleToggleActive(product)}
                          title={product.activo ? 'Activo' : 'Inactivo'}
                        >
                          {product.activo ? (
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
                      <td className="admin-table-acciones">
                        <button
                          className="admin-action-edit"
                          onClick={() => handleOpenModal(product)}
                        >
                          <FaEdit /> Editar
                        </button>
                        {product.activo && (
                          <button
                            className="admin-action-delete"
                            onClick={() => handleDeleteProduct(product.id)}
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

        {/* Modal */}
        {showModal && editingProduct && (
          <div
            className="admin-productos-modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div
              className="admin-productos-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header-productos">
                <h2>
                  {editingProduct.id ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button
                  className="admin-modal-close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="admin-modal-content-productos">
                <div className="admin-modal-left">
                  <div className="admin-image-upload">
                    <div className="admin-image-placeholder">
                      {editingProduct.imagenUrl ? (
                        <img 
                          src={editingProduct.imagenUrl} 
                          alt="Previsualización" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      ) : (
                        <FaImage />
                      )}
                    </div>
                    <div className="admin-form-group" style={{ marginTop: '1rem', width: '100%' }}>
                      <label>URL de la Imagen</label>
                      <input
                        type="text"
                        value={editingProduct.imagenUrl}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            imagenUrl: e.target.value,
                          })
                        }
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-modal-right">
                  <div className="admin-form-group">
                    <label>Nombre del Producto *</label>
                    <input
                      type="text"
                      value={editingProduct.nombre}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          nombre: e.target.value,
                        })
                      }
                      placeholder="Ej: Cerveza Cristal 355ml"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Categoría *</label>
                    <select
                      value={editingProduct.categoriaId}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          categoriaId: parseInt(e.target.value),
                        })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Precio (S/.) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.precio || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          precio: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Disponibilidad</label>
                    <div className="admin-toggle-switch">
                      <input
                        type="checkbox"
                        checked={editingProduct.activo}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            activo: e.target.checked,
                          })
                        }
                        id="product-active"
                      />
                      <label htmlFor="product-active" className="switch-label">
                        {editingProduct.activo
                          ? 'Activo en catálogo'
                          : 'Desactivado'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer-productos">
                <button
                  className="admin-btn-cancel-productos"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="admin-btn-confirm-productos"
                  onClick={handleSaveProduct}
                >
                  <FaCheck /> Confirmar Cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}