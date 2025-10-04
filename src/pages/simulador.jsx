import React, { useState, useEffect, useRef } from 'react';
import './simulador.css';
import motions from '../motions.json';

// Componente do painel de moção (MotionDisplay)
const MotionDisplay = ({ motion, infoslide, onSortear, hasMotion, onClose }) => {
  return (
    <div className="simulator-panel motion-panel">
      {/* Botão de fechar visível apenas quando a moção existe */}
      {hasMotion && (
        <button className="panel-close-btn" onClick={onClose} aria-label="Fechar Painel">
          ✕
        </button>
      )}
      
      {!hasMotion ? (
        <div className="motion-panel__initial-state">
          <h3>Simulador de Debates</h3>
          <p>Clique no botão abaixo para gerar uma moção e iniciar o debate.</p>
          <button className="sim-button sim-button--primary" onClick={onSortear}>
            🎲 Gerar Moção
          </button>
        </div>
      ) : (
        <div className="motion-panel__content">
          <div className="motion-header">
            <h4>Moção</h4>
            <button className="sim-button sim-button--secondary sim-button--icon" onClick={onSortear} aria-label="Gerar nova moção">
              🎲
            </button>
          </div>
          <p className="motion-text">{motion}</p>
          <h4>Infoslide</h4>
          <p className="infoslide-text">{infoslide}</p>
        </div>
      )}
    </div>
  );
};

// Componente do Timer
const Timer = ({ currentStage, timeLeft, isRunning, onStart, onPause, onSkip, onNext, timerColor, totalTime, onGenerateMotion, showMotionPanel }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const shouldPulse = timeLeft <= 30 && timeLeft > 0 && timerColor === 'red';

  return (
    <div className="simulator-panel timer-panel">
      <h2 className="stage-title">{currentStage}</h2>
      <div className={`timer-display ${shouldPulse ? 'pulse' : ''}`}>
        <svg className="progress-ring" viewBox="0 0 200 200">
          <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" /></linearGradient>
              <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" /></linearGradient>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#dc2626" /></linearGradient>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#2563eb" /></linearGradient>
          </defs>
          <circle className="progress-ring__background" cx="100" cy="100" r="90" />
          <circle className={`progress-ring__circle ${timerColor}`} cx="100" cy="100" r="90" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
        </svg>
        <div className="time-text">{formatTime(timeLeft)}</div>
      </div>
      <div className="timer-controls">
        {timeLeft > 0 ? (
          <>
            <button className={`sim-button ${isRunning ? 'sim-button--yellow' : 'sim-button--green'}`} onClick={isRunning ? onPause : onStart}>
              {isRunning ? 'Pausar' : 'Iniciar'}
            </button>
            <button className="sim-button sim-button--blue" onClick={onSkip}>Pular</button>
            {!showMotionPanel && (
              <button className="sim-button sim-button--purple" onClick={onGenerateMotion}>
                Ver Moção
              </button>
            )}
          </>
        ) : (
          <button className="sim-button sim-button--primary" onClick={onNext}>
            Próxima Fala
          </button>
        )}
      </div>
    </div>
  );
};

// Componente Principal do Simulador
const Simulador = () => {
  const [currentMotion, setCurrentMotion] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900);
  const [isRunning, setIsRunning] = useState(false);
  const [timerColor, setTimerColor] = useState('blue');
  const [showMotionPanel, setShowMotionPanel] = useState(true); // Começa mostrando
  const intervalRef = useRef(null);

  const stages = [
    { name: 'Tempo de Preparação', duration: 900 },
    { name: 'Primeiro Ministro', duration: 375 },
    { name: 'Líder da Oposição', duration: 375 },
    { name: 'Vice Primeiro Ministro', duration: 375 },
    { name: 'Vice Líder da Oposição', duration: 375 },
    { name: 'Membro do Governo', duration: 375 },
    { name: 'Membro da Oposição', duration: 375 },
    { name: 'Whip do Governo', duration: 375 },
    { name: 'Whip da Oposição', duration: 375 }
  ];

  const playTick = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const updateTimerColor = (timeRemaining) => {
    if (currentStage === 0) { setTimerColor('blue'); return; }
    if (timeRemaining > 360) { setTimerColor('green'); }
    else if (timeRemaining > 75) { setTimerColor('yellow'); }
    else { setTimerColor('red'); }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          updateTimerColor(newTime);
          if (currentStage > 0) {
            if (newTime === 360 || newTime === 75) playTick();
            if (newTime === 0) { playTick(); setTimeout(playTick, 200); }
          }
          if (newTime <= 0) {
            setIsRunning(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, currentStage]);

  useEffect(() => {
    sortearMocao();
  }, []);

  const sortearMocao = () => {
    const randomIndex = Math.floor(Math.random() * motions.length);
    setCurrentMotion(motions[randomIndex]);
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const skipStage = () => { 
    setIsRunning(false);
    // Avança diretamente para a próxima fala sem mostrar timeLeft = 0
    nextStage();
  };

  const nextStage = () => {
    if (currentStage < stages.length - 1) {
      const next = currentStage + 1;
      setCurrentStage(next);
      setTimeLeft(stages[next].duration);
      setIsRunning(false);
      updateTimerColor(stages[next].duration);
    } else {
      alert('Debate finalizado!');
    }
  };

  return (
    <div className="simulator-page">
      <div className="background-lights">
        <div className="light lightsim-1"></div>
        <div className="light lightsim-2"></div>
        <div className="light light-3"></div>
      </div>
      
      <div className="simulator-container">
        <div className={`simulator-layout ${showMotionPanel ? 'show-motion' : 'hide-motion'}`}>
          <div className="motion-column">
            <MotionDisplay 
              motion={currentMotion?.motion}
              infoslide={currentMotion?.infoslide}
              onSortear={sortearMocao}
              hasMotion={!!currentMotion}
              onClose={() => setShowMotionPanel(false)}
            />
          </div>
          <div className="timer-column">
            <Timer 
              currentStage={stages[currentStage].name}
              timeLeft={timeLeft}
              isRunning={isRunning}
              onStart={startTimer}
              onPause={pauseTimer}
              onSkip={skipStage}
              onNext={nextStage}
              timerColor={timerColor}
              totalTime={stages[currentStage].duration}
              onGenerateMotion={() => setShowMotionPanel(true)}
              showMotionPanel={showMotionPanel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador;