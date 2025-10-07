import React, { useState } from 'react';
import './SobreNos.css';

// --- Dados dos diretores, objetivos e conquistas (inalterado) ---
const directors = [
  { name: "Clara Prado", title: "Presidente e Fundadora", image: "/images/placeholder-avatar.png" },
  { name: "Elisa Prado", title: "Vice-Presidente e Fundadora", image: "/images/placeholder-avatar.png" },
  { name: "Letícia Sant'anna", title: "Diretoria de Relações Externas", image: "/images/placeholder-avatar.png" },
  { name: "Maria Teresa", title: "Diretoria Financeira", image: "/images/placeholder-avatar.png" },
  { name: "Luana Goes", title: "Diretoria Acadêmica", image: "/images/placeholder-avatar.png" },
  { name: "Sofia Pitta", title: "Vice-Presidente e Fundadora", image: "/images/placeholder-avatar.png" },
  { name: "Camila Salustino", title: "Diretoria de Relações Externas", image: "/images/placeholder-avatar.png" },
  { name: "Maria Maxime", title: "Diretoria Financeira", image: "/images/placeholder-avatar.png" },
];
const objectives = [
  { icon: "📚", title: "Promover o Debate", description: "Difundir a cultura do debate competitivo em Sergipe, incentivando o pensamento crítico e a argumentação estruturada." },
  { icon: "👥", title: "Desenvolver Habilidades", description: "Proporcionar um ambiente para o desenvolvimento de oratória, argumentação, análise crítica e trabalho em equipe." },
  { icon: "🎯", title: "Formar Líderes", description: "Contribuir para a formação de líderes capazes de articular ideias com clareza e defender posições com embasamento." },
];
const achievements = [
  { title: "Vice-campeã Novice Nacional", event: "Campeonato Brasileiro de Debates 2024" },
  { title: "Campeã Novice Regional", event: "USP Open 2024" },
  { title: "Break Open Roberto Farina", event: "UFSC 2025" },
  { title: "Break Juíz BP e Schools Castro Alves", event: "IBD 2025" },
  { title: "Break Schools Castro Alves", event: "IBD 2025" },
  { title: "Break Open, Novice e Juíz", event: "Campeonato Mundial de Debates em Língua Portuguesa 2025" },
  { title: "2ª melhor debatedora Novice e 18ª open", event: "Campeonato Mundial de Debates em Língua Portuguesa 2025" },
];

export default function SobreNos() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? directors.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === directors.length - 1 ? 0 : prevIndex + 1));
  };

  // --- CORREÇÃO AQUI ---
  // Definimos as larguras como constantes para um cálculo mais claro e preciso.
  const cardWidth = 340; // A largura do .director-card-wrapper
  const cardMargin = 16;   // A margem de cada lado do .director-card-wrapper
  const totalCardSpace = cardWidth + (cardMargin * 2); // Largura total que cada card ocupa

  return (
    <main className="about-page">
      <section className="about-section">
        {/* ... (código da seção de objetivos inalterado) ... */}
         <div className="container text-center">
          <h1 className="section-title">Nossa <span className="highlight">Missão</span></h1>
          <p className="section-intro">
            A Sociedade Sergipana de Debates nasceu para cultivar um ambiente de diálogo, pensamento crítico e desenvolvimento de futuras lideranças.
          </p>
          <div className="objectives-grid">
            {objectives.map((obj, index) => (
              <div key={index} className="objective-card">
                <div className="objective-icon-wrapper">
                  <span className="objective-icon">{obj.icon}</span>
                </div>
                <h3>{obj.title}</h3>
                <p>{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section directors-section">
        <div className="container text-center">
          <h2 className="section-title">Nossa <span className="highlight">Diretoria</span></h2>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div 
                className="carousel-track" 
                // CORREÇÃO: A fórmula agora usa a largura total (card + margens)
                style={{ transform: `translateX(calc(50% - ${activeIndex * totalCardSpace}px - ${totalCardSpace / 2}px))` }}
              >
                {directors.map((director, index) => (
                  <div 
                    key={index} 
                    className={`director-card-wrapper ${index === activeIndex ? 'active' : 'side'}`}
                  >
                    <div className="director-card">
                      <div className="director-image-wrapper">
                        <img src={director.image} alt={director.name} className="director-image" />
                      </div>
                      <h3 className="director-name">{director.name}</h3>
                      <p className="director-title">{director.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             <button onClick={handlePrev} className="carousel-btn prev" aria-label="Diretor Anterior">
              ←
            </button>
            <button onClick={handleNext} className="carousel-btn next" aria-label="Diretor Anterior">
              →
            </button>
          </div>
        </div>
      </section>

      <section className="about-section">
        {/* ... (código da seção de conquistas inalterado) ... */}
        <div className="container">
          <h2 className="section-title text-center">Nossas <span className="highlight">Conquistas</span></h2>
          <div className="achievements-list">
            {achievements.map((item, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon-wrapper">
                  <span className="achievement-icon">🏆</span>
                </div>
                <div className="achievement-text">
                  <h3 className="achievement-title">{item.title}</h3>
                  <p className="achievement-event">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}