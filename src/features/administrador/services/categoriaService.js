const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${API_BASE_URL}/api/categorias`;

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

export const categoriaService = {
  // Obtener categorías activas (acceso público/recepcionista/cliente)
  listarActivas: async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener las categorías activas.');
    }
    return await response.json();
  },

  // Obtener una categoría por su ID
  obtenerPorId: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener la categoría.');
    }
    return await response.json();
  },

  // Obtener todas las categorías (incluyendo inactivas, solo ADMIN)
  listarTodas: async () => {
    const response = await fetch(`${API_URL}/admin/todas`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener la lista completa de categorías.');
    }
    return await response.json();
  },

  // Crear una nueva categoría
  crear: async (categoriaData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        nombre: categoriaData.nombre,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar la categoría.');
    }
    return await response.json();
  },

  // Actualizar una categoría existente
  actualizar: async (id, categoriaData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        nombre: categoriaData.nombre,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar la categoría.');
    }
    return await response.json();
  },

  // Desactivar una categoría (Soft Delete)
  desactivar: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al dar de baja la categoría.');
    }
    return true;
  }
};