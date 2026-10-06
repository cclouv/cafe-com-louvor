export const navigation = [
  ['inicio', 'Início'], ['mensagens', 'Mensagens'], ['fe', 'Nossa fé'],
  ['oracoes', 'Orações'], ['louvores', 'Louvores'], ['lojinha', 'Lojinha'],
];

// Exemplos editoriais. A integração futura deve preencher publishedAt, imageUrl e permalink.
export const messages = [
  { id: 'gratidao', category: 'Gratidão', period: 'Bom dia', tone: 'sage', text: 'Antes do primeiro café, um motivo para agradecer. Há beleza nas pequenas provisões de cada dia.', publishedAt: null, imageUrl: null, permalink: null },
  { id: 'proposito', category: 'Propósito', period: 'Bom dia', tone: 'clay', text: 'Que a fé encontre seus planos, a sabedoria conduza seus passos e a generosidade acompanhe suas conquistas.', publishedAt: null, imageUrl: null, permalink: null },
  { id: 'esperanca', category: 'Esperança', period: 'Boa tarde', tone: 'sand', text: 'Ainda há tempo para recomeçar. Respire, entregue suas preocupações a Deus e dê o próximo passo possível.', publishedAt: null, imageUrl: null, permalink: null },
  { id: 'descanso', category: 'Esperança', period: 'Boa noite', tone: 'dark', text: 'Nem tudo precisa ser resolvido hoje. Descanse com gratidão e permita que o amanhã chegue no seu tempo.', publishedAt: null, imageUrl: null, permalink: null },
  { id: 'provisao', category: 'Prosperidade', period: 'Bom dia', tone: 'sand', text: 'Que não faltem direção para construir, sabedoria para administrar e um coração disposto a repartir.', publishedAt: null, imageUrl: null, permalink: null },
  { id: 'familia', category: 'Família', period: 'Boa tarde', tone: 'sage', text: 'Que o amor se transforme em presença, a escuta em cuidado e sua casa em um lugar de paz.', publishedAt: null, imageUrl: null, permalink: null },
];

export const prayers = [
  { id: 'manha', theme: 'Manhã', title: 'Para começar com gratidão', text: 'Senhor, obrigada por este novo dia. Abre meus olhos para as pequenas bênçãos e guia minhas escolhas com sabedoria. Que meu trabalho tenha propósito, minhas palavras ofereçam cuidado e meu coração encontre espaço para agradecer. Amém.' },
  { id: 'provisao', theme: 'Prosperidade', title: 'Sabedoria para crescer e repartir', text: 'Deus, coloco diante de Ti meus projetos e necessidades. Dá-me discernimento para reconhecer oportunidades, perseverança para trabalhar e responsabilidade para administrar meus recursos. Que o crescimento venha acompanhado de gratidão e que minhas conquistas também possam servir a outras pessoas. Amém.' },
  { id: 'familia', theme: 'Família', title: 'Pela paz dentro de casa', text: 'Senhor, cuida da nossa família. Ensina-nos a ouvir com paciência, a pedir perdão e a oferecer presença. Dá-nos sabedoria diante das dificuldades e coragem para cuidar uns dos outros. Que nosso lar seja um lugar de acolhimento, respeito e amor. Amém.' },
  { id: 'noite', theme: 'Noite', title: 'Entregar o dia e descansar', text: 'Pai, entrego a Ti o que consegui fazer e o que ficou pelo caminho. Acalma meus pensamentos e ajuda-me a descansar. Obrigada pelo cuidado que recebi hoje. Que o novo dia me encontre com esperança e disposição para recomeçar. Amém.' },
];

export const products = [
  { id: 'cartao', category: 'Serviços digitais', title: 'Uma mensagem com nome e carinho', description: 'Cartão virtual com dedicatória, para celebrar um aniversário, uma conquista ou um novo começo.', symbol: '♡', tag: 'Personalizado' },
  { id: 'devocional', category: 'Digitais', title: '30 pausas de fé e propósito', description: 'E-book devocional para acompanhar sua rotina com reflexões, gratidão e pequenos passos.', symbol: '✦', tag: 'E-book' },
  { id: 'infantil', category: 'Digitais', title: 'Pequenas histórias, grandes cores', description: 'Atividades e desenhos com histórias bíblicas para imprimir e colorir em família.', symbol: '☀', tag: 'Para os pequenos' },
  { id: 'audio', category: 'Serviços digitais', title: 'Uma pausa para ouvir', description: 'Áudio devocional personalizado por tema, com mensagem e dedicatória.', symbol: '♫', tag: 'Áudio' },
  { id: 'caneca', category: 'Físicos', title: 'Seu café com uma dose de fé', description: 'A caneca da casa para acompanhar os encontros, as leituras e os pequenos recomeços.', symbol: '☕', tag: 'Caneca' },
  { id: 'ecobag', category: 'Físicos', title: 'Leve o que faz bem', description: 'Ecobag Café com Louvor, para carregar suas coisas e uma mensagem de esperança.', symbol: '✿', tag: 'Ecobag' },
];
