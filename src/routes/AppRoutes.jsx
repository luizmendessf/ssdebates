// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
// import Conquistas from '../pages/Conquistas';
import DebateBP from '../pages/DebateBP';
import Entrevistas from '../pages/entrevistas';
import Simulador from '../pages/simulador';
import SobreNos from '../pages/SobreNos';
// import Calculadora from '../pages/Calculadora';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*<Route path="/conquistas" element={<Conquistas />} />*/}
      <Route path="/modelo" element={<DebateBP />} />
      <Route path="/entrevistas" element={<Entrevistas />} />
      <Route path="/simulador" element={<Simulador />} />
      <Route path="/sobrenos" element={<SobreNos />} />
      {/* <Route path="/calculadora" element={<Calculadora />} /> */}
    </Routes>
  );
}
