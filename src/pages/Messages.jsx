import { useState } from 'react';
import { PageHeading } from '../components/Layout';
import MessageCard from '../components/MessageCard';
import { messages } from '../data/content';
import { getMessageOfDay } from '../services/content';
export default function Messages() {
  const [filter, setFilter] = useState('Todas');
  const today = getMessageOfDay();
  const categories = ['Todas', ...new Set(messages.map(message => message.category))];
  return <section className="container section"><PageHeading eyebrow="PALAVRAS PARA LEVAR COM VOCÊ" title="Compartilhe um pouco de esperança.">Uma mensagem para cada pausa, cada recomeço e cada pessoa que vem ao coração.</PageHeading>
    {today ? <div className="today-feature"><h2>Mensagem do dia</h2><MessageCard message={today} /></div> : <p className="notice">Este é um acervo de exemplo. Após conectar o Instagram, a publicação de hoje aparecerá em destaque aqui.</p>}
    <div className="filters" aria-label="Filtrar mensagens">{categories.map(category => <button key={category} className={filter === category ? 'selected' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
    <div className="message-grid">{messages.filter(message => filter === 'Todas' || message.category === filter).map(message => <MessageCard key={message.id} message={message} />)}</div>
  </section>;
}
