const ROOT_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${ROOT_URL}/api/auth`;

export const authService = {
  /**
   * Autentica con email y contraseña. 
   * Devuelve un objeto AuthResponse: { token, usuario: { id, nombre, apellidos, email, telefono, rol, googleAuth } }
   */
  login: async (data) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
        },
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
   * Solicita el token de recuperación de contraseña enviado por correo
   */
  recoverPassword: async (email) => {
    try {
      const response = await fetch(`${API_URL}/password/recuperar?email=${email}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Error recover password");
      return await response.json();
    } catch (error) {
      console.error("Error recovery:", error);
      throw error;
    }
  },

  /**
   * Restablece la contraseña utilizando el token enviado por correo
   */
  resetPassword: async (token, nuevaPassword) => {
    try {
      const response = await fetch(`${API_URL}/password/restablecer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, nuevaPassword }),
      });
      if (!response.ok) throw new Error("Error en restablecimiento");
      const data = await response.text();
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error en resetPassword:", error);
      throw error;
    }
  }
};