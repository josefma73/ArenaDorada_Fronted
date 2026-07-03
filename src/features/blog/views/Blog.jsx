'use client';

import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import '../styles/Blog.css';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: 'Guía definitiva para mudarte a Ica: distritos más seguros',
      excerpt:
        'Descubre cuáles son los distritos de Ica con mejor reputación de seguridad y qué factores debes considerar al elegir tu próximo hogar como estudiante.',
      author: 'Carlos Mendoza',
      date: '15 de Junio, 2024',
      category: 'Guías',
      image: '📍',
    },
    {
      id: 2,
      title: 'Cómo organizar tu presupuesto universitario mensual',
      excerpt:
        'Consejos prácticos para administrar tu dinero de bolsillo durante tus años universitarios. Aprende a distribuir gastos de alojamiento, alimentación y entretenimiento.',
      author: 'María Torres',
      date: '12 de Junio, 2024',
      category: 'Economía',
      image: '💰',
    },
    {
      id: 3,
      title: '5 reglas de oro para convivir en áreas comunes',
      excerpt:
        'Mantén una buena relación con tus compañeros de habitación y espacios comunes. Descubre las mejores prácticas para una convivencia armoniosa y respetuosa.',
      author: 'Juan Pérez',
      date: '8 de Junio, 2024',
      category: 'Convivencia',
      image: '🤝',
    },
    {
      id: 4,
      title: 'Documentos importantes que debes llevar al llegar a Ica',
      excerpt:
        'Una lista completa de todos los documentos que necesitarás para tu mudanza. Desde DNI original hasta documentación bancaria y de emergencia.',
      author: 'Ana García',
      date: '1 de Junio, 2024',
      category: 'Checklist',
      image: '📋',
    },
    {
      id: 5,
      title: 'Internet, servicios básicos y facturas: lo que debes saber',
      excerpt:
        'Guía completa sobre cómo contratar servicios de internet, agua y electricidad. Entiende tus facturas y aprende a optimizar tu consumo.',
      author: 'Roberto Silva',
      date: '28 de Mayo, 2024',
      category: 'Servicios',
      image: '⚡',
    },
    {
      id: 6,
      title: 'Eventos y actividades para estudiantes en Ica',
      excerpt:
        'Descubre los mejores lugares para pasar el tiempo fuera de casa. Desde cafeterías hasta centros deportivos donde conocer gente nueva.',
      author: 'Sofia Ruiz',
      date: '20 de Mayo, 2024',
      category: 'Ocio',
      image: '🎉',
    },
  ];

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-content">
          <h1 className="hero-title">Blog RoomIca</h1>
          <p className="hero-subtitle">
            Consejos, guías y experiencias para estudiantes en Ica
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="articles-section">
        <div className="articles-wrapper">
          <div className="articles-header">
            <h2 className="section-title">Artículos Destacados</h2>
            <p className="section-description">
              Información útil para tu vida universitaria
            </p>
          </div>

          <div className="articles-grid">
            {articles.map((article) => (
              <article key={article.id} className="article-card">
                <div className="article-image-placeholder">{article.image}</div>

                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-category">{article.category}</span>
                    <span className="article-date">
                      <Calendar size={14} />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>

                  <div className="article-footer">
                    <div className="article-author">
                      <User size={14} />
                      {article.author}
                    </div>
                    <a href="#" className="read-more-btn">
                      Leer más
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-wrapper">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Suscríbete a nuestro Newsletter</h2>
            <p className="newsletter-description">
              Recibe artículos, consejos y ofertas especiales directamente en tu correo
            </p>

            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="tu@email.com"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
