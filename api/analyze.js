export default async function handler(req, res) {
  // Garante que a requisição seja um POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // 1. Pega os dados enviados pelo seu frontend
    const { audio_base64, motion, position } = req.body;
    
    // Pega as chaves secretas que você configurou na Vercel/Netlify
    const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Converte o áudio de Base64 para um formato que a API do AssemblyAI entende
    const audioBuffer = Buffer.from(audio_base64, 'base64');

    // --- LÓGICA DE TRANSCRIÇÃO (no servidor) ---
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLYAI_API_KEY,
        'content-type': 'application/octet-stream'
      },
      body: audioBuffer
    });
    const uploadData = await uploadResponse.json();
    
    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: { 'authorization': ASSEMBLYAI_API_KEY, 'content-type': 'application/json' },
      body: JSON.stringify({ audio_url: uploadData.upload_url, language_code: 'pt' })
    });
    const transcriptData = await transcriptResponse.json();
    const transcriptId = transcriptData.id;

    let transcriptText = '';
    while (true) {
      const pollResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: { 'authorization': ASSEMBLYAI_API_KEY }
      });
      const pollData = await pollResponse.json();
      if (pollData.status === 'completed') { transcriptText = pollData.text; break; }
      if (pollData.status === 'failed') { throw new Error(`A transcrição falhou: ${pollData.error}`); }
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    if (!transcriptText || transcriptText.trim() === '') {
      throw new Error('A transcrição retornou um texto vazio.');
    }

    // --- LÓGICA DE ANÁLISE (no servidor) ---
    const geminiPrompt = `Você é um juiz experiente de debates no formato British Parliamentary. Analise o seguinte discurso, que foi feito para a moção "${motion}" na posição "${position}". O texto do discurso é: "${transcriptText}". Forneça um feedback estruturado e detalhado, em português, com as seções em markdown: ### 🧠 Estrutura e Lógica, ### ✨ Força dos Argumentos, ### 🎙️ Oratória e Clareza, ### 🎯 Cumprimento do Papel, ### 💡 Sugestões de Melhoria, e ### 🏆 Nota Geral.`;
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: geminiPrompt }] }] })
    });

    if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json();
        throw new Error(`A análise da IA falhou: ${errorData.error.message}`);
    }

    const geminiData = await geminiResponse.json();
    const feedbackText = geminiData.candidates[0].content.parts[0].text;
    
    // 4. Envia o feedback de volta para o frontend
    res.status(200).json({ feedback: feedbackText });

  } catch (error) {
    console.error("Erro no backend:", error.message);
    res.status(500).json({ error: error.message });
  }
}