import React from "react"
import { useEffect, useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from "sweetalert2"
import "../styles/metodopago.css"
import "../styles/paypalButton.css"

// Iconos
import {
  FaArrowLeft,
  FaAward,
  FaCalendarAlt,
  FaCcAmex,
  FaCcMastercard,
  FaCcVisa,
  FaCheckCircle,
  FaCreditCard,
  FaCreditCard as FaCreditCardAlt,
  FaEnvelope,
  FaKey,
  FaLock,
  FaMobile,
  FaMobileAlt,
  FaMoneyBillWave,
  FaPaypal,
  FaPercent,
  FaQrcode,
  FaRegCreditCard,
  FaShieldAlt,
  FaShieldVirus,
  FaSignInAlt,
  FaUser,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa"
import { RiYoutubeLine } from "react-icons/ri"
import { SiMercadopago } from "react-icons/si"

function MetodosPago() {
  const navigate = useNavigate()

  // Estados para el formulario de pago
  const [metodoPago, setMetodoPago] = useState("")
  const [numeroTarjeta, setNumeroTarjeta] = useState("")
  const [nombreTitular, setNombreTitular] = useState("")
  const [fechaExpiracion, setFechaExpiracion] = useState("")
  const [cvv, setCvv] = useState("")
  const [email, setEmail] = useState("")
  const [celularYape, setCelularYape] = useState("")
  const [codigoYape, setCodigoYape] = useState(["", "", "", "", "", ""])
  const [cargando, setCargando] = useState(false)
  const [datosReservaCita, setDatosReservaCita] = useState(null)

  // Recuperar datos de la cita del localStorage
  useEffect(() => {
    // const citaData = localStorage.getItem("registro_cita_data")
    // if (citaData) {
    //   try {
    //     const datos = JSON.parse(citaData)
    //     setDatosReservaCita(datos)
    //     console.log("Datos de la cita recuperados:", datos)
    //   } catch (error) {
    //     console.error("Error al recuperar datos de la cita:", error)
    //     toast.error("Error al cargar los datos de la cita")
    //     navigate("/habitaciones")
    //   }
    // } else {
    //   toast.error("No se encontraron datos de la cita")
    //   navigate("/habitaciones")
    // }
    
    // Datos de prueba para visualización
    setDatosReservaCita({
      fecha: "2026-07-25",
      hora: "10:00",
      especialidad: "Consulta General"
    })
  }, [navigate])

  // Formatear número de tarjeta mientras se escribe
  const formatearNumeroTarjeta = (value) => {
    const numeroLimpio = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const grupos = numeroLimpio.match(/.{1,4}/g)
    return grupos ? grupos.join(" ") : numeroLimpio
  }

  // Formatear fecha de expiración mientras se escribe (MM/YY)
  const formatearFechaExpiracion = (value) => {
    const numeroLimpio = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (numeroLimpio.length <= 2) {
      return numeroLimpio
    }

    return `${numeroLimpio.slice(0, 2)}/${numeroLimpio.slice(2, 4)}`
  }

  // Manejar cambio en número de tarjeta
  const handleNumeroTarjetaChange = (e) => {
    const formateado = formatearNumeroTarjeta(e.target.value)
    setNumeroTarjeta(formateado.slice(0, 19)) // Limitar a 16 dígitos (19 con espacios)
  }

  // Manejar cambio en fecha de expiración
  const handleFechaExpiracionChange = (e) => {
    const formateado = formatearFechaExpiracion(e.target.value)
    setFechaExpiracion(formateado.slice(0, 5)) // Limitar a MM/YY
  }

  // Manejar cambio en CVV
  const handleCvvChange = (e) => {
    const valor = e.target.value.replace(/[^0-9]/g, "")
    setCvv(valor.slice(0, 4)) // Limitar a 4 dígitos (para AMEX)
  }

  // Manejar cambio en código de Yape
  const handleCodigoYapeChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCodigo = [...codigoYape]
      newCodigo[index] = value
      setCodigoYape(newCodigo)

      // Mover al siguiente input si se ingresó un dígito
      if (value && index < 5) {
        const nextInput = document.getElementById(`codigo-yape-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  // Manejar tecla de retroceso en código de Yape
  const handleCodigoYapeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !codigoYape[index] && index > 0) {
      const prevInput = document.getElementById(`codigo-yape-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  // Detectar tipo de tarjeta basado en el número
  const detectarTipoTarjeta = () => {
    const numero = numeroTarjeta.replace(/\s+/g, "")

    if (/^4/.test(numero)) return "visa"
    if (/^5[1-5]/.test(numero)) return "mastercard"
    if (/^3[47]/.test(numero)) return "amex"

    return null
  }

  // Renderizar icono de tarjeta según el tipo detectado
  const renderizarIconoTarjeta = () => {
    const tipo = detectarTipoTarjeta()

    if (tipo === "visa") return <FaCcVisa className="tarjeta-icono visa" />
    if (tipo === "mastercard") return <FaCcMastercard className="tarjeta-icono mastercard" />
    if (tipo === "amex") return <FaCcAmex className="tarjeta-icono amex" />

    return <FaRegCreditCard className="tarjeta-icono" />
  }

  // Validar formulario de tarjeta
  const validarFormularioTarjeta = () => {
    if (numeroTarjeta.replace(/\s+/g, "").length < 15) {
      toast.error("Número de tarjeta inválido")
      return false
    }

    if (nombreTitular.trim().length < 5) {
      toast.error("Nombre del titular inválido")
      return false
    }

    if (!/^\d{2}\/\d{2}$/.test(fechaExpiracion)) {
      toast.error("Fecha de expiración inválida (MM/YY)")
      return false
    }

    const [mes, anio] = fechaExpiracion.split("/")
    const fechaActual = new Date()
    const anioActual = fechaActual.getFullYear() % 100
    const mesActual = fechaActual.getMonth() + 1

    if (
      Number.parseInt(anio) < anioActual ||
      (Number.parseInt(anio) === anioActual && Number.parseInt(mes) < mesActual)
    ) {
      toast.error("La tarjeta ha expirado")
      return false
    }

    if (cvv.length < 3) {
      toast.error("Código de seguridad inválido")
      return false
    }

    return true
  }

  // Validar email para PayPal
  const validarEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Email inválido")
      return false
    }
    return true
  }

  // Validar formulario de Yape
  const validarFormularioYape = () => {
    if (!/^9\d{8}$/.test(celularYape)) {
      toast.error("Número de celular inválido. Debe comenzar con 9 y tener 9 dígitos")
      return false
    }

    if (!email || !validarEmail()) {
      return false
    }

    if (codigoYape.some((digito) => digito === "")) {
      toast.error("Código de aprobación incompleto")
      return false
    }

    return true
  }

  // Función para registrar la cita en el backend
  const handleSubmit = async () => {
    if (!datosReservaCita) {
      toast.error("No hay datos de cita para registrar")
      return false
    }

    try {
      // Actualizar el método de pago según el seleccionado
      const datosActualizados = {
        ...datosReservaCita,
        metodo_pago_id: obtenerIdMetodoPago(metodoPago),
      }

      console.log("Enviando datos al backend:", datosActualizados)

      // Llamar al servicio para registrar la cita
      // const response = await CitaMedica.registrarCita(datosActualizados)
      
      // Respuesta simulada para pruebas
      const response = { success: true, message: "Cita registrada exitosamente" }

      if (response && response.success) {
        // Mostrar mensaje de éxito
        Swal.fire({
          title: "¡Éxito!",
          text: response.message || "Cita registrada exitosamente",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Limpiar datos de localStorage
          // localStorage.removeItem("registro_cita_data")
          // localStorage.removeItem("registro_cita_estado")

          // Redireccionar a la página de habitaciones
          navigate("/habitaciones")
        })
        return true
      } else {
        // Mostrar mensaje de error
        Swal.fire({
          title: "Error",
          text: response.message || "Ocurrió un error al registrar la cita. Inténtelo de nuevo.",
          icon: "error",
          confirmButtonText: "OK",
        })
        return false
      }
    } catch (error) {
      console.error("Error al registrar la cita:", error)

      // Mostrar mensaje de error
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al registrar la cita. Inténtelo de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      })
      return false
    }
  }

  // Obtener ID del método de pago
  const obtenerIdMetodoPago = (metodo) => {
    const metodosPago = {
      tarjeta: 1,
      mercadopago: 2,
      paypal: 3,
      yape: 4,
      plin: 5,
    }
    return metodosPago[metodo] || 1
  }

  // Procesar pago
  const procesarPago = async () => {
    if (!metodoPago) {
      toast.error("Seleccione un método de pago")
      return
    }

    let validacionExitosa = false

    switch (metodoPago) {
      case "tarjeta":
        validacionExitosa = validarFormularioTarjeta()
        break
      case "mercadopago":
        validacionExitosa = validarEmail()
        break
      case "yape":
        validacionExitosa = validarFormularioYape()
        break
      case "plin":
        validacionExitosa = true // No requiere validación adicional
        break
      default:
        toast.error("Método de pago no soportado")
        return
    }

    if (!validacionExitosa) return

    setCargando(true)

    try {
      // Simulación de procesamiento de pago
      setTimeout(async () => {
        toast.success("Pago procesado con éxito", { autoClose: 2000 })
        const resultado = await handleSubmit()
        setCargando(false)
      }, 2000)
    } catch (error) {
      console.error("Error en el pago:", error)
      toast.error("Error al procesar el pago. Intente nuevamente.")
      setCargando(false)
    }
  }

  // Procesar pago con Yape
  const procesarPagoYape = async () => {
    if (!validarFormularioYape()) return

    setCargando(true)

    try {
      // Simulación de procesamiento de pago con Yape
      setTimeout(async () => {
        toast.success("Pago con Yape procesado con éxito", { autoClose: 2000 })
        const resultado = await handleSubmit()
        setCargando(false)
      }, 2000)
    } catch (error) {
      console.error("Error en el pago con Yape:", error)
      toast.error("Error al procesar el pago con Yape. Intente nuevamente.")
      setCargando(false)
    }
  }

  // Volver a la página anterior
  const volverAtras = () => {
    // navigate("/rc")
    navigate("/habitaciones")
  }

  // LA ORDEN DE 100 SOLES
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "100.00", // Monto fijo de 100 soles
          },
        },
      ],
    })
  }

  return (
    <div className="metodos-pago-container">
      <div className="metodos-pago-content">
        <div className="metodos-pago-opciones">
          <div className="metodos-pago-header-section">
            <button className="boton-volver" onClick={volverAtras}>
              <FaArrowLeft /> Volver
            </button>
            <h2>Seleccione un método de pago</h2>
          </div>

          <div className="metodos-lista">
            <div
              className={`metodo-item ${metodoPago === "tarjeta" ? "selected" : ""}`}
              onClick={() => setMetodoPago("tarjeta")}
            >
              <div className="metodo-icono">
                <FaCreditCard />
              </div>
              <div className="metodo-info">
                <h3>Tarjeta de Crédito/Débito</h3>
                <div className="tarjetas-aceptadas">
                  <FaCcVisa />
                  <FaCcMastercard />
                  <FaCcAmex />
                </div>
              </div>
            </div>

            <div
              className={`metodo-item ${metodoPago === "mercadopago" ? "selected" : ""}`}
              onClick={() => setMetodoPago("mercadopago")}
            >
              <div className="metodo-icono mercadopago">
                <SiMercadopago />
              </div>
              <div className="metodo-info">
                <h3>Mercado Pago</h3>
                <p>Pague con su cuenta de Mercado Pago</p>
              </div>
            </div>

            <div
              className={`metodo-item ${metodoPago === "paypal" ? "selected" : ""}`}
              onClick={() => setMetodoPago("paypal")}
            >
              <div className="metodo-icono paypal">
                <FaPaypal />
              </div>
              <div className="metodo-info">
                <h3>PayPal</h3>
                <p>Pague de forma segura con PayPal</p>
              </div>
            </div>

            <div
              className={`metodo-item ${metodoPago === "yape" ? "selected" : ""}`}
              onClick={() => setMetodoPago("yape")}
            >
              <div className="metodo-icono yape">
                <RiYoutubeLine />
              </div>
              <div className="metodo-info">
                <h3>Yape</h3>
                <p>El pago se acreditará al instante</p>
              </div>
            </div>

            <div
              className={`metodo-item ${metodoPago === "plin" ? "selected" : ""}`}
              onClick={() => setMetodoPago("plin")}
            >
              <div className="metodo-icono plin">
                <FaMobile />
              </div>
              <div className="metodo-info">
                <h3>Plin</h3>
                <p>Escanee nuestro QR con su aplicación Plin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="metodos-pago-formulario">
          {metodoPago === "tarjeta" && (
            <div className="tarjeta-form">
              <div className="tarjeta-form-content">
                <div className="tarjeta-form-left">
                  <h3>Detalles de la Tarjeta</h3>

                  <div className="form-group">
                    <label>
                      <FaRegCreditCard /> Número de Tarjeta
                    </label>
                    <div className="input-con-icono">
                      <input
                        type="text"
                        value={numeroTarjeta}
                        onChange={handleNumeroTarjetaChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      <span className="icono-tarjeta">{renderizarIconoTarjeta()}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FaUser /> Nombre del Titular
                    </label>
                    <input
                      type="text"
                      value={nombreTitular}
                      onChange={(e) => setNombreTitular(e.target.value)}
                      placeholder="Como aparece en la tarjeta"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        <FaCalendarAlt /> Fecha de Expiración
                      </label>
                      <input
                        type="text"
                        value={fechaExpiracion}
                        onChange={handleFechaExpiracionChange}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <FaShieldAlt /> Código de Seguridad
                      </label>
                      <input type="password" value={cvv} onChange={handleCvvChange} placeholder="CVV" maxLength="4" />
                    </div>
                  </div>
                </div>

                <div className="tarjeta-form-right">
                  <div className="resumen-pago">
                    <h3>Resumen del Pago</h3>

                    <div className="resumen-item">
                      <span>Servicio:</span>
                      <span>Cita Médica</span>
                    </div>

                    <div className="resumen-item">
                      <span>Monto:</span>
                      <span className="monto">S/100.00</span>
                    </div>

                    <div className="seguridad-info">
                      <FaLock /> Pago 100% seguro y encriptado
                    </div>

                    <button
                      className={`boton-pagar ${cargando ? "cargando" : ""}`}
                      onClick={procesarPago}
                      disabled={cargando}
                    >
                      {cargando ? (
                        "Procesando..."
                      ) : (
                        <>
                          <FaMoneyBillWave /> Pagar S/100.00
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {metodoPago === "mercadopago" && (
            <div className="mercadopago-form">
              <div className="mercadopago-form-content">
                <div className="mercadopago-form-left">
                  <h3>Pago con Mercado Pago</h3>

                  <div className="mercadopago-beneficios">
                    <div className="mercadopago-beneficio">
                      <div className="mercadopago-beneficio-icon">
                        <FaSignInAlt />
                      </div>
                      <div className="mercadopago-beneficio-text">
                        <h4>Ingresa con facilidad</h4>
                        <p>Inicia sesión con tu mismo e-mail y contraseña de Mercado Libre.</p>
                      </div>
                    </div>

                    <div className="mercadopago-beneficio">
                      <div className="mercadopago-beneficio-icon">
                        <FaCreditCardAlt />
                      </div>
                      <div className="mercadopago-beneficio-text">
                        <h4>Paga rápido</h4>
                        <p>Usa tu dinero disponible o tarjetas guardadas.</p>
                      </div>
                    </div>

                    <div className="mercadopago-beneficio">
                      <div className="mercadopago-beneficio-icon">
                        <FaPercent />
                      </div>
                      <div className="mercadopago-beneficio-text">
                        <h4>Accede a cuotas</h4>
                        <p>Cuotas sin interés con bancos seleccionados.</p>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FaEnvelope /> Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                    />
                  </div>

                  <div className="mercadopago-info">
                    <p>
                      <FaLock /> Será redirigido a Mercado Pago para completar el pago de forma segura.
                    </p>
                  </div>

                  <div className="mercadopago-form-footer">
                    <button
                      className={`boton-pagar ${cargando ? "cargando" : ""}`}
                      onClick={procesarPago}
                      disabled={cargando}
                    >
                      {cargando ? (
                        "Procesando..."
                      ) : (
                        <>
                          <FaMoneyBillWave /> Pagar S/100.00
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mercadopago-form-right">
                  <div className="resumen-pago">
                    <h3>Resumen del Pago</h3>

                    <div className="resumen-item">
                      <span>Servicio:</span>
                      <span>Cita Médica</span>
                    </div>

                    <div className="resumen-item">
                      <span>Monto:</span>
                      <span className="monto">S/100.00</span>
                    </div>

                    <div className="seguridad-info">
                      <FaLock /> Pago 100% seguro y encriptado
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {metodoPago === "paypal" && (
            <div className="paypal-button-container">
              <div className="paypal-button-overlay">
                <h1>CLÍNICA SEÑOR DE LUREN</h1>
                <div className="paypal-info-items">
                  <div className="paypal-info-item">
                    <span>Servicio:</span>
                    <span>Cita Médica</span>
                  </div>
                  <div className="paypal-info-item">
                    <span>Monto:</span>
                    <span className="monto">S/100.00 soles</span>
                  </div>
                </div>
                <div className="paypal-buttons">
                    <PayPalButtons
                        style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "paypal",
                        }}
                        createOrder={createOrder}
                        onApprove={async (data, actions) => {
                        const details = await actions.order.capture();

                        console.log(details);

                        toast.success("Pago procesado con éxito", {
                            autoClose: 2000,
                        });

                        await handleSubmit();
                        }}
                        onError={(err) => {
                        console.error(err);
                        toast.error("Error al procesar el pago.");
                        }}
                    />
                    </div>

                <h2>NOTA: Al pagar, será confirmada la cita.</h2>
                <div className="volver-link" onClick={volverAtras}>
                  Volver
                </div>
              </div>
            </div>
          )}

          {metodoPago === "yape" && (
            <div className="yape-form">
              <div className="yape-form-content">
                <div className="yape-form-left">
                  <h3>Ingresa la información para pagar</h3>

                  <div className="form-group">
                    <label>
                      <FaEnvelope /> E-mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@gmail.com"
                    />
                    <p className="form-hint">Solo te enviaremos información del pago para que la tengas disponible.</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <FaMobileAlt /> Tu celular registrado en Yape
                    </label>
                    <input
                      type="text"
                      value={celularYape}
                      onChange={(e) => setCelularYape(e.target.value.replace(/\D/g, "").slice(0, 9))}
                      placeholder="Ej.: 921 213 238"
                      maxLength="9"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaKey /> Código de aprobación
                    </label>
                    <div className="codigo-yape-container">
                      {codigoYape.map((digito, index) => (
                        <input
                          key={index}
                          id={`codigo-yape-${index}`}
                          type="text"
                          value={digito}
                          onChange={(e) => handleCodigoYapeChange(index, e.target.value)}
                          onKeyDown={(e) => handleCodigoYapeKeyDown(index, e)}
                          maxLength="1"
                          className="codigo-yape-input"
                        />
                      ))}
                    </div>
                    <p className="form-hint">Encuéntralo en tu app de Yape.</p>
                  </div>

                  <div className="yape-seguridad">
                    <div className="yape-seguridad-item">
                      <FaShieldVirus className="yape-seguridad-icon" />
                      <span>Pago Seguro</span>
                    </div>
                    <div className="yape-seguridad-item">
                      <FaAward className="yape-seguridad-icon" />
                      <span>Satisfacción Garantizada</span>
                    </div>
                    <div className="yape-seguridad-item">
                      <FaUserShield className="yape-seguridad-icon" />
                      <span>Privacidad Protegida</span>
                    </div>
                  </div>
                </div>

                <div className="yape-form-right">
                  <div className="resumen-pago">
                    <h3>Resumen del Pago</h3>

                    <div className="resumen-item">
                      <span>Servicio:</span>
                      <span>Cita Médica</span>
                    </div>

                    <div className="resumen-item">
                      <span>Monto:</span>
                      <span className="monto">S/100.00</span>
                    </div>

                    <div className="seguridad-info">
                      <FaLock /> Pago 100% seguro y encriptado
                    </div>

                    <button
                      className={`boton-pagar boton-yapear ${cargando ? "cargando" : ""}`}
                      onClick={procesarPagoYape}
                      disabled={cargando}
                    >
                      {cargando ? (
                        "Procesando..."
                      ) : (
                        <>
                          <RiYoutubeLine className="yape-icon" /> Yapear S/100.00
                        </>
                      )}
                    </button>
                  </div>

                  <div className="yape-qr-container">
                    <p>O escanee nuestro QR y realice su pago con su aplicación Yape</p>
                    <div className="yape-qr-code">
                      <FaQrcode className="yape-qr-placeholder" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {metodoPago === "plin" && (
            <div className="plin-form">
              <div className="resumen-pago plin-resumen">
                <h3>Resumen del Pago</h3>

                <div className="resumen-item">
                  <span>Servicio:</span>
                  <span>Cita Médica</span>
                </div>

                <div className="resumen-item">
                  <span>Monto:</span>
                  <span className="monto">S/100.00</span>
                </div>

                <div className="plin-confirmacion">
                  <p>
                    <FaCheckCircle /> Una vez realizado el pago, su cita será confirmada automáticamente.
                  </p>
                </div>
              </div>

              <div className="plin-qr-container">
                <div className="plin-qr-wrapper">
                  <p className="plin-instruccion">
                    Escanee nuestro QR con su aplicación Plin, o agregue nuestro número celular a sus contactos y
                    realice su pago con Plin.
                  </p>

                  <div className="plin-qr-content">
                    <div className="plin-info">
                      <div className="plin-info-item">
                        <span className="plin-info-label">Empresa:</span>
                        <span className="plin-info-value">Clínica Señor de Luren</span>
                      </div>
                      <div className="plin-info-item">
                        <span className="plin-info-label">Celular Plin:</span>
                        <span className="plin-info-value">965063987</span>
                      </div>
                      <a href="tel:+965063987" className="plin-add-contact">
                        <FaUserPlus /> Añadir a contacto
                      </a>
                    </div>
                    <div className="plin-qr-code">
                      <FaQrcode className="plin-qr-placeholder" />
                    </div>
                  </div>

                  <div className="plin-seguridad-container">
                    <div className="plin-seguridad">
                      <div className="plin-seguridad-item">
                        <FaShieldVirus className="plin-seguridad-icon" />
                        <span>Pago Seguro</span>
                      </div>
                      <div className="plin-seguridad-item">
                        <FaAward className="plin-seguridad-icon" />
                        <span>Satisfacción Garantizada</span>
                      </div>
                      <div className="plin-seguridad-item">
                        <FaUserShield className="plin-seguridad-icon" />
                        <span>Privacidad Protegida</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}

export default MetodosPago