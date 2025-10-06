import React, { useState, useEffect } from "react";
import './entrevistas.css';

export default function Entrevistas() {
  const [currentFormationIndex, setCurrentFormationIndex] = useState(0);
  const [currentEntrevistaIndex, setCurrentEntrevistaIndex] = useState(0);

  // Dados das entrevistas
  const entrevistasData = [
    {
      id: 1,
      title: "Entrevista 1 - Rádio Boca da Mata",
      embedId: "UYNHFLWrOd0",
      description: "Entrevista na Rádio Boca da Mata"
    },
    {
      id: 2,
      title: "Entrevista 2 - TV Sergipe",
      embedId: "R0XVPP8_1Aw",
      description: "Entrevista na TV Sergipe"
    },
    {
      id: 3,
      title: "Entrevista 3 - Rádio Liberdade",
      embedId: "XtBumBMkMaw",
      description: "Entrevista na Rádio Liberdade"
    },
    {
      id: 4,
      title: "Entrevista 4 - TV Alese",
      embedId: "0dvs-S07Ogc",
      description: "Entrevista na TV Alese"
    }
  ];

  // Dados das formações temáticas
  const formacoesData = [
    {
      id: "oriente-medio",
      title: "Formação temática SSD - Oriente Médio",
      url: "https://youtu.be/44joQNQQ0hU?si=XGrVU0oSJYOdIUk5",
      embedId: "44joQNQQ0hU"
    },
    {
      id: "direito",
      title: "Formação temática SSD - Direito",
      url: "https://youtu.be/qZ4Xo6gqty0?si=7r7QdGEMwP7SOIsC",
      embedId: "qZ4Xo6gqty0"
    },
    {
      id: "europa",
      title: "Formação Acadêmica SSD - Europa",
      url: "https://youtu.be/NN3Y26WboVI?si=JI4aRS2FkN6j5obq",
      embedId: "NN3Y26WboVI"
    },
    {
      id: "politica-brasileira",
      title: "Formação Temática SSD - Política Brasileira",
      url: "https://youtu.be/E5RhmMIuEcU?si=snRDY-eifLSJkLIL",
      embedId: "E5RhmMIuEcU"
    },
    {
      id: "saude",
      title: "Formação temática SSD - Saúde",
      url: "https://youtu.be/xICDmdlfCrQ?si=B0rtAUFhnsCB3HRD",
      embedId: "xICDmdlfCrQ"
    },
    {
      id: "economia",
      title: "Formação temática SSD - Economia",
      url: "https://youtu.be/NiSj4QCQosg?si=fkFLQCpu0rz1PCG1",
      embedId: "NiSj4QCQosg"
    },
    {
      id: "politica-publica",
      title: "Formação temática SSD - Política Pública pt.1",
      url: "https://youtu.be/xn088bYHehQ?si=kbcRxuGDk9llieRB",
      embedId: "xn088bYHehQ"
    },
        {
      id: "tecnologia",
      title: "Formação temática SSD - Tecnologia",
      url: "https://youtu.be/nX_rCCEbQCI",
      embedId: "nX_rCCEbQCI"
    },
    {
      id: "meio-ambiente",
      title: "Formação Temática SSD - Meio Ambiente",
      url: "https://youtu.be/Jm6ruM7NSRE?si=RqGqyPAHRb1KKkSv",
      embedId: "Jm6ruM7NSRE"
    }
  ];

  const nextFormation = () => {
    setCurrentFormationIndex((prevIndex) => 
      prevIndex === formacoesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevFormation = () => {
    setCurrentFormationIndex((prevIndex) => 
      prevIndex === 0 ? formacoesData.length - 1 : prevIndex - 1
    );
  };

  const nextEntrevista = () => {
    setCurrentEntrevistaIndex((prevIndex) => 
      prevIndex < entrevistasData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevEntrevista = () => {
    setCurrentEntrevistaIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const goToFormation = (index) => {
    setCurrentFormationIndex(index);
  };

  return (
    <div className="videos-page">
      {/* Seção de Entrevistas */}
      <section className="entrevistas-section">
        <h2 className="section-title">Entrevistas</h2>
        
        <div className="carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={prevEntrevista}>
            &#8249;
          </button>
          
          <div className="carousel-content-three">
            {/* Vídeo da esquerda */}
            <div className="entrevista-card side-card left-card" onClick={prevEntrevista}>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${entrevistasData[currentEntrevistaIndex === 0 ? entrevistasData.length - 1 : currentEntrevistaIndex - 1].embedId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={entrevistasData[currentEntrevistaIndex === 0 ? entrevistasData.length - 1 : currentEntrevistaIndex - 1].title}
                ></iframe>
              </div>
              <div className="entrevista-info">
                <h3>{entrevistasData[currentEntrevistaIndex === 0 ? entrevistasData.length - 1 : currentEntrevistaIndex - 1].title}</h3>
              </div>
            </div>

            {/* Vídeo em destaque (centro) */}
            <div className="entrevista-card main-card">
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${entrevistasData[currentEntrevistaIndex].embedId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={entrevistasData[currentEntrevistaIndex].title}
                ></iframe>
              </div>
              <div className="entrevista-info">
                <h3>{entrevistasData[currentEntrevistaIndex].title}</h3>
                <p>{entrevistasData[currentEntrevistaIndex].description}</p>
              </div>
            </div>

            {/* Vídeo da direita */}
            <div className="entrevista-card side-card right-card" onClick={nextEntrevista}>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${entrevistasData[currentEntrevistaIndex === entrevistasData.length - 1 ? 0 : currentEntrevistaIndex + 1].embedId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={entrevistasData[currentEntrevistaIndex === entrevistasData.length - 1 ? 0 : currentEntrevistaIndex + 1].title}
                ></iframe>
              </div>
              <div className="entrevista-info">
                <h3>{entrevistasData[currentEntrevistaIndex === entrevistasData.length - 1 ? 0 : currentEntrevistaIndex + 1].title}</h3>
              </div>
            </div>
          </div>
          
          <button className="carousel-btn carousel-btn-next" onClick={nextEntrevista}>
            &#8250;
          </button>
        </div>
        
        {/* Indicadores do Carousel */}
        <div className="carousel-indicators">
          {entrevistasData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentEntrevistaIndex ? 'active' : ''}`}
              onClick={() => setCurrentEntrevistaIndex(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Nova Seção de Formações Temáticas */}
      <section className="formacoes-section">
        <h2 className="section-title">Formações Temáticas</h2>
        
        <div className="carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={prevFormation}>
            &#8249;
          </button>
          
          <div className="carousel-content-three">
            {/* Vídeo da esquerda */}
            <div className="formation-card side-card left-card" onClick={prevFormation}>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${formacoesData[currentFormationIndex === 0 ? formacoesData.length - 1 : currentFormationIndex - 1].embedId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={formacoesData[currentFormationIndex === 0 ? formacoesData.length - 1 : currentFormationIndex - 1].title}
                ></iframe>
              </div>
              <div className="formation-info">
                <h3>{formacoesData[currentFormationIndex === 0 ? formacoesData.length - 1 : currentFormationIndex - 1].title}</h3>
              </div>
            </div>

            {/* Vídeo em destaque (centro) */}
            <div className="formation-card main-card">
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${formacoesData[currentFormationIndex].embedId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={formacoesData[currentFormationIndex].title}
                ></iframe>
              </div>
              <div className="formation-info">
                <h3>{formacoesData[currentFormationIndex].title}</h3>
              </div>
            </div>

            {/* Vídeo da direita */}
            <div className="formation-card side-card right-card" onClick={nextFormation}>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${formacoesData[currentFormationIndex === formacoesData.length - 1 ? 0 : currentFormationIndex + 1].embedId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={formacoesData[currentFormationIndex === formacoesData.length - 1 ? 0 : currentFormationIndex + 1].title}
                ></iframe>
              </div>
              <div className="formation-info">
                <h3>{formacoesData[currentFormationIndex === formacoesData.length - 1 ? 0 : currentFormationIndex + 1].title}</h3>
              </div>
            </div>
          </div>
          
          <button className="carousel-btn carousel-btn-next" onClick={nextFormation}>
            &#8250;
          </button>
        </div>
        
        {/* Indicadores do Carousel */}
        <div className="carousel-indicators">
          {formacoesData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentFormationIndex ? 'active' : ''}`}
              onClick={() => goToFormation(index)}
            ></button>
          ))}
        </div>
      </section>
    </div>
  );
}
