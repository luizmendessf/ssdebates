import React from 'react';
import TopBar from './components/topBar';  
import AppRoutes from './routes/AppRoutes';
import './App.css';
import Footer from './components/footer';

export default function App() {
  return (
    <>
      <TopBar />
      <AppRoutes />
      <Footer />
    </>
  );
}
