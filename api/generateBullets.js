// api/generateBullets.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { motion, infoslide, position } = req.body || {};

    if (!motion || !position) {
      return res.status(400).json({ error: 'Parâmetros insuficientes: motion e position são obrigatórios.' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Ordem típica de discursos no BP, em PT conforme usado no frontend
    const positionsOrder = [
      'Primeiro Ministro', 'Líder da Oposição',
      'Vice-Primeiro Ministro', 'Vice-Líder da Oposição',
      'Membro do Governo', 'Membro da Oposição',
      'Whip do Governo', 'Whip da Oposição'
    ];

    const idx = positionsOrder.indexOf(position);
    const preceding = idx > 0 ? positionsOrder.slice(0, idx) : [];

    // Se não encontrar a posição, gerar todos os papéis exceto o usuário
    const rolesForBullets = preceding.length > 0 ? preceding : positionsOrder.filter((p) => p !== position);

    const rolesStr = rolesForBullets.join(', ');
    const prompt = `Você é um treinador de debates BP. Com base na moção: "${motion}"${infoslide ? ` com infoslide: "${infoslide}"` : ''}, e sabendo que o usuário falará na posição "${position}", gere bullet points concisos para TODOS os discursos anteriores do usuário, nos papéis: ${rolesStr}.

OBJETIVO: produzir conteúdo que permita ao usuário contra-argumentar com consciência do que foi dito e como foi comparado, com concretude acionável.

REGRAS DE FORMATAÇÃO:
- Responda EXCLUSIVAMENTE em seções markdown, uma por papel, iniciando cada seção com: ### <Papel>.
- Em cada seção, liste 4 a 6 bullet points iniciados por "- ".
- Escreva cada bullet COMO SE O ORADOR ESTIVESSE FALANDO: voz ativa, no presente, sem linguagem de instrução (ex.: "Eu/Nós defendemos...", "Contesto...").

CONTEÚDO OBRIGATÓRIO EM CADA PAPEL:
- Tese principal e mecanismo com impactos claros.
- Custos, riscos e benefícios com ordem de grandeza quando possível (ex.: % do PIB, pontos percentuais, exemplos de países/estudos).
- Mecanismos de financiamento ou execução e trade-offs explícitos.
- Refutação direcionada aos discursos anteriores relevantes, citando o papel pelo nome (ex.: "Respondo ao Líder da Oposição...").
- Comparação direta com o papel do MESMO BANCO imediatamente anterior quando existir (ex.: "Minha extensão supera o Primeiro Ministro porque...").
- Métrica de julgamento explícita (ex.: bem-estar líquido, liberdade negativa, sustentabilidade fiscal) e como ela favorece este papel após as comparações.
- Orientação de debate: indique onde o usuário pode atacar/defender e como pesar comparações.

ADAPTAÇÃO AO LADO DO USUÁRIO:
- Se o usuário é do governo, enfatize como os papéis de oposição pressionam e onde comparam contra o governo.
- Se o usuário é da oposição, enfatize como os papéis de governo estabelecem burdens, framing e comparam contra a oposição.

- Não inclua introduções, comentários fora dos bullets, explicações de formato ou texto adicional.`;

    if (!GEMINI_API_KEY) {
      // Fallback de desenvolvimento: gerar conteúdo específico por moção para facilitar contra-argumentação
      const m = (motion || '').toLowerCase();
      const topic = (() => {
        if (m.includes('publicidade direcionada') || m.includes('dados pessoais')) return 'ads';
        if (m.includes('renda básica') || m.includes('universal')) return 'ubi';
        if (m.includes('voto') && (m.includes('obrigat') || m.includes('compuls'))) return 'mandatory_vote';
        if (m.includes('exploração espacial') || m.includes('espacial privada')) return 'private_space';
        return 'generic';
      })();

      const detailsByTopic = {
        ads: {
          burdensGov: [
            'provo danos significativos da publicidade baseada em perfilamento de dados pessoais',
            'mostro que a proibição é exequível e superior à regulação branda',
            'demonstro que benefícios econômicos não superam perdas de privacidade'
          ],
          framingGov: 'privacidade e dignidade do usuário > eficiência de mercado e receita publicitária',
          govArgs: [
            'perfilamento amplia manipulação comportamental de grupos vulneráveis',
            'coleta massiva de dados cria risco de discriminação e vazamentos',
            'proibição reduz incentivos ao rastreamento invasivo'
          ],
          govImpacts: [
            'proteção de menores e redução de vícios e compras compulsivas',
            'mitigação de discriminação algorítmica e assédio direcionado',
            'maior confiança no ecossistema digital'
          ],
          oppArgs: [
            'regulação branda e consentimento informado mitigam danos sem banir',
            'banimento reduz receita de pequenos negócios e encarece serviços gratuitos',
            'publicidade não é principal causa de manipulação; educação digital é melhor'
          ],
          oppImpacts: [
            'queda na eficiência de marketing e custos repassados ao consumidor',
            'redução de pluralidade de conteúdo gratuito financiado por anúncios',
            'melhoras de privacidade alcançáveis sem proibição total'
          ]
        },
        ubi: {
          burdensGov: [
            'provo financiabilidade com reforma tributária e eliminação de subsídios ineficientes',
            'apresento ordem de grandeza de custo e o plano de financiamento',
            'demonstro redução de pobreza e insegurança econômica ampla'
          ],
          framingGov: 'dignidade e segurança econômica > riscos de desincentivo marginal ao trabalho',
          govArgs: [
            'UBI corrige falhas de focalização e cobertura dos programas atuais',
            'UBI incentiva empreendedorismo e transições de carreira',
            'UBI simplifica o welfare e reduz custos administrativos'
          ],
          govImpacts: [
            'queda da pobreza extrema e da desigualdade',
            'aumento de criação de pequenos negócios e inovação',
            'melhor experiência cidadã e redução de fraudes'
          ],
          govCosts: [
            'UBI modesta pode custar ~5–10% do PIB dependendo do valor e cobertura',
            'custos administrativos caem com consolidação de programas e pagamentos automatizados'
          ],
          govFunding: [
            'reforma do IR progressivo e tributação sobre grandes fortunas',
            'ajuste de IVA/consumo em +1–2 p.p. com compensação para baixa renda',
            'eliminação de subsídios regressivos e renúncias fiscais ineficientes'
          ],
          govExamples: [
            'Dividendos do Alasca mostram viabilidade de transferências universais financiadas por recursos',
            'pilotos na Finlândia indicam melhora de bem-estar sem grandes quedas de emprego'
          ],
          oppArgs: [
            'custo fiscal é insustentável e crowd-out de serviços essenciais',
            'efeitos de desincentivo ao trabalho e pressão inflacionária',
            'programas focalizados são superiores em custo-benefício'
          ],
          oppImpacts: [
            'risco de cortes em saúde/educação para financiar UBI',
            'redução de força de trabalho e produtividade',
            'uso ineficiente de recursos em quem não precisa'
          ],
          oppRisksNum: [
            'queda da oferta de trabalho em 1–3% em alguns grupos',
            'pressão inflacionária localizada (aluguéis/serviços) sem controle de oferta'
          ],
          oppAlternatives: [
            'imposto de renda negativo/transferências focalizadas com cadastro robusto',
            'crédito tributário ao trabalho (EITC) e serviços públicos direcionados'
          ]
        },
        mandatory_vote: {
          burdensGov: [
            'provo que a obrigatoriedade aumenta participação e representatividade',
            'demonstro que custos são baixos e enforcement é proporcional',
            'mostro queda de desigualdades de participação'
          ],
          framingGov: 'legitimidade democrática e igualdade política > desconforto individual leve',
          govArgs: [
            'participação universal reduz captura por minorias mobilizadas',
            'multas simbólicas/alternativas de justificativa são proporcionais',
            'educação cívica vinculada ao sistema melhora qualidade do voto'
          ],
          govImpacts: [
            'maior legitimidade de governos e políticas públicas',
            'redução de polarização extrema e governança mais estável',
            'igualdade na influência política de grupos pobres'
          ],
          oppArgs: [
            'liberdade negativa inclui direito de não votar',
            'voto desinformado diminui qualidade da decisão coletiva',
            'mecanismos voluntários e incentivos são preferíveis'
          ],
          oppImpacts: [
            'risco de penalizar os mais vulneráveis por não votar',
            'mais votos de baixa informação e possíveis erros coletivos',
            'tensões sociais por coerção estatal'
          ]
        },
        private_space: {
          burdensGov: [
            'provo que malefícios privados superam benefícios líquidos',
            'demonstro externalidades e riscos regulatórios e ambientais',
            'mostro captura regulatória e uso predatório de recursos públicos'
          ],
          framingGov: 'responsabilidade pública e prevenção de riscos > corrida tecnológica privada sem accountability',
          govArgs: [
            'externalidades ambientais e lixo espacial sem internalização de custos',
            'priorização de agendas privadas acima do interesse público',
            'riscos de monopólio de infraestrutura crítica espacial'
          ],
          govImpacts: [
            'danos ambientais duradouros e risco a satélites vitais',
            'desvio de recursos de pesquisa pública',
            'dependência estratégica de corporações em infraestrutura vital'
          ],
          oppArgs: [
            'inovação privada acelera progresso e reduz custos',
            'parcerias público-privadas podem mitigar externalidades',
            'benefícios econômicos e científicos superam riscos com regulação'
          ],
          oppImpacts: [
            'ciclo virtuoso de inovação e empregos qualificados',
            'descobertas científicas e aplicações civis',
            'redução de custos e democratização do acesso'
          ]
        },
        generic: {
          burdensGov: [
            'provo que os benefícios líquidos superam os custos materiais e morais',
            'demonstro exequibilidade e superioridade frente a alternativas',
            'alinho métrica de julgamento com nossos impactos principais'
          ],
          framingGov: 'utilidade líquida com ênfase em proteção de direitos e riscos',
          govArgs: [
            'mecanismo gera ganhos diretos e evita danos significativos',
            'modelo é simples de implementar e sustentável',
            'comparações mostram superioridade frente a status quo e alternativas'
          ],
          govImpacts: [
            'melhoras materiais mensuráveis',
            'redução de riscos sistêmicos',
            'fortalecimento de direitos e confiança institucional'
          ],
          oppArgs: [
            'custos e riscos são maiores que ganhos alegados',
            'implementação falha e efeitos perversos',
            'alternativas direcionadas são superiores'
          ],
          oppImpacts: [
            'danos colaterais e ineficiências',
            'risco de retrocessos',
            'uso melhor de recursos em soluções alternativas'
          ]
        }
      };

      const D = detailsByTopic[topic];

      const byRole = {
        'Primeiro Ministro': [
          `- Burdens: ${D.burdensGov.join('; ')}.`,
          `- Framing: ${D.framingGov}.`,
          `- Argumento 1: ${D.govArgs[0]} (impactos: ${D.govImpacts[0]}).`,
          `- Argumento 2: ${D.govArgs[1]} (impactos: ${D.govImpacts[1]}).`,
          `- Antecipação: a LO dirá que ${D.oppArgs[0]}; respondo mostrando que ${D.govArgs[0]} é mais determinante.`
        ],
        'Líder da Oposição': [
          `- Reoriento burdens: foco em custos e alternativas; governo falha em ${D.burdensGov[1]}.`,
          `- Refuto PM: sobre "${D.govArgs[0]}", argumento que ${D.oppArgs[0]} com impactos de ${D.oppImpacts[0]}.`,
          `- Refuto PM: "${D.govArgs[1]}" gera ${D.oppImpacts[1]} mais plausíveis.`,
          `- Métrica: priorizo ${topic==='mandatory_vote' ? 'liberdade negativa e qualidade da decisão' : 'liberdade/eficiência'}; governo perde na comparação.`
        ],
        'Vice-Primeiro Ministro': [
          `- Organizo mecanismo e comparo com LO, mostrando que ${D.govArgs[0]} domina.`,
          `- Respondo LO em ${D.oppArgs[0]} com evidência e causalidade.`,
          `- Argumento novo: ${D.govArgs[2]} (impactos: ${D.govImpacts[2]}).`,
          `- Métrica: consolido que nossos impactos superam os custos alegados.`
        ],
        'Vice-Líder da Oposição': [
          `- Priorizo maiores impactos contra PM e VPM, especialmente ${D.govArgs[1]}.`,
          `- Caso alternativo: ${D.oppArgs[2]} com ${D.oppImpacts[2]} superiores.`,
          `- Comparo diretamente métrica do governo e mostro por que perdemos menos e ganhamos mais.`
        ],
        'Membro do Governo': [
          `- Extensão: aprofundo ${D.govArgs[0]} com novos mecanismos e evidências.`,
          `- Comparação intra-banco: minha extensão supera PM ao focar em ${D.govImpacts[0]}.`,
          `- Refuto LO/VLO: ${D.oppArgs[1]} não materializa; nossa causalidade mantém ${D.framingGov}.`,
          `- Fecho: amarro extensão à métrica e preparo terreno para Whip.`
        ],
        'Membro da Oposição': [
          `- Extensão: avanço contra PM/DPM ao explorar ${D.oppArgs[1]} com ${D.oppImpacts[1]}.`,
          `- Comparação intra-banco: minha extensão supera LO ao produzir ${D.oppImpacts[2]}.`,
          `- Refuto governo com comparações novas e específicas em ${D.govArgs[2]}.`,
          `- Prevenção: desativo prováveis respostas do VPM e Whip.`
        ],
        'Whip do Governo': [
          `- Fechamento por temas: mecanismo, liberdade/eficiência, impactos.`,
          `- Comparo diretamente PM/VPM/MG contra LO/VLO/MO e mostro vitória em ${D.govImpacts[0]}.`,
          `- Descarto material irrelevante da oposição e priorizo decisões.`,
          `- Narrativa: ${D.framingGov} decide a sala.`
        ],
        'Whip da Oposição': [
          `- Reorganizo round e enfatizo onde governo perde comparações: ${D.oppImpacts[0]}.`,
          `- Mostro que custos e riscos (LO/VLO/MO) superam ganhos do governo.`,
          `- Fecho por métrica: julgamos por ${topic==='mandatory_vote' ? 'liberdade e qualidade' : 'custos líquidos e riscos'} e vencemos.`
        ]
      };

      // Fallback específico para UBI com números e comparações
      const ubiByRole = {
        'Primeiro Ministro': [
          `- Burdens: ${D.burdensGov[0]}; ${D.burdensGov[1]} (ex.: ${D.govCosts[0]}).`,
          `- Financiamento: ${D.govFunding.join('; ')}; trade-offs explícitos e compensações à baixa renda.`,
          `- Framing: ${D.framingGov}; simplicidade reduz custos administrativos (${D.govCosts[1]}).`,
          `- Argumento 1: ${D.govArgs[0]} (impactos: ${D.govImpacts[0]}); exemplos: ${D.govExamples.join('; ')}.`,
          `- Argumento 2: ${D.govArgs[1]} (impactos: ${D.govImpacts[1]}); ordem de grandeza: aumento de transições e empreendedorismo com rede de segurança.`,
          `- Antecipação: a LO dirá ${D.oppArgs[1]}; respondo com guarda-corpos anti-inflação (calibragem de valor e faseamento) e financiamento neutro em demanda.`
        ],
        'Líder da Oposição': [
          `- Reoriento burdens: sustentabilidade fiscal e alocação eficiente; custo ~5–10% do PIB concorre com saúde/educação.`,
          `- Refuto PM (focalização): ${D.oppArgs[2]} com ${D.oppAlternatives.join('; ')} alcança ${D.govImpacts[0]} com 1/3 do custo.`,
          `- Refuto PM (trabalho/inflação): ${D.oppRisksNum.join('; ')}; riscos mais prováveis que ${D.govImpacts[1]}.`,
          `- Métrica: ${'sustentabilidade fiscal e focalização'}; governo perde na comparação quando pesamos custo por impacto.`
        ],
        'Vice-Primeiro Ministro': [
          `- Organizo mecanismo: elegibilidade universal, pagamentos digitais; comparo com LO e mostro redução de burocracia e fraudes.`,
          `- Plano de financiamento faseado: início com valor modesto; revisão periódica; proteção anti-regressividade.`,
          `- Argumento novo: ${D.govArgs[2]} (impactos: ${D.govImpacts[2]}); exemplos de simplificação e economia administrativa.`,
          `- Métrica: bem-estar líquido > custos; guardo a sala com comparações diretas contra LO.`
        ],
        'Vice-Líder da Oposição': [
          `- Caso alternativo: ${D.oppAlternatives[0]} com cadastro robusto; ${D.oppAlternatives[1]}; impactos superiores em custo-benefício.`,
          `- Prioridade de impactos: protejo saúde/educação de cortes; comparo diretamente com PM/DPM.`,
          `- Métrica: sustentabilidade fiscal e direcionamento decidem o round.`
        ],
        'Membro do Governo': [
          `- Extensão: aprofundo efeitos anti-risco e empreendedorismo com dados de pilotos; vinculo à redução de vulnerabilidade.`,
          `- Comparação intra-banco: minha extensão supera PM ao quantificar ganhos de segurança econômica em choques.`,
          `- Refuto LO/VLO: riscos de trabalho/inflação são gerenciáveis com calibragem e oferta; financiamento protege serviços essenciais.`,
          `- Fecho: amarro extensão à métrica e preparo terreno para Whip.`
        ],
        'Membro da Oposição': [
          `- Extensão: avanço contra PM/DPM ao explorar crowd-out orçamentário com exemplos de países e regras fiscais.`,
          `- Comparação intra-banco: minha extensão supera LO ao mostrar trade-offs de longo prazo e rigidez orçamentária.`,
          `- Refuto governo com comparações novas em emprego e preços; proponho alternativa escalonada focalizada.`,
          `- Prevenção: desativo respostas do VPM e Whip indicando gaps na execução.`
        ],
        'Whip do Governo': [
          `- Fechamento por temas: financiamento, execução, impactos sociais; descarto material irrelevante da oposição.`,
          `- Comparo diretamente PM/VPM/MG contra LO/VLO/MO e mostro vitória em redução de pobreza e segurança econômica.`,
          `- Narrativa: ${D.framingGov} decide a sala com guarda-corpos que mantêm sustentabilidade.`
        ],
        'Whip da Oposição': [
          `- Reorganizo o round: custo/macros vs ganhos; onde governo perde comparações materiais.`,
          `- Mostro que riscos e crowd-out superam ganhos alegados; alternativas focalizadas entregam melhor razão custo/impacto.`,
          `- Fecho por métrica: julgamos por sustentabilidade fiscal e focalização; oposição vence.`
        ]
      };

      const sections = rolesForBullets.map((role) => {
        const lines = (topic === 'ubi' ? ubiByRole[role] : byRole[role]) || [
          '- Apresento a linha principal e seus impactos com exemplos concretos.',
          '- Estruturo a comparação com papéis anteriores e respondo objeções específicas.',
          '- Concluo mostrando por que meu lado vence na métrica escolhida.'
        ];
        return `### ${role}\n${lines.join('\n')}`;
      }).join('\n\n');

      return res.status(200).json({ bullets: sections });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(errorData?.error?.message || 'Falha ao gerar bullets com a IA.');
    }

    const geminiData = await geminiResponse.json();
    const bulletsText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!bulletsText) {
      throw new Error('A IA não retornou conteúdo para os bullets.');
    }

    res.status(200).json({ bullets: bulletsText });
  } catch (error) {
    console.error('Erro em generateBullets:', error);
    res.status(500).json({ error: error.message || 'Erro interno ao gerar bullets.' });
  }
}