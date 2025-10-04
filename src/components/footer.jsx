import React from 'react';

// 1. Importe as imagens no topo do seu arquivo
import instagramIcon from '../assets/imagens/instagram-branco.png';
import linkedinIcon from '../assets/imagens/linkedin1-branco.png';
import logoFinal from '../assets/imagens/SSD-removebg-preview-menu.png';

import './footer.css'; // Não se esqueça de importar o seu CSS

export default function Footer() {
  return (
    // 2. Troque todos os "class" por "className"
    <footer>
      <div className="footer-content">
        <div className="boxpfooter">
          <div className="texto-com-icones">
            <h4 className="pfooter">
              Quer obter mais informações em tempo real
              <br />
              sobre o movimento de debates em Sergipe?
            </h4>
            <div className="social-item">
              <a href="https://instagram.com/ssdebates" target="_blank" rel="noopener noreferrer">
                {/* 3. Use a variável da imagem importada no "src" */}
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <span>Siga-nos no Instagram</span>
            </div>
            <div className="social-item">
              <a href="https://www.linkedin.com/company/sociedade-sergipana-de-debates/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="Linkedin" />
              </a>
              <span>Siga-nos no LinkedIn</span>
            </div>
            
          </div>
        </div>
        <div className="logo-final">
          <img src={logoFinal} alt="logo-ssd" />
        </div>
      </div>
    </footer>
  );
}