export const getSession = () => {

    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("usuarioRol");

    if (!token) {
        return null;
    }


    return {
        token,
        id: localStorage.getItem("usuarioId"),
        nombre: localStorage.getItem("usuarioNombre"),
        apellidos: localStorage.getItem("usuarioApellidos"),
        email: localStorage.getItem("usuarioEmail"),
        rol
    };
};



/**
 * Verifica si existe una sesión activa
 */
export const isAuthenticated = () => {

    const session = getSession();

    return session !== null;
};



/**
 * Devuelve el rol actual del usuario
 */
export const getUserRole = () => {

    return localStorage.getItem("usuarioRol");
};



/**
 * Cerrar sesión
 */
export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("usuarioApellidos");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioRol");

};