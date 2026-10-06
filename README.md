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
