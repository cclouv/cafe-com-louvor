# Café com Louvor

Primeira versão do site, em React + Vite + Tailwind CSS. Layout responsivo em tons de café, creme e verde, com um cordeirinho vetorial provisório.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+.

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

O build está em `dist/`. A configuração `base: './'` permite hospedar no caminho de um repositório do GitHub Pages. As rotas usam hash e não precisam de regras de redirecionamento.

## Estrutura

- `src/pages`: Início, Mensagens, Nossa Fé, Orações, Louvores e Lojinha.
- `src/components`: layout, cards e mascote provisório.
- `src/data/content.js`: conteúdo editorial de demonstração e catálogo.
- `src/services/content.js`: seleção da mensagem do dia e compartilhamento.
- `src/styles.css`: identidade visual e estilos responsivos, com Tailwind disponível.

## Funciona nesta versão

- Navegação com links diretos e menu mobile.
- Filtros de mensagens, orações e produtos.
- Compartilhamento do texto de mensagens no WhatsApp.
- Luz simbólica gratuita com estado apenas na página, sem registro ou transmissão.
- Destaque diário preparado para uma publicação real, usando o fuso de São Paulo.

## Antes de lançar

- Conectar o Instagram por uma camada de conteúdo servida ao front-end. Nunca incluir tokens ou segredos no navegador. Definir armazenamento, sincronização, permissões e tratamento de falhas conforme a documentação atual da Meta.
- Preencher `publishedAt`, `imageUrl` e `permalink` nas mensagens reais. Sem postagem no dia, o destaque mostra uma seleção editorial e não afirma que foi publicada hoje.
- Fornecer a playlist oficial do YouTube e identificar músicas produzidas com IA.
- Escrever o testemunho real da fundadora e revisar as orações. Os textos atuais são exemplos devocionais elaborados com apoio de IA, não uma coleção de orações tradicionais.
- Definir preços, entrega e atendimento dos serviços antes de habilitar vendas. Não existe checkout nesta versão.
- Validar a identidade final do mascote e substituir os desenhos de demonstração pelos assets da marca.

Esta versão não coleta pedidos de oração, não gera conteúdos com IA em tempo real, não processa pagamentos e não possui sincronização com redes sociais. Não existe confirmação de envio fictícia.

## Café & Oração — demonstração

Na página inicial, o mural começa aberto em uma sidebar fixa à direita, abaixo do header. A partir de 850px, somente o conteúdo principal e o rodapé reservam sua largura; ao recolher, recuperam a largura total. Em telas menores, a sidebar fica sobreposta à direita, sem inserir espaço vertical. O mural tem rolagem própria. O botão de reabertura fica abaixo do header, à direita, em uma linha estável de 64px. “Deixar um café” aparece dentro do mural e abre o formulário modal. O formulário tem prévia, anonimato, temas, limite de 180 caracteres e valores simulados de R$ 5, R$ 10 ou R$ 20. Não há cobrança real.

Para testar: participe, simule confirmação (ou falha) e abra **Moderação demo**. Aprove para publicar, rejeite com motivo para simular reembolso ou remova um bilhete aprovado. A aba permite testar o mural vazio e restaurar exemplos. Dados ficam no navegador via localStorage (ou apenas na sessão quando o armazenamento está indisponível), com sincronização entre abas da mesma origem. Isso não é atualização entre visitantes nem uma área administrativa protegida.

Somente registros simulados com pagamento confirmado e aprovação aparecem. Confirmações repetidas não criam cartões duplicados; a primeira aprovação inicia as 24 horas. A expiração é verificada a cada dez segundos. A lista começa pelos mais recentes e gira em grupos de três quando necessário. A rotação pausa ao passar o mouse ou focar um cartão, tem controle explícito e não inicia com movimento reduzido.

### Antes de disponibilizar pagamentos reais

Substituir o armazenamento demo por banco e API no servidor. Autenticar administradores e autorizar todas as ações de revisão. Criar checkout com preço validado no servidor; verificar assinatura do webhook e valor/moeda/status junto ao provedor. Garantir unicidade do ID do pagamento e processamento transacional e idempotente. Não confiar em confirmações do navegador.

A aprovação deve ser transacional e definir approvedAt apenas uma vez. Entregar apenas mensagens aprovadas, pagas e não expiradas pela API pública; usar SSE ou WebSocket para aprovações e remoções, com reconexão e nova consulta do mural. Implementar reembolso real, registro de motivo e comunicação com o participante. A proposta exibida de reembolso integral por rejeição deve ser confirmada antes do lançamento. Não enviar o valor pago para o mural público.

Aplicar moderação para ofensas, publicidade, dados sensíveis e promessas de bênçãos em troca de dinheiro, além de limites de uso e registro de auditoria. A demonstração não realiza essa análise automaticamente.

O botão “Abrir mural” fica na linha abaixo do header, à direita. A linha do botão permanece estável. A sidebar está fora do fluxo; não cria lacunas verticais. O foco alterna entre os controles sem rolar a página.
