import { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaWineBottle,
  FaUtensils,
  FaLaptop,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaArrowRight,
  FaSearch,
} from 'react-icons/fa';

import { LuBackpack } from 'react-icons/lu'; 

import '../styles/Blog.css';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'Guía Completa: Laguna de Huacachina',
      category: 'turismo',
      image: '/blog-viajes.png',
      author: 'Equipo Arena Dorada',
      date: '15 Marzo 2024',
      readTime: '8 min',
      excerpt:
        'Descubre la magia de la Laguna de Huacachina, un oasis en el desierto con aguas cristalinas y actividades para todos.',
      content:
        'Una experiencia completa de las mejores rutas en Huacachina...',
      icon: FaMapMarkerAlt,
    },
    {
      id: 2,
      title: 'Ruta de los Piscos: Bodegas Tradicionales',
      category: 'vino',
      image: '/ubicacion-ica.png',
      author: 'Sommelier Anónimo',
      date: '12 Marzo 2024',
      readTime: '10 min',
      excerpt:
        'Explora las bodegas centenarias de Ica y aprende sobre la tradición del pisco destilado en la región.',
      content: 'Las bodegas más emblemáticas de la región de Ica...',
      icon: FaWineBottle,
    },
    {
      id: 3,
      title: 'Qué Empacar: Consejos para el Desierto',
      category: 'consejos',
      image: '/habitacion-doble.png',
      author: 'Travel Expert',
      date: '10 Marzo 2024',
      readTime: '6 min',
      excerpt:
        'Guía práctica sobre qué llevar a Ica: ropa, protectores solares y artículos esenciales para viajeros.',
      content:
        'La mejor recomendación de equipaje para disfrutar Ica...',
      icon: LuBackpack,
    },
    {
      id: 4,
      title: 'Gastronomía Iqueña: Carapulcra y Más',
      category: 'gastronomia',
      image: '/cafeteria-panaderia.png',
      author: 'Chef Local',
      date: '8 Marzo 2024',
      readTime: '7 min',
      excerpt:
        'Conoce los platos típicos de Ica y dónde degustarlos. Desde la carapulcra hasta los tejas de postre.',
      content:
        'La riqueza culinaria de la región de Ica es una joya...',
      icon: FaUtensils,
    },
    {
      id: 5,
      title: 'Digitalización del Hostal: Nuestra Transformación',
      category: 'noticias',
      image: '/piscina-arena-dorada.png',
      author: 'Gerencia',
      date: '5 Marzo 2024',
      readTime: '5 min',
      excerpt:
        'Cómo pasamos de cuadernos físicos a una moderna plataforma web. La historia detrás del cambio.',
      content:
        'El Hostal Arena Dorada ha experimentado una transformación...',
      icon: FaLaptop,
    },
    {
      id: 6,
      title: 'Festividades 2024: Calendario Completo',
      category: 'eventos',
      image: '/blog-viajes.png',
      author: 'Coordinador de Eventos',
      date: '1 Marzo 2024',
      readTime: '4 min',
      excerpt:
        'Planifica tu viaje alrededor de los eventos más importantes de Ica. Festival de la Vendimia y más.',
      content:
        'Ica es rica en tradiciones y celebraciones que atraen...',
      icon: FaCalendarAlt,
    },
  ];

  const categories = [
    { value: 'all', label: 'Todos', count: blogPosts.length },
    {
      value: 'turismo',
      label: 'Turismo',
      count: blogPosts.filter((p) => p.category === 'turismo').length,
    },
    {
      value: 'vino',
      label: 'Vino & Pisco',
      count: blogPosts.filter((p) => p.category === 'vino').length,
    },
    {
      value: 'consejos',
      label: 'Consejos',
      count: blogPosts.filter((p) => p.category === 'consejos').length,
    },
    {
      value: 'gastronomia',
      label: 'Gastronomía',
      count: blogPosts.filter((p) => p.category === 'gastronomia').length,
    },
    {
      value: 'noticias',
      label: 'Noticias',
      count: blogPosts.filter((p) => p.category === 'noticias').length,
    },
    {
      value: 'eventos',
      label: 'Eventos',
      count: blogPosts.filter((p) => p.category === 'eventos').length,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-hero-overlay" />
        <div className="blog-hero-content">
          <h1 className="blog-title">Blog Arena Dorada</h1>
          <p className="blog-subtitle">
            Historias, consejos y guías para disfrutar Ica al máximo
          </p>
        </div>
      </div>

      {/* Search Section */}
      <section className="blog-search-section">
        <div className="blog-search-container">
          <div className="blog-search-box">
            <FaSearch className="blog-search-icon" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="blog-search-input"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="blog-categories-section">
        <div className="blog-categories-container">
          <h2 className="blog-categories-title">Categorías</h2>
          <div className="blog-categories-grid">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`blog-category-btn ${
                  selectedCategory === category.value ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="blog-category-label">{category.label}</span>
                <span className="blog-category-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="blog-posts-section">
        <div className="blog-posts-container">
          {filteredPosts.length > 0 ? (
            <div className="blog-posts-grid">
              {filteredPosts.map((post, idx) => {
                const IconComponent = post.icon;
                return (
                  <article
                    key={post.id}
                    className="blog-post-card"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s backwards`,
                    }}
                  >
                    <div className="blog-post-image-wrapper">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="blog-post-image"
                      />
                      <div className="blog-post-icon-badge">
                        <IconComponent size={28} />
                      </div>
                      <div className="blog-post-overlay">
                        <button className="blog-post-read-btn">
                          Leer Más <FaArrowRight />
                        </button>
                      </div>
                    </div>

                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span className="blog-post-category">{post.category}</span>
                        <span className="blog-post-read-time">
                          <FaClock size={12} /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="blog-post-title">{post.title}</h3>

                      <p className="blog-post-excerpt">{post.excerpt}</p>

                      <div className="blog-post-footer">
                        <div className="blog-post-author">
                          <FaUser size={14} />
                          <span>{post.author}</span>
                        </div>
                        <span className="blog-post-date">
                          <FaCalendarAlt size={14} /> {post.date}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="blog-no-results">
              <p>No se encontraron artículos que coincidan con tu búsqueda.</p>
              <button
                className="blog-reset-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="blog-featured-section">
        <h2 className="blog-section-title">Artículo Destacado</h2>
        <div className="blog-featured-card">
          <div className="blog-featured-image">
            <img src="/piscina-arena-dorada.png" alt="Destacado" />
          </div>
          <div className="blog-featured-content">
            <h3 className="blog-featured-title">
              Rutas Completas para Explorar Ica en 3 Días
            </h3>
            <p className="blog-featured-excerpt">
              La guía definitiva para conocer lo mejor de Ica en un fin de semana.
              Desde el desierto hasta las bodegas, pasando por atractivos naturales
              e históricos. Planifica tu aventura con nosotros.
            </p>
            <div className="blog-featured-highlights">
              <div className="blog-featured-highlight">Huacachina</div>
              <div className="blog-featured-highlight">Bodegas</div>
              <div className="blog-featured-highlight">Gastronomía</div>
              <div className="blog-featured-highlight">Naturaleza</div>
            </div>
            <button className="blog-featured-btn">Leer Artículo Completo</button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="blog-newsletter-section">
        <div className="blog-newsletter-container">
          <h2 className="blog-newsletter-title">Suscríbete a Nuestro Blog</h2>
          <p className="blog-newsletter-text">
            Recibe las últimas historias, consejos y promociones directamente en tu correo
          </p>
          <form className="blog-newsletter-form">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="blog-newsletter-input"
              required
            />
            <button type="submit" className="blog-newsletter-btn">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
