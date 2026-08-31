import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const rooms = [
  {
    id: 1,
    name: "Habitación Simple",
    price: "S/. 60 / noche",
    description:
      "Espacio confortable diseñado para viajeros que buscan tranquilidad y descanso.",
    badge: "Económica",
    image: "/habitacion-simple-detail.png",
  },
  {
    id: 2,
    name: "Habitación Doble",
    price: "S/. 100 / noche",
    description:
      "Ambiente amplio y acogedor ideal para parejas con servicios premium.",
    badge: "Popular",
    image: "/habitacion-doble-detail.png",
  },
  {
    id: 3,
    name: "Habitación Triple",
    price: "S/. 140 / noche",
    description:
      "Perfecta para familias pequeñas o grupos que buscan comodidad.",
    badge: "Familiar",
    image: "/habitacion-triple-detail.png",
  },
  {
    id: 4,
    name: "Habitación Matrimonial",
    price: "S/. 180 / noche",
    description:
      "Experiencia exclusiva con detalles de lujo y acceso a piscina.",
    badge: "Premium",
    image: "/habitacion-matrimonial-detail.png",
  },
];

const promotions = [
  {
    id:1,
    title:"Descuento Grupal",
    description:
      "Reserva cuatro habitaciones o más y recibe un descuento especial."
  },
  {
    id:2,
    title:"Estadía Extendida",
    description:
      "Disfruta más noches con beneficios exclusivos."
  },
  {
    id:3,
    title:"Experiencia Piscina",
    description:
      "Relájate con acceso preferencial a nuestra piscina."
  }
];

const testimonials = [
  {
    id:1,
    quote:
    "Una experiencia increíble, instalaciones cómodas y excelente atención.",
    author:"María García",
    role:"Turista"
  },
  {
    id:2,
    quote:
    "El servicio fue impecable y la ubicación perfecta.",
    author:"Carlos Mendoza",
    role:"Cliente frecuente"
  },
  {
    id:3,
    quote:
    "Excelente relación calidad-precio. Volveremos pronto.",
    author:"Ana Rodríguez",
    role:"Visitante"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const handleReservation = () => {
    navigate("/habitaciones");
  };

  return (
    <main className="home">
      {/* HERO */}
      <section 
        className="home__hero"
        aria-label="Presentación del hotel Arena Dorada"
      >
        <div className="home__hero-content">
          <p className="home__hero-subtitle">
            Lujo en el corazón de Ica
          </p>
          <h1 className="home__hero-title">
            Tu refugio de
            <br/>
            <span className="home__hero-title-accent">
              Arena Dorada
            </span>
          </h1>

          <p className="home__hero-description">
            Vive una experiencia única de descanso,
            comodidad y elegancia en nuestro hotel.
          </p>
          <button
            className="home__cta-button"
            onClick={handleReservation}
            aria-label="Realizar reserva de habitación"
          >
            RESERVAR AHORA
          </button>
        </div>
      </section>

      {/* BIENVENIDA */}
      <section className="home__welcome">
        <h2 className="home__welcome-title">
          Bienvenido a Arena Dorada
        </h2>
        <p className="home__welcome-text">
          Nuestro hotel combina elegancia, tranquilidad
          y atención personalizada para ofrecerte una
          experiencia inolvidable en Ica.
        </p>
      </section>

      {/* HABITACIONES */}
      <section className="home__rooms-section">
        <div className="home__rooms-container">
          <h2 className="home__section-title">
            Nuestras Habitaciones
          </h2>
          <div className="home__rooms-grid">
            {
              rooms.map(room=>(
                <article
                  key={room.id}
                  className="home__room-card"
                >
                  <div 
                    className="home__room-image"
                    style={{
                      backgroundImage:
                      `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)),
                      url(${room.image})`
                    }}
                  >
                    {room.name}
                  </div>

                  <div className="home__room-content">
                    <h3 className="home__room-title">
                      {room.name}
                    </h3>
                    <p className="home__room-price">
                      {room.price}
                    </p>
                    <p className="home__room-description">
                      {room.description}
                    </p>
                    <span className="home__room-badge">
                      {room.badge}
                    </span>
                  </div>
                </article>
              ))
            }
          </div>
        </div>
      </section>

      {/* PISCINA */}
      <section className="home__pool-section">
        <div className="home__pool-container">
          <div className="home__pool-image">
            Piscina Premium
          </div>
          <div className="home__pool-content">
            <h2>
              Un espacio para relajarte
            </h2>
            <p>
              Disfruta nuestra piscina exclusiva,
              diseñada para complementar tu estadía.
            </p>
            <p>
              Horario:
              <strong> 9:00 AM - 6:00 PM</strong>
            </p>
          </div>
        </div>
      </section>

      {/* PROMOCIONES */}
      <section className="home__promotions-section">
        <div className="home__promotions-container">
          <h2 className="home__section-title">
            Promociones
          </h2>
          <div className="home__promotions-grid">

          {
            promotions.map(promo=>(
              <article
                key={promo.id}
                className="home__promo-card"
              >
                <h3 className="home__promo-title">
                  {promo.title}
                </h3>
                <p className="home__promo-description">
                  {promo.description}
                </p>
                <button
                  className="home__promo-button"
                  onClick={()=>navigate("/promociones")}
                >
                  Ver detalles
                </button>
              </article>
            ))
          }
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="home__testimonials-section">
        <div className="home__testimonials-container">
          <h2 className="home__section-title">
            Opiniones de nuestros clientes
          </h2>

          <div className="home__testimonials-grid">
          {
            testimonials.map(item=>(
              <article
                key={item.id}
                className="home__testimonial-card"
              >
                <p className="home__testimonial-quote">
                  "{item.quote}"
                </p>
                <p className="home__testimonial-author">
                  {item.author}
                </p>
                <p className="home__testimonial-role">
                  {item.role}
                </p>
              </article>
            ))
          }
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
