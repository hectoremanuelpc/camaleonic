'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { number: '2.5M+', label: 'Seguidores Totales', icon: '👥' },
    { number: '156%', label: 'Crecimiento Mensual', icon: '📈' },
    { number: '89K', label: 'Engagement Rate', icon: '❤️' },
    { number: '24/7', label: 'Monitoreo', icon: '⚡' }
  ];

  const socialPlatforms = [
    { name: 'Instagram', followers: '1.2M', growth: '+12%', color: 'from-pink-500 to-purple-600', icon: '📷' },
    { name: 'Facebook', followers: '856K', growth: '+8%', color: 'from-blue-600 to-blue-800', icon: '👍' },
    { name: 'Twitter', followers: '445K', growth: '+15%', color: 'from-blue-400 to-blue-600', icon: '🐦' },
    { name: 'LinkedIn', followers: '98K', growth: '+22%', color: 'from-blue-700 to-blue-900', icon: '💼' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral/5 to-highlight/10">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="gradient-text">Social</span>{' '}
              <span className="text-foreground">Media</span>
            </h1>
            <h2 className={`text-4xl md:text-6xl font-bold mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="text-foreground">Dashboard</span>
            </h2>
            <p className={`text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Controla todas tus redes sociales desde un solo lugar. Analiza, programa y optimiza tu presencia digital con herramientas avanzadas.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <button className="gradient-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Comenzar Gratis
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Ver Demo
              </button>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-neutral/20 hover:border-primary/30 transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <div className="text-4xl mb-2 animate-float" style={{ animationDelay: `${index * 1000}ms` }}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <span className="gradient-text">Conecta</span> Todas Tus Plataformas
            </h3>
            <p className={`text-xl text-foreground/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              Integración perfecta con las principales redes sociales. Monitorea tu rendimiento en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => (
              <div
                key={platform.name}
                className={`group relative overflow-hidden rounded-2xl p-6 bg-white/50 backdrop-blur-sm border border-neutral/20 hover:border-primary/30 transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? 'animate-fade-in-right' : 'opacity-0'
                }`}
                style={{ animationDelay: `${1200 + index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl animate-float" style={{ animationDelay: `${index * 1500}ms` }}>
                      {platform.icon}
                    </span>
                    <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {platform.growth}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-foreground mb-2">{platform.name}</h4>
                  <p className="text-2xl font-bold gradient-text">{platform.followers}</p>
                  <p className="text-sm text-foreground/70">seguidores</p>
                  
                  <div className="mt-4 h-2 bg-neutral/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${platform.color} rounded-full transform origin-left transition-transform duration-1000 delay-1000`}
                      style={{ 
                        width: '100%',
                        transform: isVisible ? 'scaleX(0.8)' : 'scaleX(0)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Funciones <span className="gradient-text">Avanzadas</span>
            </h3>
            <p className={`text-xl text-foreground/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Herramientas profesionales para maximizar tu impacto en redes sociales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Analíticas en Tiempo Real',
                description: 'Métricas detalladas y insights accionables para optimizar tu contenido',
                icon: '📊',
                gradient: 'from-primary to-secondary'
              },
              {
                title: 'Programación Inteligente',
                description: 'Publica contenido en el momento óptimo para máximo engagement',
                icon: '⏰',
                gradient: 'from-secondary to-accent'
              },
              {
                title: 'Gestión de Comentarios',
                description: 'Responde y gestiona todas las interacciones desde un solo lugar',
                icon: '💬',
                gradient: 'from-accent to-highlight'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-white/70 backdrop-blur-md rounded-2xl p-8 text-center border border-neutral/20 hover:border-primary/30 transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${1600 + index * 200}ms` }}
              >
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${index * 2000}ms` }}>
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h4>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                
                <div className="mt-6">
                  <div className={`w-16 h-1 bg-gradient-to-r ${feature.gradient} rounded-full mx-auto transform transition-transform duration-1000 delay-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para <span className="gradient-text">Revolucionar</span> tus Redes Sociales?
            </h3>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Únete a miles de creadores y empresas que ya están maximizando su presencia digital con nuestro dashboard.
            </p>
            <button className="gradient-primary text-white px-12 py-6 rounded-2xl text-xl font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl animate-pulse-glow">
              Comenzar Ahora - Es Gratis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
