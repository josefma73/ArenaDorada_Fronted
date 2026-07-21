import emailjs from '@emailjs/browser';

// REEMPLAZA ESTAS CONSTANTES CON TUS CLAVES REALES DE EMAILJS
const SERVICE_ID = 'service_19ctlx4'; // Lo sacas de "Email Services"
const TEMPLATE_ID = 'template_ef1ohsn'; // Lo sacas de "Email Templates"
const PUBLIC_KEY = 'R2oSjcWzvoZ9KDI3d'; // Lo sacas de "Account" -> "API Keys"

export const emailService = {
  enviarCorreoBienvenida: async (emailDestino, nombreUsuario, passwordTemporal) => {
    try {
      // ATENCIÓN: Las claves de este objeto deben ser IDÉNTICAS 
      // a las que pusiste entre {{{ }}} en EmailJS
      const templateParams = {
        email: emailDestino,
        nombre: nombreUsuario,
        password: passwordTemporal
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      
      console.log('Correo enviado exitosamente!', response.status, response.text);
      return response;
    } catch (error) {
      console.error('Fallo al enviar el correo:', error);
      throw error;
    }
  }
};