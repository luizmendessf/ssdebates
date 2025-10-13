import workshop from '/assets/imagens/workshop.png'
import comunidade from '/assets/imagens/ssdCMDLP.png'
import comunidadeA from '/assets/imagens/Comunidade2.png'
import comunidadeB from '/assets/imagens/comunidade3.png'
import torneio1 from '/assets/imagens/torneio1.jpeg'
import torneio2 from '/assets/imagens/torneio2.png'
import torneio3 from '/assets/imagens/torneio3.png'
import torneio4 from '/assets/imagens/torneio4.png'

export const OQueFazemos = {
    workshops: {
        img: workshop,
        title: 'Workshops',
        description: 
        'A cada quinze dias, promovemos workshops online com grandes nomes do debate e da oratória no Brasil. São encontros interativos e gratuitos voltados para quem deseja desenvolver habilidades essenciais como argumentação, retórica e comunicação estratégica. Se você quer aprender com quem é referência e evoluir em um ambiente acolhedor e dinâmico, nossos workshops são o lugar ideal para começar.'
    },

    torneios: {
        img: torneio1,
        images: [torneio1, torneio2, torneio3, torneio4],
        title: ' Torneios',
        description: 'A SSD marca presença nos maiores torneios de debate do Brasil e do mundo, conquistando resultados expressivos e promovendo vivências inesquecíveis. Acreditamos que competir é uma oportunidade de aprendizado intenso, troca de experiências e construção de repertório. Ao participar dos torneios, nossos membros crescem como debatedores e como pessoas, ganhando confiança, visão crítica e espírito de equipe.'
    },

    comunidade: {
        img : comunidade,
        images: [comunidade, comunidadeA, comunidadeB],
        title: 'Comunidade',
        description: 'Mais do que uma equipe de debates, somos uma comunidade viva, diversa e acolhedora. Reunimos pessoas de diferentes realidades unidas pelo desejo de dialogar, transformar e se conectar. Nossos espaços promovem trocas que geram amizades, parcerias, oportunidades acadêmicas e profissionais. Aqui, você encontra uma rede que valoriza quem você é e apoia quem você quer se tornar.',
        objectPosition: '50% 33%'
    }
}

