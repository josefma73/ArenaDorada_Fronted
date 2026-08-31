const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${API_BASE_URL}/api/pagos`;

// Función auxiliar para obtener los headers con el Token de autenticación
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

export const pagoService = {
  /**
   * 1. POST /api/pagos
   * Registra un nuevo pago para una reserva específica.
   * @param {Object} pagoData - { reservaId, monto, metodoPago }
   */
  crear: async (pagoData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        reservaId: parseInt(pagoData.reservaId),
        monto: parseFloat(pagoData.monto),
        metodoPago: pagoData.metodoPago
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar el pago en el sistema.');
    }
    
    return await response.json();
  },

  /**
   * 2. GET /api/pagos/reserva/{reservaId}
   * Obtiene el historial completo de pagos asociados a una reserva.
   * @param {number} reservaId - ID de la reserva a consultar
   */
  obtenerPorReserva: async (reservaId) => {
    const response = await fetch(`${API_URL}/reserva/${reservaId}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener los pagos de la reserva: ${response.status}`);
    }
    
    return await response.json();
  }
};