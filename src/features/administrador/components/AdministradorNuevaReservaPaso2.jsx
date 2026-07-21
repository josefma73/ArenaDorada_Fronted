import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  FaSearch, FaArrowRight, FaArrowLeft, FaShoppingCart, 
  FaTrash, FaPlus, FaMinus, FaBoxOpen 
} from 'react-icons/fa';

import AdminSidebar from '../../administrador/components/AdminSidebar';
import AdminHeader from '../../administrador/components/AdminHeader';
import { categoriaService } from '../services/categoriaService';
import { productoService } from '../services/productoService';
import { reservaProductoService } from '../services/reservaProductoService';
import '../components/AdministradorNuevaReservaPaso2.css';

export default function AdministradorNuevaReservaPaso2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Contexto de la reserva (Guardado en el paso 1)
  const [reservaContext, setReservaContext] = useState(null);

  // Datos del Catálogo
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  
  // Filtros
  const [selectedCategoriaId, setSelectedCategoriaId] = useState('TODAS');
  const [searchProducto, setSearchProducto] = useState('');

  // Carrito de Consumos
  const [carrito, setCarrito] = useState([]); // [{ producto: {}, cantidad: 1 }]

  useEffect(() => {
    // 1. Recuperar contexto de reserva
    const storedReserva = localStorage.getItem('reservaEnProceso');
    if (!storedReserva) {
      Swal.fire('Error', 'No hay una reserva en proceso. Volviendo al inicio.', 'error');
      navigate('/administrador/reservas/nueva');
      return;
    }
    setReservaContext(JSON.parse(storedReserva));

    // 2. Cargar Categorías Activas
    const fetchCategorias = async () => {
      try {
        const catData = await categoriaService.listarActivas();
        setCategorias(catData);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategorias();
  }, [navigate]);

  // Cargar Productos cuando cambia la categoría
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const catId = selectedCategoriaId === 'TODAS' ? null : selectedCategoriaId;
        const prodData = await productoService.listarActivos(catId);
        setProductos(prodData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [selectedCategoriaId]);

  // Filtrar productos por búsqueda de texto
  const filteredProductos = useMemo(() => {
    if (!searchProducto) return productos;
    return productos.filter(p => p.nombre.toLowerCase().includes(searchProducto.toLowerCase()));
  }, [productos, searchProducto]);

  // Funciones del Carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.producto.id === producto.id);
      if (existe) {
        return prev.map(item => 
          item.producto.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  };

  const modificarCantidad = (productoId, delta) => {
    setCarrito(prev => {
      return prev.map(item => {
        if (item.producto.id === productoId) {
          const nuevaCant = item.cantidad + delta;
          return { ...item, cantidad: Math.max(1, nuevaCant) }; // Mínimo 1
        }
        return item;
      });
    });
  };

  const removerDelCarrito = (productoId) => {
    setCarrito(prev => prev.filter(item => item.producto.id !== productoId));
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);

  // Enviar Consumos al Backend
const handleSiguiente = async () => {
    if (!reservaContext || !reservaContext.id) return;
    try {
      setLoading(true);
      if (carrito.length > 0) {
        const promesas = carrito.map(item => 
          reservaProductoService.agregar(reservaContext.id, {
            productoId: item.producto.id,
            cantidad: item.cantidad
          })
        );
        await Promise.all(promesas);
      }
      Swal.fire({
        icon: 'success',
        title: 'Consumos Registrados',
        text: 'Redirigiendo a la pasarela de pagos...',
        timer: 1500,
        showConfirmButton: false
      });
      setTimeout(() => {
        // AQUÍ ESTÁ LA REDIRECCIÓN AL PASO 3
        navigate('/administrador/reservas/nueva/paso3'); 
      }, 1500);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron registrar algunos productos.', 'error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="crear-reserva-container">
      <AdminSidebar />
      <AdminHeader title="Consumos Adicionales" />

      <main className="crear-reserva-workspace">
        
        {/* WIZARD HEADER */}
        <div className="wizard-header">
          <div>
            <h2 className="wizard-title">Registro de Reserva Presencial</h2>
            <p className="wizard-subtitle">Paso 2: Cargar consumos iniciales de Room Service o Kiosko (Opcional)</p>
          </div>
          <div className="wizard-steps">
            <span className="step completed">1. Detalles Base</span>
            <span className="step-divider"></span>
            <span className="step active">2. Consumos</span>
            <span className="step-divider"></span>
            <span className="step pending">3. Pagos</span>
          </div>
        </div>

        {/* INFO CONTEXTUAL DE LA RESERVA */}
        {reservaContext && (
          <div className="context-banner">
            <div><strong>Huésped:</strong> {reservaContext.clienteNombre}</div>
            <div><strong>Habitación:</strong> #{reservaContext.habitacionNumero} ({reservaContext.habitacionTipo})</div>
            <div><strong>Reserva ID:</strong> #{reservaContext.id}</div>
          </div>
        )}

        <div className="wizard-grid-layout-paso2">
          
          {/* COLUMNA IZQUIERDA: CATÁLOGO DE PRODUCTOS */}
          <div className="wizard-catalog-col">
            <div className="wizard-card fill-height">
              <div className="catalog-header">
                <h3 className="card-title"><FaBoxOpen /> Catálogo de Productos</h3>
                <div className="search-input-wrapper small-search">
                  <FaSearch className="icon" />
                  <input 
                    type="text" 
                    placeholder="Buscar producto..."
                    value={searchProducto}
                    onChange={(e) => setSearchProducto(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtro de Categorías */}
              <div className="category-filters">
                <button 
                  className={`cat-pill ${selectedCategoriaId === 'TODAS' ? 'active' : ''}`}
                  onClick={() => setSelectedCategoriaId('TODAS')}
                >
                  Todas
                </button>
                {categorias.map(cat => (
                  <button 
                    key={cat.id}
                    className={`cat-pill ${selectedCategoriaId === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategoriaId(cat.id)}
                  >
                    {cat.nombre}
                  </button>
                ))}
              </div>

              {/* Grilla de Productos */}
              <div className="products-grid">
                {loading ? (
                  <div className="loading-state">Cargando catálogo...</div>
                ) : filteredProductos.length === 0 ? (
                  <div className="empty-catalog">No hay productos disponibles en esta categoría.</div>
                ) : (
                  filteredProductos.map(prod => (
                    <div key={prod.id} className="product-card">
                      <div className="product-img-wrapper">
                        {prod.imagenUrl ? (
                          <img src={prod.imagenUrl} alt={prod.nombre} />
                        ) : (
                          <div className="no-img-placeholder"><FaBoxOpen /></div>
                        )}
                      </div>
                      <div className="product-info">
                        <span className="product-cat">{prod.categoriaNombre}</span>
                        <h4 className="product-name">{prod.nombre}</h4>
                        <div className="product-action-row">
                          <span className="product-price">S/ {Number(prod.precio).toFixed(2)}</span>
                          <button className="btn-add-product" onClick={() => agregarAlCarrito(prod)}>
                            <FaPlus /> Añadir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: CARRITO DE CONSUMOS */}
          <div className="wizard-cart-col">
            <div className="wizard-card fill-height flex-col">
              <h3 className="card-title"><FaShoppingCart /> Cuenta de la Habitación</h3>
              
              <div className="cart-items-container">
                {carrito.length === 0 ? (
                  <div className="empty-cart-msg">
                    <FaShoppingCart className="empty-icon"/>
                    <p>No se han seleccionado consumos adicionales.</p>
                  </div>
                ) : (
                  carrito.map(item => (
                    <div key={item.producto.id} className="cart-item">
                      <div className="cart-item-info">
                        <h5>{item.producto.nombre}</h5>
                        <span>S/ {Number(item.producto.precio).toFixed(2)} c/u</span>
                      </div>
                      <div className="cart-item-controls">
                        <div className="qty-control">
                          <button onClick={() => modificarCantidad(item.producto.id, -1)}><FaMinus size={10} /></button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => modificarCantidad(item.producto.id, 1)}><FaPlus size={10}/></button>
                        </div>
                        <div className="item-subtotal">
                          S/ {(item.producto.precio * item.cantidad).toFixed(2)}
                        </div>
                        <button className="btn-delete-item" onClick={() => removerDelCarrito(item.producto.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Resumen Total */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal Consumos:</span>
                  <span>S/ {totalCarrito.toFixed(2)}</span>
                </div>
                <div className="summary-total">
                  <span>Total a Cargar:</span>
                  <span>S/ {totalCarrito.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* WIZARD FOOTER */}
        <div className="wizard-footer">
          <button className="btn-secondary" onClick={() => navigate('/administrador/reservas/nueva')}>
            <FaArrowLeft /> Regresar al Paso 1
          </button>
          
          <button 
            className="btn-primary" 
            onClick={handleSiguiente}
            disabled={loading} 
          >
            {loading ? 'Procesando...' : (carrito.length > 0 ? 'Cargar a Cuenta y Continuar' : 'Omitir y Continuar')} <FaArrowRight />
          </button>
        </div>

      </main>
    </div>
  );
}