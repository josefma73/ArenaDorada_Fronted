const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${API_BASE_URL}/api/admin/usuarios`;

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

export const usuarioAdminService = {
  // 1. Listar todos los usuarios (Clientes, Recepcionistas, Administradores)
  listarTodos: async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener la lista de usuarios.');
    }
    return await response.json();
  },

  // 2. Obtener detalle de un usuario en específico por su ID
  obtenerPorId: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener la información del usuario.');
    }
    return await response.json();
  },

  // 3. Crear una nueva cuenta de Staff (Solo RECEPCIONISTA o ADMINISTRADOR)
  crearStaff: async (usuarioData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        nombre: usuarioData.nombre,
        apellidos: usuarioData.apellidos,
        email: usuarioData.email,
        telefono: usuarioData.telefono,
        password: usuarioData.password,
        rol: usuarioData.rol // Debe ser "ADMINISTRADOR" o "RECEPCIONISTA"
      }),
    });
    
    if (!response.ok) {
      // Intentamos extraer el mensaje de error personalizado que envía Spring Boot
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar la cuenta de staff.');
    }
    
    return await response.json();
  },

  // 4. Crear un cliente presencial (Walk-in)
  crearClientePresencial: async (clienteData) => {
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        nombre: clienteData.nombre,
        apellidos: clienteData.apellidos,
        email: clienteData.email,
        telefono: clienteData.telefono,
        password: clienteData.password
        // El rol no se envía porque el backend lo asigna automáticamente como CLIENTE
      }),
    });
    
    if (!response.ok) {
      // Intentamos extraer el mensaje de error personalizado que envía Spring Boot
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar el cliente presencial.');
    }
    
    return await response.json();
  }
};