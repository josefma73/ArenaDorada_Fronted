const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${API_BASE_URL}/api/productos`;

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

export const productoService = {
  // Obtener todos los productos (incluyendo inactivos, solo para ADMIN)
  listarTodos: async () => {
    const response = await fetch(`${API_URL}/admin/todos`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener todos los productos del servidor.');
    }
    return await response.json();
  },

  // Crear un nuevo producto
  crear: async (productoData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        categoriaId: parseInt(productoData.categoriaId),
        nombre: productoData.nombre,
        precio: parseFloat(productoData.precio),
        imagenUrl: productoData.imagenUrl || null
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar el producto.');
    }
    return await response.json();
  },

  // Actualizar un producto existente
  actualizar: async (id, productoData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        categoriaId: parseInt(productoData.categoriaId),
        nombre: productoData.nombre,
        precio: parseFloat(productoData.precio),
        imagenUrl: productoData.imagenUrl || null
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar el producto.');
    }
    return await response.json();
  },

  // Desactivar / Dar de baja un producto (Soft Delete)
  desactivar: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al dar de baja el producto.');
    }
    return true;
  }
};