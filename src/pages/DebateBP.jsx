import React from 'react';
import './DebateBP.css';

// Dados para a página
const rules = [
  { icon: "⏰", title: "7 Minutos por Discurso", description: "Cada um dos 8 oradores tem 7 minutos para apresentar seus argumentos e refutações." },
  { icon: "👥", title: "4 Bancadas, 8 Oradores", description: "Duas bancadas de Governo e duas de Oposição, cada uma com dois membros." },
  { icon: "💬", title: "Pontos de Informação", description: "Intervenções que a oposição pode oferecer durante os discursos." },
  { icon: "🎯", title: "Ranking Competitivo", description: "As bancadas são ranqueadas de 1º a 4º lugar ao final do debate." },
];

const speakers = [
  { order: 1, name: "Primeiro Ministro", team: "Governo de Abertura", role: "Define a moção, apresenta o caso do governo e introduz 2-3 argumentos principais." },
  { order: 2, name: "Líder da Oposição", team: "Oposição de Abertura", role: "Refuta o Primeiro Ministro, apresenta o caso da oposição e seus próprios argumentos." },
  { order: 3, name: "Vice-Primeiro Ministro", team: "Governo de Abertura", role: "Reconstrói o caso do governo, refuta o Líder da Oposição e apresenta novos argumentos ou aprofunda os existentes." },
  { order: 4, name: "Vice-Líder da Oposição", team: "Oposição de Abertura", role: "Reconstrói o caso da oposição, refuta a bancada de abertura do governo e expande os argumentos da oposição." },
  { order: 5, name: "Membro do Governo", team: "Governo de Fechamento", role: "Apresenta uma extensão do caso, trazendo uma nova perspectiva ou argumentos que diferenciam sua bancada da de abertura." },
  { order: 6, name: "Membro da Oposição", team: "Oposição de Fechamento", role: "Refuta a extensão do governo e apresenta a extensão do caso da sua própria bancada." },
  { order: 7, name: "Whip do Governo", team: "Governo de Fechamento", role: "Resume o debate sob a ótica do governo, cristalizando os pontos de vitória e mostrando por que sua bancada foi a mais importante." },
  { order: 8, name: "Whip da Oposição", team: "Oposição de Fechamento", role: "Resume o debate sob a ótica da oposição, sem introduzir novos argumentos, e destaca a contribuição de sua bancada." },
];

export default function DebateBP() {
  return (
    <main className="bp-page">
      {/* Hero Section */}
      <section className="bp-section hero-section">
        <div className="background-lights">
          <div className="light lightsim-1"></div>
          <div className="light lightsim-2"></div>
          <div className="light lightsim-3"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="main-title">Formato <span className="highlight">British Parliamentary</span></h1>
            <p className="subtitle">
              O padrão global para debates competitivos universitários, conhecido por sua dinâmica estratégica e profundidade argumentativa.
            </p>
          </div>
          <div className="hero-pdf">
            <div className="pdf-viewer">
              <iframe 
                src="https://drive.google.com/file/d/1gfvoqFBGyyX0ZgU6g_oRgmW9BnJVgkI8/preview" 
                width="100%" 
                height="400" 
                allow="autoplay"
                title="Guia British Parliamentary"
              ></iframe>
            </div>
            <a 
              href="https://drive.google.com/file/d/1gfvoqFBGyyX0ZgU6g_oRgmW9BnJVgkI8/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pdf-button"
            >
              📄 Abrir PDF Completo
            </a>
          </div>
        </div>
      </section>

      {/* O Que é o Formato BP? */}
      <section className="bp-section">
        <div className="container text-center">
          <h2 className="section-title">O Que é o <span className="highlight">Formato BP?</span></h2>
          <p className="section-intro">
            O British Parliamentary, ou BP, é um formato de debate que simula uma sessão do parlamento britânico. Quatro equipes — duas representando o Governo e duas a Oposição — competem para defender ou refutar uma moção. O objetivo não é apenas vencer o outro lado, but também provar ser a melhor equipe dentro da sua própria bancada (Governo ou Oposição).
          </p>
        </div>
      </section>

      {/* Estrutura do Debate */}
      <section className="bp-section">
        <div className="container">
          <h2 className="section-title text-center">Estrutura do <span className="highlight">Debate</span></h2>
          <div className="rules-grid">
            {rules.map((rule, index) => (
              <div key={index} className="rule-card">
                <div className="rule-icon-wrapper">
                  <span className="rule-icon">{rule.icon}</span>
                </div>
                <h3>{rule.title}</h3>
                <p>{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ordem e Papéis dos Oradores */}
      <section className="bp-section">
        <div className="container">
          <h2 className="section-title text-center">A Ordem e os Papéis dos <span className="highlight">Oradores</span></h2>
          <p className="section-intro text-center">
            Cada posição tem uma função específica. O sucesso no BP depende de cumprir seu papel enquanto se engaja com os argumentos de todo o debate.
          </p>
          <div className="speakers-grid">
            {speakers.map((speaker) => (
              <div key={speaker.order} className="speaker-card">
                <div className="speaker-header">
                  <span className="speaker-order">{speaker.order}º</span>
                  <span className="speaker-name">{speaker.name}</span>
                </div>
                <div className="speaker-team">{speaker.team}</div>
                <p className="speaker-role">{speaker.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Pontos de Informação (POIs) */}
       <section className="bp-section">
        <div className="container text-container">
          <h2 className="section-title text-center">Pontos de Informação <span className="highlight">(POIs)</span></h2>
          <p>
            Um Ponto de Informação é uma interrupção formal de um discurso por um membro da bancada oposta. Durante os discursos (exceto no primeiro e no último minuto, conhecidos como "tempo protegido"), debatedores da bancada oposta podem se levantar e pedir para fazer uma pergunta ou um comentário breve (até 15 segundos).
          </p>
          <p>
            <strong>Estratégia:</strong> Oferecer POIs demonstra engajamento. Aceitar um ou dois POIs durante seu discurso mostra confiança e capacidade de resposta. A forma como um debatedor lida com os POIs é um fator importante para os juízes.
          </p>
        </div>
      </section>

      {/* Como a Vitória é Decidida? */}
      <section className="bp-section">
        <div className="container text-container">
          <h2 className="section-title text-center">Como a Vitória é <span className="highlight">Decidida?</span></h2>
          <p>
            Ao final do debate, um painel de juízes delibera e ranqueia as quatro equipes do 1º ao 4º lugar. Não há "empates". A vitória é determinada pela equipe que foi mais persuasiva. Os juízes avaliam a qualidade dos argumentos, a força das refutações, o cumprimento do papel de cada orador e o engajamento geral no debate. O objetivo de uma equipe de fechamento não é apenas refutar a oposição, mas também superar a contribuição de sua própria equipe de abertura.
          </p>
        </div>
      </section>
    </main>
  );
}