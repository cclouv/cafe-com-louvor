const KEY = 'cafe-prayer-demo-v1';
export const DAY = 24 * 60 * 60 * 1000;
export const themes = ['Gratidão', 'Recomeços', 'Família', 'Paz', 'Esperança', 'Livre'];
let memory;
const listeners = new Set();
function seed() {
  const now = Date.now();
  return [
    ['Ana', 'Esperança', 'Você não precisa resolver tudo hoje. Que Jesus renove suas forças para o próximo passo.'],
    ['', 'Gratidão', 'Obrigada, Deus, pelos pequenos cuidados que às vezes passam despercebidos.'],
    ['Lucas', 'Paz', 'Que a paz de Cristo encontre espaço na sua casa e no seu coração.'],
    ['Maria', 'Recomeços', 'Um novo começo também pode ser pequeno. Caminhe com fé.'],
  ].map(([name, theme, message], i) => ({ id: `example-${i}`, name, theme, message, payment: 'confirmed', moderation: 'approved', approvedAt: now - (i + 1) * 600000, example: true }));
}
export function getSnapshot() {
  if (!memory) {
    try { const data = JSON.parse(localStorage.getItem(KEY)); memory = Array.isArray(data) ? data : seed(); } catch { memory = seed(); }
  }
  return memory;
}
function save(items) {
  memory = items;
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* Session-only fallback. */ }
  listeners.forEach(fn => fn());
}
export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
if (typeof window !== 'undefined') window.addEventListener('storage', event => { if (event.key === KEY) { memory = undefined; listeners.forEach(fn => fn()); } });
export function submitNote(note) {
  const id = crypto.randomUUID();
  save([{ ...note, id, payment: 'processing', moderation: 'pending', createdAt: Date.now() }, ...getSnapshot()]);
  return id;
}
export function confirmPayment(id, success = true) {
  save(getSnapshot().map(item => item.id === id && item.payment === 'processing' ? { ...item, payment: success ? 'confirmed' : 'failed' } : item));
}
export function moderate(id, action, reason = '') {
  save(getSnapshot().map(item => {
    if (item.id !== id) return item;
    if (action === 'approved' && (item.payment !== 'confirmed' || item.moderation !== 'pending')) return item;
    return { ...item, moderation: action, reason: reason.trim(), ...(action === 'approved' ? { approvedAt: Date.now() } : {}), ...(action === 'rejected' ? { refund: 'simulated' } : {}) };
  }));
}
export function visibleNotes(items, now = Date.now()) {
  return items.filter(item => item.payment === 'confirmed' && item.moderation === 'approved' && item.approvedAt <= now && now - item.approvedAt < DAY).sort((a, b) => b.approvedAt - a.approvedAt);
}
export function resetDemo(empty = false) { save(empty ? [] : seed()); }
