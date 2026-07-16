import { useState } from 'react';
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
import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import '../styles/AdministradorProductos.css';

export default function AdministradorProductos() {
  const [products, setProducts] = useState([
    {
      id: 1,
      nombre: 'Cerveza Cristal 355ml',
      categoria: 'Licores',
      precio: 8.50,
      imagen_url: '/api/placeholder/100/100',
      activo: true,
    },
    {
      id: 2,
      nombre: 'Pan Integral',
      categoria: 'Panadería',
      precio: 3.50,
      imagen_url: '/api/placeholder/100/100',
      activo: true,
    },
    {
      id: 3,
      nombre: 'Jugo Natural Naranja',
      categoria: 'Bebidas',
      precio: 5.00,
      imagen_url: '/api/placeholder/100/100',
      activo: true,
    },
    {
      id: 4,
      nombre: 'Café Espresso',
      categoria: 'Bebidas',
      precio: 2.50,
      imagen_url: '/api/placeholder/100/100',
      activo: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Licores',
    'Panadería',
    'Bebidas',
    'Snacks',
    'Postres',
  ];

  const handleOpenModal = (product = null) => {
    setEditingProduct(
      product || {
        id: null,
        nombre: '',
        categoria: 'Bebidas',
        precio: 0,
        imagen_url: '',
        activo: true,
      }
    );
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct.id === null) {
      // Nuevo producto
      const newProduct = {
        ...editingProduct,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
      };
      setProducts([...products, newProduct]);
    } else {
      // Editar producto
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? editingProduct : p
        )
      );
    }
    setShowModal(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, activo: false } : p
      )
    );
  };

  const handleToggleActive = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, activo: !p.activo } : p
      )
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.categoria
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'Todos' || product.categoria === filterCategory;
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
            {categories.map((cat) => (
              <button
                key={cat}
                className={`admin-filter-btn ${
                  filterCategory === cat ? 'active' : ''
                }`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="admin-results-count">
            {filteredProducts.length} producto(s)
          </span>
        </div>

        {/* Products Table */}
        <div className="admin-productos-table-wrapper">
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
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`estado-${product.activo ? 'activo' : 'inactivo'}`}
                >
                  <td className="admin-table-id">#{product.id}</td>
                  <td className="admin-table-imagen">
                    <div className="admin-product-thumbnail">
                      <FaImage />
                    </div>
                  </td>
                  <td className="admin-table-nombre">
                    <strong>{product.nombre}</strong>
                  </td>
                  <td className="admin-table-categoria">
                    <span className="admin-category-badge">
                      {product.categoria}
                    </span>
                  </td>
                  <td className="admin-table-precio">
                    S/. {product.precio.toFixed(2)}
                  </td>
                  <td className="admin-table-estado">
                    <button
                      className={`admin-toggle-btn ${
                        product.activo ? 'activo' : 'inactivo'
                      }`}
                      onClick={() => handleToggleActive(product.id)}
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
              ))}
            </tbody>
          </table>
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
                      <FaImage />
                    </div>
                    <button className="admin-upload-btn">
                      Cargar Imagen
                    </button>
                    <p className="admin-upload-hint">
                      O arrastra una imagen aquí
                    </p>
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
                      value={editingProduct.categoria}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          categoria: e.target.value,
                        })
                      }
                    >
                      <option value="Licores">Licores</option>
                      <option value="Panadería">Panadería</option>
                      <option value="Bebidas">Bebidas</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Postres">Postres</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Precio (S/.) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.precio}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          precio: parseFloat(e.target.value),
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
