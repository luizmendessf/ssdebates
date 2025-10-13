import React, { useState, useEffect, useRef } from 'react';
import './TreinoIA.css';

// --- Constantes ---
const motions = [
  { text: "Esta casa proibiria a publicidade direcionada com base em dados pessoais.", infoslide: "Publicidade direcionada refere-se a anúncios personalizados baseados no histórico de navegação e dados do usuário." },
  { text: "Esta casa acredita que o direito ao voto deveria ser obrigatório.", infoslide: "Moção sem infoslide." },
  { text: "Esta casa implementaria uma renda básica universal.", infoslide: "Renda básica universal é um pagamento periódico do governo a todos os cidadãos, sem condições." },
  { text: "Esta casa acredita que a exploração espacial privada traz mais malefícios do que benefícios.", infoslide: "Moção sem infoslide." },
];
const allPositions = [
  "Primeiro Ministro", "Líder da Oposição", 
  "Vice-Primeiro Ministro", "Vice-Líder da Oposição",
  "Membro do Governo", "Membro da Oposição",
  "Whip do Governo", "Whip da Oposição"
];
const SPEECH_DURATION = 435;

// --- Funções Auxiliares ---
const parseFeedback = (text) => { if (!text) return []; const sections = text.split('### ').slice(1); return sections.map(section => { const lines = section.split('\n'); const title = lines[0].trim(); const content = lines.slice(1).join('\n').trim(); return { title, content }; }); };
const blobToBase64 = (blob) => { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.readAsDataURL(blob); reader.onloadend = () => { resolve(reader.result.split(',')[1]); }; reader.onerror = (error) => reject(error); }); };
const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; };

// --- Componente Principal ---
export default function TreinoIA() {
  const [step, setStep] = useState('welcome');
  const [motion, setMotion] = useState({ text: '', infoslide: '', position: '' });
  const [isEditingMotion, setIsEditingMotion] = useState(false);
  const [editedMotion, setEditedMotion] = useState({ text: '', infoslide: '', position: '' });
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [parsedFeedback, setParsedFeedback] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(SPEECH_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [timerColor, setTimerColor] = useState('green');
  const [bulletsOpen, setBulletsOpen] = useState(false);
  const [bulletsLoading, setBulletsLoading] = useState(false);
  const [bulletsError, setBulletsError] = useState('');
  const [bulletsText, setBulletsText] = useState('');
  const [bulletsCache, setBulletsCache] = useState({});

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);

  const sortearMocao = () => {
    const randomMotion = motions[Math.floor(Math.random() * motions.length)];
    const randomPosition = allPositions[Math.floor(Math.random() * allPositions.length)];
    const newMotion = { text: randomMotion.text, infoslide: randomMotion.infoslide, position: randomPosition };
    setMotion(newMotion);
    setEditedMotion(newMotion);
  };
  
  useEffect(() => {
    sortearMocao();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => { setTimeLeft(prev => prev - 1); }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      stopRecording();
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);
  
  useEffect(() => {
    if (timeLeft > 360) setTimerColor('green');
    else if (timeLeft > 60) setTimerColor('yellow');
    else setTimerColor('red');
  }, [timeLeft]);

  const handleStart = () => {
    setError('');
    setTimeLeft(SPEECH_DURATION);
    setAudioBlob(null);
    setStep('recording');
  };

  const handleEditToggle = () => {
    setEditedMotion(motion);
    setIsEditingMotion(!isEditingMotion);
  };
  
  const handleSaveMotion = () => {
    setMotion(editedMotion);
    setIsEditingMotion(false);
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => audioChunksRef.current.push(event.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsRunning(true);
    } catch (err) {
      setError('Não foi possível aceder ao microfone. Por favor, verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsRunning(false);
  };

  const handleAnalysis = async () => {
    if (!audioBlob) return;
    setStep('analyzing');
    setLoadingMessage('A enviar e a analisar o seu discurso...');
    setError('');

    try {
      const audio_base_64 = await blobToBase64(audioBlob);
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio_base_64,
          motion: motion.text,
          infoslide: motion.infoslide,
          position: motion.position
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro no servidor.');
      }
      setFeedback(data.feedback);
      setParsedFeedback(parseFeedback(data.feedback));
      setStep('feedback');
    } catch (err) {
      console.error('Erro durante a análise do discurso:', err);
      setError('friendly');
      setStep('recording');
    } finally {
      setLoadingMessage('');
    }
  };
  
  const reset = () => { setStep('welcome'); sortearMocao(); setAudioBlob(null); setFeedback(''); setParsedFeedback([]); setError(''); };

  const parseBullets = (text) => {
    if (!text) return [];
    const sections = text.split('### ').slice(1);
    return sections.map(section => {
      const lines = section.split('\n');
      const title = lines[0].trim();
      const bullets = lines.slice(1).filter(l => l.trim().startsWith('-'));
      return { title, bullets };
    });
  };

  const handleOpenBullets = async () => {
    setBulletsOpen(true);
    setBulletsLoading(true);
    setBulletsError('');
    try {
      const positionsOrder = [
        'Primeiro Ministro', 'Líder da Oposição',
        'Vice-Primeiro Ministro', 'Vice-Líder da Oposição',
        'Membro do Governo', 'Membro da Oposição',
        'Whip do Governo', 'Whip da Oposição'
      ];
      const idx = positionsOrder.indexOf(motion.position);
      if (idx === 0) {
        // Não há discursos anteriores para PM
        setBulletsText('### Aviso\n- Você fala primeiro nesta moção; não há discursos anteriores.');
        setBulletsLoading(false);
        return;
      }
      const cacheKey = `${motion.position}::${motion.text}::${motion.infoslide || ''}`;
      if (bulletsCache[cacheKey]) {
        setBulletsText(bulletsCache[cacheKey]);
        setBulletsLoading(false);
        return;
      }
      const response = await fetch('/api/generateBullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motion: motion.text, infoslide: motion.infoslide, position: motion.position })
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.error || 'Falha ao gerar bullets.'); }
      setBulletsText(data.bullets);
      setBulletsCache(prev => ({ ...prev, [cacheKey]: data.bullets }));
    } catch (e) {
      setBulletsError('Não foi possível gerar os bullet points. Tente novamente.');
    } finally {
      setBulletsLoading(false);
    }
  };

  const handleCloseBullets = () => {
    setBulletsOpen(false);
  };

  const renderStep = () => {
    switch(step) {
      case 'welcome':
        return (
          <div className="step-container welcome-step">
            <h1>Treinador de Discurso com <span className="highlight">IA</span></h1>
            <p>Grave um discurso de 7 minutos e receba feedback instantâneo sobre a sua estrutura, argumentação e oratória.</p>
            {error && (
              <p className="error-message">
                Ocorreu um problema técnico.{' '}
                <a href="/#contato" className="error-link">Entre em contato</a>{' '}
                conosco através da nossa página inicial.
              </p>
            )}
            <button onClick={handleStart} className="start-button">Começar a Treinar</button>
          </div>
        );
      case 'recording':
        const progress = ((SPEECH_DURATION - timeLeft) / SPEECH_DURATION) * 100;
        const circumference = 2 * Math.PI * 90;
        const strokeDashoffset = circumference - (progress / 100) * circumference;
        const shouldPulse = timeLeft <= 60 && timeLeft > 0 && isRunning;

        return (
          <div className="training-layout">
            <div className="simulator-panel motion-panel">
              {isEditingMotion ? (
                <>
                  <div className="motion-panel-header"><h4>Editar</h4></div>
                  <div className="motion-content-wrapper">
                    <h5>Moção</h5>
                    <textarea className="motion-edit-input" value={editedMotion.text} onChange={(e) => setEditedMotion(prev => ({ ...prev, text: e.target.value }))} rows="4"/>
                    <h5>Infoslide</h5>
                    <textarea className="motion-edit-input" value={editedMotion.infoslide} onChange={(e) => setEditedMotion(prev => ({ ...prev, infoslide: e.target.value }))} rows="3"/>
                    <h5>Posição</h5>
                    <select className="motion-edit-select" value={editedMotion.position} onChange={(e) => setEditedMotion(prev => ({ ...prev, position: e.target.value }))}>
                      {allPositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                  </div>
                  <div className="motion-panel-controls">
                    <button onClick={handleSaveMotion} className="sim-button sim-button--secondary">Salvar</button>
                    <button onClick={() => setIsEditingMotion(false)} className="sim-button sim-button--cancel">Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="motion-panel-header">
                    <h4>Seu Treino</h4>
                    <div className="motion-header-buttons">
                      <button onClick={handleEditToggle} className="sim-button-icon" aria-label="Editar moção">✏️</button>
                      <button onClick={sortearMocao} className="sim-button-icon" aria-label="Sortear novamente">🎲</button>
                    </div>
                  </div>
                  <div className="motion-content-wrapper">
                    <h5>Moção</h5><p className="motion-text">{motion.text}</p>
                    <h5>Infoslide</h5><p className="infoslide-text">{motion.infoslide}</p>
                    <h5>Posição</h5><p className="position-text">{motion.position}</p>
                  </div>
                  <div className="motion-panel-bottom">
                    <button onClick={handleOpenBullets} className="sim-button sim-button--primary">Abrir bullets anteriores</button>
                  </div>
                </>
              )}
            </div>

            <div className="simulator-panel timer-panel">
              <h2 className="stage-title">Grave o seu Discurso</h2>
              <div className={`timer-display ${shouldPulse ? 'pulse' : ''}`}>
                <svg className="progress-ring" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" /></linearGradient>
                    <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" /></linearGradient>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#dc2626" /></linearGradient>
                  </defs>
                  <circle className="progress-ring__background" cx="100" cy="100" r="90" />
                  <circle className={`progress-ring__circle ${timerColor}`} cx="100" cy="100" r="90" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
                </svg>
                <div className="time-text">{formatTime(timeLeft)}</div>
              </div>
              <div className="timer-controls">
                {!isRunning && !audioBlob && (<button onClick={startRecording} className="sim-button sim-button--green">Gravar</button>)}
                {isRunning && (<button onClick={stopRecording} className="sim-button sim-button--yellow">Parar</button>)}
                {!isRunning && audioBlob && (
                  <div className="analysis-section">
                    <p className="audio-ready-message">Áudio gravado! Pronto para analisar.</p>
                    <button onClick={handleAnalysis} className="sim-button sim-button--primary">Analisar Discurso</button>
                  </div>
                )}
              </div>
               {error && (
                 <p className="error-message">
                   Ocorreu um problema técnico.{' '}
                   <a href="/#contato" className="error-link">Entre em contato</a>{' '}
                   conosco através da nossa página inicial.
                 </p>
               )}
            </div>
          </div>
        );
      case 'analyzing':
        return (
          <div className="step-container analyzing-step">
            <div className="spinner"></div>
            <h2>{loadingMessage || 'A analisar o seu discurso...'}</h2>
            <p>Isto pode levar um momento.</p>
          </div>
        );
      case 'feedback':
        return (
          <div className="step-container feedback-step">
            <h2>Feedback do seu Discurso</h2>
            <div className="feedback-grid">
              {parsedFeedback.map((section, index) => (
                <div key={index} className="feedback-card">
                  <h3>{section.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
                </div>
              ))}
            </div>
            <button onClick={reset} className="start-button">Treinar Novamente</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="treino-ia-page">
      <div className="background-lights">
        <div className="light lightsim-1"></div>
        <div className="light lightsim-2"></div>
        <div className="light lightsim-3"></div>
      </div>
      <div className="container">
        {renderStep()}
        {bulletsOpen && (
          <div className="bullets-overlay">
            <div className="bullets-card">
              <div className="bullets-header">
                <h3>Bullets dos discursos anteriores</h3>
                <button onClick={handleCloseBullets} className="sim-button sim-button--blue">Fechar</button>
              </div>
              {bulletsLoading && <p className="bullets-loading">Gerando bullet points...</p>}
              {bulletsError && <p className="error-message">{bulletsError}</p>}
              {!bulletsLoading && !bulletsError && bulletsText && (
                <div className="bullets-content">
                  {parseBullets(bulletsText).map((sec, idx) => (
                    <div key={idx} className="bullets-section">
                      <h4>{sec.title}</h4>
                      <ul>
                        {sec.bullets.map((b, i) => (
                          <li key={i}>{b.replace(/^\-\s*/, '')}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}