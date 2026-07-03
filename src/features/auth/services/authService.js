// src/features/auth/services/authService.js

// Capturamos la URL raíz del backend desde las variables de entorno de Vite
const ROOT_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${ROOT_URL}/api/auth`;

export const authService = {
  /**
   * Autentica con email y contraseña. Devuelve access + refresh token
   */
  login: async (data) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  registerUser: async (data) => {
    // Hacemos el fetch directo tal cual lo tenía el backend que sí funcionaba
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Ya recibe el objeto limpio { nombre, apellido, email, password, rol }
    });

    // Si no es un estado 200 OK, lanzamos la excepción para el SweetAlert
    if (!response.ok) {
      throw new Error("Error register");
    }

    return await response.json();
  },

  /**
   * Solicita el token de recuperación de contraseña enviado por correo
   */
  recoverPassword: async (email) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 30000);

    try {
      const response = await fetch(`${API_URL}/password/recuperar?email=${email}`, {
        method: "POST",
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error recover password");
      }

      return data;
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
          body: JSON.stringify({
            token,          // String
            nuevaPassword,  // String
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Error: ${response.status}`);
        }

        // Si el JSON de respuesta es vacío {}, manejamos el éxito de forma segura
        const data = await response.text();
        return data ? JSON.parse(data) : {};
      } catch (error) {
        console.error("Error en resetPassword:", error);
        throw error;
      }
    },
    
  /**
   * Cambia la contraseña desde dentro del panel usando el token Bearer JWT activo
   */
  changePassword: async (data, token) => {
    const response = await fetch(`${API_URL}/cambiar-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error change password");
    return response.json();
  }
};