const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hotelsistema-production.up.railway.app';
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
      // (ej. EmailYaRegistradoException o RolInvalidoException)
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar la cuenta de staff.');
    }
    
    return await response.json();
  }
};