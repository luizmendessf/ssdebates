// api/analyze.js

export default async function handler(req, res) {
  // --- PASSO DE DEPURAÇÃO ---
  // A linha abaixo irá mostrar no terminal do backend exatamente o que ele está a receber.
  console.log("Backend recebeu o seguinte corpo (body):", req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { audio_base_64, motion, infoslide, position } = req.body;

    // --- VERIFICAÇÃO ADICIONAL ---
    if (!audio_base_64) {
      console.error("Erro: 'audio_base_64' não foi encontrado no corpo da requisição.");
      return res.status(400).json({ error: "Dados de áudio não recebidos pelo servidor." });
    }

    const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const audioBuffer = Buffer.from(audio_base_64, 'base64');

    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: { 'authorization': ASSEMBLYAI_API_KEY, 'content-type': 'application/octet-stream' },
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

    const geminiPrompt = `Aja EXCLUSIVAMENTE como um juiz de debates BP. Analise o discurso abaixo para a moção "${motion}" na posição "${position}". O discurso é: "${transcriptText}". Comece sua resposta IMEDIATAMENTE com a primeira seção de feedback, sem nenhuma introdução. Forneça um feedback estruturado com as seguintes seções em markdown: ### 🧠 Estrutura e Lógica, ### ✨ Força dos Argumentos, ### 🎙️ Oratória e Clareza, ### 🎯 Cumprimento do Papel, ### 💡 Sugestões de Melhoria, e ### 🏆 Nota Geral.`;
    
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
    
    res.status(200).json({ feedback: feedbackText });

  } catch (error) {
    console.error("Erro no backend:", error.message);
    res.status(500).json({ error: error.message });
  }
}