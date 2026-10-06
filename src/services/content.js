import { messages } from '../data/content.js';

export function dateInBrazil(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date(date));
}

export function getMessageOfDay(items = messages, now = new Date()) {
  const today = dateInBrazil(now);
  return items.filter(item => item.publishedAt && dateInBrazil(item.publishedAt) === today)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0] ?? null;
}

export function whatsappShareUrl(message) {
  const text = `${message.text}\n\n☕ Café com Louvor${message.permalink ? `\n${message.permalink}` : ''}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
