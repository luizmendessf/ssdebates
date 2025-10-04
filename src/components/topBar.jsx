import React, { useState, useEffect } from 'react';
import './TopBar.css';
import logoMenu from '../assets/imagens/SSD-removebg-preview-menu.png';
import logo3d from '../assets/imagens/3dlogomenu.png';

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // ativa se passou 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <div className='logoMenu'>
        <img src={scrolled ? logo3d : logoMenu} alt="SSD" />
      </div>

      <nav>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/conquistas">Conquistas</a></li>
          <li><a href="/modelo">Modelo BP</a></li>
          <li><a href="/entrevistas">Entrevistas</a></li>
          <li><a href="/simulador">Simulador</a></li>
          <li><a href="/calculadora">Calculadora</a></li>
        </ul>
      </nav>
    </header>
  );
}
