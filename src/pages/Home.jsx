import LambMascot from '../components/LambMascot';
import MessageCard from '../components/MessageCard';
import { messages } from '../data/content';
import { getMessageOfDay, whatsappShareUrl } from '../services/content';
export default function Home() {
  const today = getMessageOfDay();
  const featured = today ?? messages[0];
  return <>
    <section className="hero container"><div className="hero-copy"><p className="eyebrow">UM CAFÉ. UMA PALAVRA. UM NOVO COMEÇO.</p><h1>Uma pausa para o café.<br /><em>Um respiro para a fé.</em></h1><p>Entre sonhos, planos e a correria do dia, um cantinho para reconhecer a provisão de Deus, renovar a esperança e caminhar com propósito.</p><div className="button-row"><a className="button primary" href="#mensagens">Encontrar uma palavra ↗</a><a className="button outline" href="#oracoes">Fazer uma pausa para orar</a></div><div className="hero-footnote"><span aria-hidden="true">✦</span> Fé que acompanha a vida. Generosidade que transborda.</div></div>
      <div className="hero-art"><span className="art-caption">DEVAGAR TAMBÉM É CAMINHO.</span><div className="arch"><LambMascot /><p>Já tomou seu café<br />e agradeceu por hoje?</p><span className="arch-star star-one">✦</span><span className="arch-star star-two">✧</span></div><span className="art-bottom">SEJA BEM-VINDO AO NOSSO CANTINHO</span></div>
    </section>
    <div className="values-strip"><span>Fé para acreditar</span><i>✦</i><span>Sabedoria para avançar</span><i>✦</i><span>Generosidade para compartilhar</span></div>
    <section className="container section"><div className="section-top"><div><p className="eyebrow">SUA PAUSA DE HOJE</p><h2>{today ? 'A mensagem do dia' : 'Uma palavra para sua pausa'}</h2></div><a className="text-link" href="#mensagens">Todas as mensagens ↗</a></div><div className="daily-card"><div className="daily-decoration" aria-hidden="true">☀<small>FÉ & GRATIDÃO</small></div><div><span className="pill">{today ? 'Publicada hoje' : 'Seleção de demonstração'}</span><blockquote>{featured.text}</blockquote><a className="text-link" href={whatsappShareUrl(featured)} target="_blank" rel="noopener noreferrer">Levar esta palavra para alguém ↗</a></div></div></section>
    <section className="container section compact"><div className="section-top"><div><p className="eyebrow">PEQUENOS ENCONTROS COM DEUS</p><h2>Uma palavra pode aquecer o dia.</h2></div></div><div className="message-grid">{messages.slice(1, 4).map(message => <MessageCard key={message.id} message={message} />)}</div></section>
    <section className="container section"><div className="support-banner"><div><p className="eyebrow">MANTENHA O CAFÉ PASSANDO</p><h2>Se este cantinho faz bem,<br />ajude a mantê-lo no ar.</h2><p>Presentes e experiências para levar fé à rotina e apoiar a continuidade do Café com Louvor.</p><a className="button primary" href="#lojinha">Conhecer a lojinha ↗</a></div><span className="support-symbol" aria-hidden="true">♡</span></div></section>
  </>;
}
