import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TopBar from './components/topBar';  
import AppRoutes from './routes/AppRoutes';
import './App.css';
import Footer from './components/footer';

export default function App() {
  return (
    <Router>
      <TopBar />
      <AppRoutes />
      <Footer />
    </Router>
  );
}
