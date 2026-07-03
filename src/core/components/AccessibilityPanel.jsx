'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Eye, Minimize2, Zap, Vibrate, X, Plus, Minus } from 'lucide-react';
import './AccessibilityPanel.css';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isAnimationsDisabled, setIsAnimationsDisabled] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);

  // Apply font size changes globally
  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    if (fontSize !== 16) {
      document.documentElement.style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
      document.body.classList.add('high-contrast');
      // Apply to all major containers
      const containers = document.querySelectorAll(
        '.header-container, .footer-container, main'
      );
      containers.forEach((el) => {
        el.classList.add('high-contrast');
      });
    } else {
      document.documentElement.classList.remove('high-contrast');
      document.body.classList.remove('high-contrast');
      const containers = document.querySelectorAll(
        '.header-container, .footer-container, main'
      );
      containers.forEach((el) => {
        el.classList.remove('high-contrast');
      });
    }
  }, [isHighContrast]);

  // Apply animations disabled state
  useEffect(() => {
    if (isAnimationsDisabled) {
      document.documentElement.classList.add('no-animations');
      document.body.classList.add('no-animations');
    } else {
      document.documentElement.classList.remove('no-animations');
      document.body.classList.remove('no-animations');
    }
  }, [isAnimationsDisabled]);

  // Text to Speech function
  const speakText = () => {
    if ('speechSynthesis' in window) {
      const text = document.body.innerText;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  // Vibration feedback
  const triggerVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handleFontIncrease = () => {
    if (fontSize < 28) {
      setFontSize(fontSize + 2);
      triggerVibration();
    }
  };

  const handleFontDecrease = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
      triggerVibration();
    }
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    triggerVibration();
  };

  const toggleAnimations = () => {
    setIsAnimationsDisabled(!isAnimationsDisabled);
    triggerVibration();
  };

  const handleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (!isSpeechEnabled) {
      triggerVibration();
      speakText();
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="accessibility-toggle"
        onClick={() => {
          setIsOpen(!isOpen);
          triggerVibration();
        }}
        aria-label="Abrir panel de accesibilidad"
        aria-expanded={isOpen}
      >
        <Eye size={24} />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="accessibility-panel">
          <div className="panel-header">
            <h2>Herramientas de Accesibilidad</h2>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar panel"
            >
              <X size={20} />
            </button>
          </div>

          <div className="panel-content">
            {/* Font Size Control */}
            <div className="control-group">
              <label className="control-label">Tamaño de Fuente</label>
              <div className="font-controls">
                <button
                  className="control-btn decrease-btn"
                  onClick={handleFontDecrease}
                  disabled={fontSize <= 12}
                  aria-label="Disminuir tamaño de fuente"
                >
                  <Minus size={18} />
                </button>
                <span className="font-size-display">{fontSize}px</span>
                <button
                  className="control-btn increase-btn"
                  onClick={handleFontIncrease}
                  disabled={fontSize >= 28}
                  aria-label="Aumentar tamaño de fuente"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="control-group">
              <label className="control-label">Alto Contraste</label>
              <button
                className={`toggle-btn ${isHighContrast ? 'active' : ''}`}
                onClick={toggleHighContrast}
                aria-label="Alternar modo de alto contraste"
                aria-pressed={isHighContrast}
              >
                <span className="toggle-slider"></span>
                <span className="toggle-text">
                  {isHighContrast ? 'Activado' : 'Desactivado'}
                </span>
              </button>
            </div>

            {/* Speech Synthesis */}
            <div className="control-group">
              <label className="control-label">Lector de Pantalla</label>
              <button
                className={`feature-btn ${isSpeechEnabled ? 'active' : ''}`}
                onClick={handleSpeech}
                aria-label="Alternar lector de pantalla"
                aria-pressed={isSpeechEnabled}
              >
                <Volume2 size={18} />
                <span>{isSpeechEnabled ? 'Leyendo' : 'Leer Página'}</span>
              </button>
            </div>

            {/* Animations Toggle */}
            <div className="control-group">
              <label className="control-label">Control de Animaciones</label>
              <button
                className={`toggle-btn ${isAnimationsDisabled ? 'active' : ''}`}
                onClick={toggleAnimations}
                aria-label="Desactivar animaciones"
                aria-pressed={isAnimationsDisabled}
              >
                <span className="toggle-slider"></span>
                <span className="toggle-text">
                  {isAnimationsDisabled ? 'Desactivadas' : 'Activadas'}
                </span>
              </button>
            </div>

            {/* Vibration Feedback */}
            <div className="control-group">
              <label className="control-label">Retroalimentación Háptica</label>
              <button
                className="feature-btn"
                onClick={triggerVibration}
                aria-label="Probar vibración"
              >
                <Vibrate size={18} />
                <span>Probar Vibración</span>
              </button>
            </div>
          </div>

          <div className="panel-footer">
            <button
              className="reset-btn"
              onClick={() => {
                setFontSize(16);
                setIsHighContrast(false);
                setIsAnimationsDisabled(false);
                window.speechSynthesis.cancel();
                setIsSpeechEnabled(false);
                triggerVibration();
              }}
              aria-label="Restablecer todas las configuraciones"
            >
              Restablecer Defaults
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="accessibility-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
