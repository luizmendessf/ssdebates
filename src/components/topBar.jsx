import React, { useState, useEffect } from 'react';
import './topBar.css';
import logoMenu from '../assets/imagens/SSD-removebg-preview-menu.png';
import logo3d from '../assets/imagens/3dlogomenu.png';

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // ativa se passou 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <div className='logoMenu'>
        <img src={scrolled ? logo3d : logoMenu} alt="SSD" />
      </div>

      <button className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {mobileMenuOpen && <div className="nav-overlay" onClick={() => setMobileMenuOpen(false)}></div>}
      
      <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
        <ul>
          <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Início</a></li>
          <li><a href="/sobrenos" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</a></li>
          <li><a href="/modelo" onClick={() => setMobileMenuOpen(false)}>Modelo BP</a></li>
          <li><a href="/entrevistas" onClick={() => setMobileMenuOpen(false)}>Entrevistas</a></li>
          <li><a href="/simulador" onClick={() => setMobileMenuOpen(false)}>Simulador</a></li>
          <li><a href="/treinoia" onClick={() => setMobileMenuOpen(false)}>Treine com IA</a></li>
        </ul>
      </nav>
    </header>
  );
}
