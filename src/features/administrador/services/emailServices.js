import emailjs from '@emailjs/browser';

// CREDENCIALES GLOBALES DE EMAILJS
const SERVICE_ID = 'service_19ctlx4'; 
const PUBLIC_KEY = 'R2oSjcWzvoZ9KDI3d'; 

export const emailService = {
  
  // 1. CORREO DE BIENVENIDA (Para nuevos usuarios/staff)
  enviarCorreoBienvenida: async (emailDestino, nombreUsuario, passwordTemporal) => {
    const TEMPLATE_WELCOME_ID = 'template_ef1ohsn'; 
    
    try {
      // Las claves deben coincidir con las variables {{{ }}} de tu plantilla de EmailJS
      const templateParams = {
        email: emailDestino,
        nombre: nombreUsuario,
        password: passwordTemporal
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_WELCOME_ID,
        templateParams,
        PUBLIC_KEY
      );
      
      console.log('Correo de bienvenida enviado exitosamente!', response.status, response.text);
      return response;
    } catch (error) {
      console.error('Fallo al enviar el correo de bienvenida:', error);
      throw error;
    }
  },

  // 2. CORREO DE RECUPERACIÓN DE CONTRASEÑA
  enviarCorreoRecuperacion: async (emailDestino, resetLink) => {
    const TEMPLATE_RECOVERY_ID = 'template_xzjeaqf'; 
    
    try {
      const templateParams = {
        email: emailDestino,
        reset_link: resetLink 
      };

      const response = await emailjs.send(
        SERVICE_ID, 
        TEMPLATE_RECOVERY_ID, 
        templateParams, 
        PUBLIC_KEY
      );
      
      console.log('Correo de recuperación enviado exitosamente!', response.status, response.text);
      return response;
    } catch (error) {
      console.error('Fallo al enviar el correo de recuperación:', error);
      throw error;
    }
  }
};