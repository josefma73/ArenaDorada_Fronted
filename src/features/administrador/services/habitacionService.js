const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${API_BASE_URL}/api/habitaciones`;

// Función auxiliar para obtener las cabeceras con el Token de autenticación
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

export const habitacionService = {
  // 1. Obtener todas las habitaciones activas (Público / Cliente / Recepcionista)
  listarActivas: async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) { 
      throw new Error('Error al obtener la lista de habitaciones activas.');
    }
    return await response.json();
  },

  // 2. Obtener una habitación en específico por su ID
  obtenerPorId: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener la información de la habitación.');
    }
    return await response.json();
  },

  // 3. Obtener todas las habitaciones (incluidas inactivas, solo ADMINISTRADOR)
  listarTodas: async () => {
    const response = await fetch(`${API_URL}/admin/todas`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener el inventario completo de habitaciones.');
    }
    return await response.json();
  },

  // 4. Crear una nueva habitación (solo ADMINISTRADOR)
  crear: async (habitacionData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        numeroHabitacion: habitacionData.numeroHabitacion,
        tipo: habitacionData.tipo, // Ej: "SIMPLE", "DOBLE", etc. (TipoHabitacion Enum)
        precioDia: parseFloat(habitacionData.precioDia),
        precioHora: parseFloat(habitacionData.precioHora),
        imagenUrl: habitacionData.imagenUrl || null
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar la habitación.');
    }
    return await response.json();
  },

  // 5. Actualizar tipo, precios e imagen de la habitación (solo ADMINISTRADOR)
  // El número de habitación no se envía conforme a ActualizarHabitacionRequest.java
  actualizar: async (id, habitacionData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        tipo: habitacionData.tipo,
        precioDia: parseFloat(habitacionData.precioDia),
        precioHora: parseFloat(habitacionData.precioHora),
        imagenUrl: habitacionData.imagenUrl || null
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar los datos de la habitación.');
    }
    return await response.json();
  },

  // 6. Cambiar estado de activación (Activo / Inactivo - Soft Delete)
  // Consume el @PatchMapping("/{id}/estado") que espera un EstadoDTO
  cambiarEstadoActivo: async (id, activo) => {
    const response = await fetch(`${API_URL}/${id}/estado`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({
        activo: Boolean(activo) // Envía el JSON con el campo activo según EstadoDTO
      }),
    });
    if (!response.ok) {
      throw new Error('No se pudo cambiar el estado de activación de la habitación.');
    }
    return true;
  }
};