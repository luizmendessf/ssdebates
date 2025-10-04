import React from 'react';
import logo from '../assets/imagens/3dlogo.png';
import instagram from '../assets/imagens/instagram.png'
import linkedin from '../assets/imagens/linkedin1.png'
import CMDLP from '../assets/imagens/ssdCMDLP.png';
import ImgComTxt from '../components/imgComTxt';
import './home.css';
import Opcoes from '../components/opcoes';
import { useState } from 'react';
import { OQueFazemos } from '../data';
import ssdUfs from '../assets/imagens/ssdufs.jpg';
import Formulario from '../components/formulario';

export default function Home() {
const[selectedTopic, setSelectedTopic] = useState('workshops')

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
            <a href="http://instagram.com/ssdebates" className="social-link">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/sociedade-sergipana-de-debates/about/" className="social-link">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <a href="#o-que-fazemos" className="scroll-down-indicator">
          <div className="arrow"></div>
        </a>
      </section>

      <section id="o-que-fazemos" className="what-we-do-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">O Que Fazemos</h2>
            <p className="section-subtitle">
              Descubra como promovemos o debate e transformamos vidas através do diálogo
            </p>
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

 

      <ImgComTxt 
        img={ssdUfs}
        title='Nossa História'
        txt='A Sociedade Sergipana de Debates nasceu com a missão de transformar o diálogo em uma ferramenta de desenvolvimento pessoal e social. Desde sua fundação, buscamos cultivar uma cultura mais reflexiva, participativa e aberta ao debate, entendendo que o poder da argumentação vai além das palavras: ele forma lideranças, estimula o pensamento crítico e fortalece a democracia.

Somos uma organização sem fins lucrativos comprometida com a formação de cidadãos conscientes e atuantes. Acreditamos que o respeito, a empatia, a diversidade e a excelência são pilares essenciais para um espaço onde diferentes ideias possam se encontrar, ser desafiadas e crescer juntas.

Por meio de eventos, workshops, torneios e iniciativas educativas, promovemos experiências que desenvolvem habilidades de comunicação, escuta ativa e tomada de decisão. Nosso objetivo é fazer de Sergipe um polo de excelência no debate competitivo, reconhecendo o diálogo como um motor de transformação individual e coletiva.
      '
      />


    <Formulario />
    </>
  );
}