import React, { useState, useEffect, useRef } from 'react';
import './TreinoIA.css';

const motions = [
  "Esta casa proibiria a publicidade direcionada com base em dados pessoais.",
  "Esta casa acredita que o direito ao voto deveria ser obrigatório.",
  "Esta casa implementaria uma renda básica universal.",
  "Esta casa acredita que a exploração espacial privada traz mais malefícios do que benefícios.",
];
const positions = ["Primeiro Ministro", "Líder da Oposição", "Vice-Primeiro Ministro", "Vice-Líder da Oposição"];

const formatFeedbackForHTML = (text) => {
  if (!text) return '';
  return text
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\n/g, '<br />');
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Remove o prefixo "data:audio/wav;base64,"
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function TreinoIA() {
  const [step, setStep] = useState('welcome');
  const [motion, setMotion] = useState({ text: '', position: '' });
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStart = () => {
    setError('');
    const randomMotion = motions[Math.floor(Math.random() * motions.length)];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    setMotion({ text: randomMotion, position: randomPosition });
    setStep('recording');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => { audioChunksRef.current.push(event.data); };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAnalysis = async () => {
    if (!audioBlob) return;
    setStep('analyzing');
    setLoadingMessage('Enviando e analisando seu discurso...');
    setError('');

    try {
      const audio_base64 = await blobToBase64(audioBlob);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio_base64,
          motion: motion.text,
          position: motion.position
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro no servidor.');
      }
      
      setFeedback(data.feedback);
      setStep('feedback');

    } catch (err) {
      setError(err.message);
      setStep('recording');
    } finally {
      setLoadingMessage('');
    }
  };
  
  const reset = () => { setStep('welcome'); setAudioBlob(null); setFeedback(''); setError(''); };

  const renderStep = () => {
    switch(step) {
      case 'welcome':
        return (
          <div className="step-container welcome-step">
            <h1>Treinador de Discurso com <span className="highlight">IA</span></h1>
            <p>Receba feedback instantâneo sobre sua estrutura, argumentação e oratória.</p>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleStart} className="start-button">Começar a Treinar</button>
          </div>
        );
      case 'recording':
        return (
          <div className="step-container recording-step">
            <div className="motion-info">
              <p><span>Moção:</span> {motion.text}</p>
              <p><span>Posição:</span> {motion.position}</p>
            </div>
            <h2>Grave seu Discurso</h2>
            <div className="recording-controls">
              {!isRecording && !audioBlob && ( <button onClick={startRecording} className="record-button start">Gravar</button> )}
              {isRecording && ( <button onClick={stopRecording} className="record-button stop">Parar</button> )}
              {audioBlob && !isRecording && ( <p className="audio-ready-message">Áudio gravado com sucesso!</p> )}
            </div>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleAnalysis} disabled={!audioBlob || isRecording} className="analyze-button">
              Analisar Discurso
            </button>
          </div>
        );
      case 'analyzing':
        return (
          <div className="step-container analyzing-step">
            <div className="spinner"></div>
            <h2>{loadingMessage || 'Analisando seu discurso...'}</h2>
            <p>Isso pode levar um momento.</p>
          </div>
        );
      case 'feedback':
        return (
          <div className="step-container feedback-step">
            <h2>Feedback do seu Discurso</h2>
            <div className="feedback-content" dangerouslySetInnerHTML={{ __html: formatFeedbackForHTML(feedback) }} />
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
      </div>
    </main>
  );
}