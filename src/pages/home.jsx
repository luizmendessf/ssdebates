import React, { useState, useEffect } from 'react';
import logo from '/src/assets/imagens/3dlogo.png';
import instagram from '/src/assets/imagens/instagram.png'
import linkedin from '/src/assets/imagens/linkedin1.png'
import ImgComTxt from '../components/imgComTxt';
import './home.css';
import Opcoes from '../components/opcoes';
import { OQueFazemos } from '../data';
import ssdUfs from '/src/assets/imagens/ssdufs.jpg';

// Dados dos posts para incorporar
const instagramPosts = [
  `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DO6slRrD_N8/?img_index=1" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`,
  `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DLINs8wOBGN/" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`,
  `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DOyxcK5jXre/" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`
];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState('workshops');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('https://formspree.io/f/xzzgljav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitError('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      setSubmitError('Erro ao enviar mensagem. Verifique sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Efeito para carregar o script do Instagram
  useEffect(() => {
    // Adiciona o script do Instagram ao corpo do documento
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Renderiza os posts após o script carregar
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  function handleSelect(selectedButton){
      setSelectedTopic(selectedButton);
  }

  return (
    <>
      <section className="hero-section">
        <div className="background-lights">
          <div className="light light-1"></div>
          <div className="light light-2"></div>
          <div className="light light-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-logo">
            <img src={logo} alt="Sociedade Sergipana de Debates" />
          </div>
          <div className="social-links">
            <a href="http://instagram.com/ssdebates" className="social-link" target="_blank" rel="noopener noreferrer">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/sociedade-sergipana-de-debates/about/" className="social-link" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <a href="#news-section" className="scroll-down-indicator">
          <div className="arrow"></div>
        </a>
      </section>

      {/* SEÇÃO DE NOVIDADES */}
      <section id="news-section" className="news-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Últimas <span className="highlight">Novidades</span></h2>
            <p className="section-subtitle">Acompanhe nossas atividades mais recentes direto do nosso Instagram.</p>
          </div>
          <div className="instagram-grid">
            {instagramPosts.map((postHtml, index) => (
              <div key={index} className="instagram-card">
                <div className="instagram-post-wrapper" dangerouslySetInnerHTML={{ __html: postHtml }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO O QUE FAZEMOS */}
      <section id="o-que-fazemos" className="what-we-do-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">O Que <span className="highlight">Fazemos</span></h2>
            <p className="section-subtitle">Descubra como promovemos o debate e transformamos vidas através do diálogo.</p>
          </div>
          
          <div className="tabs-container">
            <div className="tab-buttons">
              <Opcoes isSelected={selectedTopic === 'workshops'} onClick={() => handleSelect('workshops')}>Workshops</Opcoes>
              <Opcoes isSelected={selectedTopic === 'torneios'} onClick={() => handleSelect('torneios')}>Torneios</Opcoes>
              <Opcoes isSelected={selectedTopic === 'comunidade'} onClick={() => handleSelect('comunidade')}>Comunidade</Opcoes>
            </div>

            <div className="tab-content">
              <div className="content-image">
                <img src={OQueFazemos[selectedTopic].img} alt={OQueFazemos[selectedTopic].title} />
              </div>
              <div className="content-text">
                <h3>{OQueFazemos[selectedTopic].title}</h3>
                <p>{OQueFazemos[selectedTopic].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEXTO COMPLETO RESTAURADO */}
      <ImgComTxt 
        img={ssdUfs}
        title='Nossa História'
        txt='A Sociedade Sergipana de Debates nasceu com a missão de transformar o diálogo em uma ferramenta de desenvolvimento pessoal e social. Desde sua fundação, buscamos cultivar uma cultura mais reflexiva, participativa e aberta ao debate, entendendo que o poder da argumentação vai além das palavras: ele forma lideranças, estimula o pensamento crítico e fortalece a democracia.

Somos uma organização sem fins lucrativos comprometida com a formação de cidadãos conscientes e atuantes. Acreditamos que o respeito, a empatia, a diversidade e a excelência são pilares essenciais para um espaço onde diferentes ideias possam se encontrar, ser desafiadas e crescer juntas.

Por meio de eventos, workshops, torneios e iniciativas educativas, promovemos experiências que desenvolvem habilidades de comunicação, escuta ativa e tomada de decisão. Nosso objetivo é fazer de Sergipe um polo de excelência no debate competitivo, reconhecendo o diálogo como um motor de transformação individual e coletiva.'
      />

      {/* SEÇÃO CTA / FORMULÁRIO */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Entre em Contato</h2>
            <p className="cta-subtitle">
              Quer saber mais sobre nossos eventos, parcerias ou como participar? Envie-nos uma mensagem!
            </p>
            {submitSuccess ? (
              <div className="form-success-message">
                <h3>Obrigado pelo contato!</h3>
                <p>Sua mensagem foi enviada com sucesso. Retornaremos em breve.</p>
                <button 
                  className="cta-button" 
                  onClick={() => setSubmitSuccess(false)}
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome" 
                    className="cta-input" 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Seu melhor e-mail" 
                    className="cta-input" 
                    required 
                  />
                </div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Sua mensagem..." 
                  className="cta-textarea" 
                  rows="5" 
                  required
                ></textarea>
                {submitError && (
                  <p className="form-error">{submitError}</p>
                )}
                <button 
                  type="submit" 
                  className="cta-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}