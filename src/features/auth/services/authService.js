const ROOT_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${ROOT_URL}/api/auth`;

export const authService = {
  /**
   * Autentica con email y contraseña. 
   */
  login: async (data) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Credenciales incorrectas");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en servicio login:", error);
      throw error;
    }
  },

  /**
   * Registra un nuevo cliente en el sistema.
   */
  registerUser: async (data) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en servicio registro:", error);
      throw error;
    }
  },

  /**
   * Simula la solicitud de recuperación de contraseña.
   * (Al no existir en el backend, devolvemos una promesa exitosa para continuar el flujo)
   */
  recoverPassword: async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Petición procesada" });
      }, 800); // Simulamos el tiempo de carga del servidor
    });
  }
};