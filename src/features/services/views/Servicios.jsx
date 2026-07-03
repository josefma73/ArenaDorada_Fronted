'use client';

import React from 'react';
import {
  Home,
  Shield,
  Waves,
  TrendingUp,
  CreditCard,
  FileCheck,
  CheckCircle,
} from 'lucide-react';
import '../styles/Servicios.css';

export default function Servicios() {
  const studentServices = [
    {
      icon: Home,
      title: 'Zonas de Estudio Equipadas',
      description:
        'Acceso a espacios comunes diseñados especialmente para que puedas estudiar sin distracciones. Cuenta con iluminación adecuada, internet de alta velocidad y mesas de trabajo.',
    },
    {
      icon: Shield,
      title: 'Seguridad y Vigilancia',
      description:
        'Todas nuestras habitaciones cuentan con sistemas de seguridad modernos, cámaras de vigilancia 24/7 y acceso controlado. Tu tranquilidad es nuestra prioridad.',
    },
    {
      icon: Waves,
      title: 'Áreas Comunes de Lavandería',
      description:
        'Lavadoras automáticas de última tecnología disponibles en horarios flexibles. Servicio de limpieza complementario en algunos espacios comunes.',
    },
  ];

  const ownerServices = [
    {
      icon: TrendingUp,
      title: 'Gestión Automatizada de Deudas',
      description:
        'Sistema inteligente que calcula moras automáticamente y envía recordatorios de pago. Reduce el trabajo administrativo y asegura cobranzas puntuales.',
    },
    {
      icon: CreditCard,
      title: 'Cálculo Automático de Moras',
      description:
        'Las moratorias se calculan según los términos del contrato. Sistema transparente que protege tus ingresos y evita conflictos.',
    },
    {
      icon: FileCheck,
      title: 'Formalización de Contratos con iText',
      description:
        'Genera contratos digitales profesionales con firma electrónica. Garantía legal completa y documentación 100% digital.',
    },
    {
      icon: CheckCircle,
      title: 'Filtro de Inquilinos Matriculados',
      description:
        'Solo permitimos estudiantes activos verificados en universidades. Reduce riesgos y asegura arrendadores comprometidos con sus estudios.',
    },
  ];

  return (
    <div className="servicios-container">
      {/* Hero Section */}
      <section className="servicios-hero">
        <div className="hero-content">
          <h1 className="hero-title">Nuestros Servicios</h1>
          <p className="hero-subtitle">
            Soluciones completas para estudiantes y propietarios
          </p>
        </div>
      </section>

      {/* Student Services */}
      <section className="services-section">
        <div className="services-wrapper">
          <div className="section-header">
            <h2 className="section-title">Para Estudiantes</h2>
            <p className="section-description">
              Comodidades y servicios diseñados para tu bienestar académico
            </p>
          </div>

          <div className="services-grid">
            {studentServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="service-card">
                  <div className="service-icon">
                    <Icon size={44} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Owner Services */}
      <section className="services-section owner-section">
        <div className="services-wrapper">
          <div className="section-header">
            <h2 className="section-title">Para Propietarios</h2>
            <p className="section-description">
              Herramientas administrativas que simplifican la gestión de tu propiedad
            </p>
          </div>

          <div className="services-grid">
            {ownerServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="service-card">
                  <div className="service-icon">
                    <Icon size={44} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-section">
        <div className="value-wrapper">
          <h2 className="section-title">¿Por qué confiar en RoomIca?</h2>
          <div className="value-grid">
            <div className="value-item">
              <span className="value-number">1000+</span>
              <p className="value-text">Habitaciones verificadas</p>
            </div>
            <div className="value-item">
              <span className="value-number">5000+</span>
              <p className="value-text">Estudiantes satisfechos</p>
            </div>
            <div className="value-item">
              <span className="value-number">99%</span>
              <p className="value-text">Tasa de satisfacción</p>
            </div>
            <div className="value-item">
              <span className="value-number">24/7</span>
              <p className="value-text">Soporte disponible</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
