const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${API_BASE_URL}/api/reservas`;

// Función auxiliar para obtener los headers con el Token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const reservaProductoService = {
  // 1. Obtener todos los productos cargados a una reserva
  listar: async (reservaId) => {
    const response = await fetch(`${API_URL}/${reservaId}/productos`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener los consumos de la reserva.');
    }
    return await response.json();
  },

  // 2. Agregar múltiples productos a la reserva (BATCH)
  agregarMultiples: async (reservaId, productosArray) => {
    const response = await fetch(`${API_URL}/${reservaId}/productos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productosArray), // Se envía el JSON completo como arreglo
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al cargar los productos a la cuenta.');
    }
    
    return await response.json();
  },

  // 3. Eliminar un producto de la cuenta
  eliminar: async (reservaId, reservaProductoId) => {
    const response = await fetch(`${API_URL}/${reservaId}/productos/${reservaProductoId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al remover el producto de la cuenta.');
    }
    return true; 
  }
};