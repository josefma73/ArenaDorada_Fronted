const ROOT_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${ROOT_URL}/api/reservas`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};

export const reservaService = {
  /**
1. POST /api/reservas
   * Crea una nueva reserva (Huésped o Staff a nombre de un tercero)
   * @param {Object} reservaData - { usuarioId, habitacionId, modalidad, fechaHoraEntrada, fechaHoraSalida, cantAdultos, cantNinos, accesoPiscina }
   */
  crear: async (reservaData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(reservaData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error al crear reserva: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reservaService.crear:", error);
      throw error;
    }
  },

  /**
   * 2. GET /api/reservas/mias
   * Recupera el historial completo de reservas asociadas al cliente autenticado.
   */
  listarMias: async () => {
    try {
      const response = await fetch(`${API_URL}/mias`, {
        method: "GET",
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error al recuperar tus reservas: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reservaService.listarMias:", error);
      throw error;
    }
  },

  /**
   * 3. GET /api/reservas
   * Obtiene el registro global de todas las reservas del hotel (Exclusivo Staff)
   */
  listarTodas: async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error al listar todas las reservas: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reservaService.listarTodas:", error);
      throw error;
    }
  },

  /**
   * 4. GET /api/reservas/habitacion/{habitacionId}
   * Devuelve el historial cronológico de ocupación de una habitación específica (Staff)
   * @param {number} habitacionId
   */
  listarPorHabitacion: async (habitacionId) => {
    try {
      const response = await fetch(`${API_URL}/habitacion/${habitacionId}`, {
        method: "GET",
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error al consultar historial de habitación: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reservaService.listarPorHabitacion:", error);
      throw error;
    }
  },

  /**
   * 5. GET /api/reservas/{id}
   * Recupera los detalles técnicos y desgloses de costo de una reserva puntual.
   * @param {number} id - Identificador de la reserva
   */
  obtenerPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `No se pudo obtener la reserva: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reservaService.obtenerPorId:", error);
      throw error;
    }
  },

  /**
   * 6. PATCH /api/reservas/{id}/cancelar
   * Ejecuta la anulación lógica de la reserva.
   * @param {number} id - Identificador de la reserva
   */
  cancelar: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/cancelar`, {
        method: "PATCH",
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "No se pudo procesar la cancelación.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reservaService.cancelar:", error);
      throw error;
    }
  },

  /**
   * 7. PATCH /api/reservas/{id}/estado
   * Transición operativa de estados lógicos (PENDIENTE, PAGADA, FINALIZADA) efectuada por el Staff.
   * @param {number} id - Identificador de la reserva
   * @param {string} nuevoEstado - El string correspondiente al Enum ('PENDIENTE', 'PAGADA', 'FINALIZADA', 'ANULADA')
   */
  cambiarEstado: async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_URL}/${id}/estado`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          estado: nuevoEstado.toUpperCase()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Transición de estado denegada por el servidor.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en reservaService.cambiarEstado:", error);
      throw error;
    }
  }
};