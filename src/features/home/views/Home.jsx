'use client';

import React, { useState } from 'react';
import { Shield, MapPin, FileText, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const rooms = [
    {
      id: 1,
      title: 'Habitación Doble Premium',
      price: 550,
      distance: '0.8 km a UNAP',
      image: '🏠',
      verified: true,
    },
    {
      id: 2,
      title: 'Cuarto Individual Cómodo',
      price: 380,
      distance: '1.2 km a Facultad de Derecho',
      image: '🏠',
      verified: true,
    },
    {
      id: 3,
      title: 'Suite Ejecutiva',
      price: 750,
      distance: '0.5 km a Facultad de Ingeniería',
      image: '🏠',
      verified: true,
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Identidad Verificada',
      description: 'Validación de DNI de propietarios para mitigar estafas informales',
    },
    {
      icon: MapPin,
      title: 'Geolocalización Real',
      description: 'Distancia exacta caminando a los campus principales',
    },
    {
      icon: FileText,
      title: 'Contratos Legales Digitales',
      description: 'Formalización transparente y protección legal',
    },
  ];

  const testimonials = [
    {
      name: 'María García',
      role: 'Estudiante de Ingeniería - UNAP',
      text: 'RoomIca me ayudó a encontrar la habitación perfecta en Ica. El proceso fue transparente y seguro. ¡Recomendado!',
      rating: 5,
    },
    {
      name: 'Juan Rodríguez',
      role: 'Estudiante de Derecho - Universidad Católica',
      text: 'La plataforma es intuitiva y los propietarios verificados dan confianza. Pagué un mes sin preocupaciones.',
      rating: 5,
    },
    {
      name: 'Sofia López',
      role: 'Estudiante de Medicina - Facultad Local',
      text: 'Excelente servicio. La ubicación exacta de los cuartos me permitió ahorrar tiempo de búsqueda.',
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Tu espacio ideal para triunfar en la universidad</h1>
          <p className="hero-subtitle">
            Encuentra habitaciones verificadas, seguras y equipadas cerca de las principales facultades
            de Ica sin moverte de casa
          </p>

          {/* Search Mock */}
          <div className="search-container">
            <div className="search-group">
              <label htmlFor="university" className="search-label">Universidad de Destino</label>
              <select id="university" className="search-input">
                <option>Selecciona una universidad</option>
                <option>UNAP - Universidad Nacional Autónoma del Perú</option>
                <option>Facultad de Derecho</option>
                <option>Facultad de Ingeniería</option>
                <option>Universidad Católica</option>
              </select>
            </div>
            <div className="search-group">
              <label htmlFor="price-range" className="search-label">Rango de Precio (S/.)</label>
              <select id="price-range" className="search-input">
                <option>Rango de precio</option>
                <option>300 - 500</option>
                <option>500 - 700</option>
                <option>700 - 1000</option>
                <option>1000+</option>
              </select>
            </div>
            <button className="search-button">Buscar Habitaciones</button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="benefits-section">
        <div className="benefits-container">
          <h2 className="section-title">¿Por qué elegir RoomIca?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="benefit-card">
                  <div className="benefit-icon">
                    <Icon size={40} />
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Rooms Carousel */}
      <section className="rooms-section">
        <div className="rooms-container">
          <h2 className="section-title">Habitaciones Destacadas</h2>
          <div className="carousel-wrapper">
            <button
              className="carousel-btn prev-btn"
              onClick={prevSlide}
              aria-label="Habitación anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="carousel-track">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className={`room-card ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="room-image-placeholder">{room.image}</div>
                  {room.verified && (
                    <div className="verified-badge">
                      <Shield size={16} />
                      Verificado
                    </div>
                  )}
                  <div className="room-content">
                    <h3 className="room-title">{room.title}</h3>
                    <p className="room-location">
                      <MapPin size={16} />
                      {room.distance}
                    </p>
                    <div className="room-footer">
                      <span className="room-price">S/. {room.price}/mes</span>
                      <button className="room-action-btn">Ver Detalles</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-btn next-btn"
              onClick={nextSlide}
              aria-label="Siguiente habitación"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="section-title">Lo que dicen nuestros estudiantes</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array(testimonial.rating)
                    .fill(null)
                    .map((_, i) => (
                      <Star key={i} size={16} className="star" />
                    ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
