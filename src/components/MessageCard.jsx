import { whatsappShareUrl } from '../services/content';
export default function MessageCard({ message }) {
  return <article className="message-card">
    <div className={`message-art ${message.tone}`}>
      {message.imageUrl && <img src={message.imageUrl} alt="" loading="lazy" />}
      <span className="message-period">{message.period}</span>
      <span className="little-star" aria-hidden="true">✦</span>
      <blockquote>{message.text}</blockquote>
      <span className="art-signature">café com louvor</span>
    </div>
    <div className="message-bottom"><span>{message.category}</span><a href={whatsappShareUrl(message)} target="_blank" rel="noopener noreferrer" aria-label={`Compartilhar mensagem de ${message.category} no WhatsApp`}>Compartilhar ↗</a></div>
  </article>;
}
