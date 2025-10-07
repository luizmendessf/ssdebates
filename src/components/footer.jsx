import React from 'react';

// Importação das imagens
import instagramIcon from '/src/assets/imagens/instagram-branco.png';
import linkedinIcon from '/src/assets/imagens/linkedin1-branco.png';
import logoFinal from '/src/assets/imagens/SSD-removebg-preview-menu.png';

import './footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-title">Sociedade Sergipana de Debates</h3>
          <p className="footer-description">
            Transformando o diálogo em uma ferramenta de desenvolvimento pessoal e social desde 2024.
          </p>
          
          <div className="social-links">
            <a href="https://instagram.com/ssdebates" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/sociedade-sergipana-de-debates/" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href="https://www.youtube.com/@SociedadeSergipanadeDebates" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-right">
          <div className="footer-logo">
            <img src={logoFinal} alt="Sociedade Sergipana de Debates" />
          </div>
          <p className="footer-copyright">&copy; 2024 Sociedade Sergipana de Debates</p>
        </div>
      </div>
    </footer>
  );
}