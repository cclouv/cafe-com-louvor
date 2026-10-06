import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { themes, getSnapshot, subscribe, submitNote, confirmPayment, moderate, visibleNotes, resetDemo } from './store';
import './cafe-prayer.css';
const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
function Note({ note, preview = false }) {
  return <article className="cp-note"><div className="cp-note-top"><span>{note.theme}</span><span aria-label="Selo de café">☕</span></div><p>{note.message || 'Sua palavra de fé vai aparecer aqui.'}</p><footer><strong>{note.name || 'Alguém da comunidade'}</strong>{!preview && <time dateTime={new Date(note.approvedAt).toISOString()}>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }).format(note.approvedAt)}</time>}</footer>{note.example && <small>Bilhete de exemplo</small>}</article>;
}
function Participation() {
  const items = useSyncExternalStore(subscribe, getSnapshot);
  const [name, setName] = useState(''); const [anonymous, setAnonymous] = useState(false);
  const [theme, setTheme] = useState(themes[0]); const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('5'); const [consent, setConsent] = useState(false);
  const [id, setId] = useState(null); const [error, setError] = useState('');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const note = items.find(item => item.id === id);
  const draft = { name: anonymous ? '' : name.trim(), theme, message: message.trim() };
  function submit(event) {
    event.preventDefault();
    if (!draft.message || (!anonymous && !draft.name) || !consent || !Number.isFinite(Number(amount)) || Number(amount) < 5) { setError('Preencha os campos e confira as condições antes de continuar.'); return; }
    setError(''); setId(submitNote({ ...draft, amount: Number(amount) }));
  }
  function simulate(success) { clearTimeout(timer.current); timer.current = setTimeout(() => confirmPayment(id, success), 900); }
  if (note) return <div className="cp-status" role="status"><h3>{note.payment === 'processing' ? 'Pagamento em andamento' : note.payment === 'failed' ? 'Falha no pagamento' : 'Pagamento confirmado'}</h3><p>Simulação. Nenhum valor foi cobrado.</p>{note.payment === 'processing' && <div className="cp-actions"><button onClick={() => simulate(true)}>Simular confirmação</button><button onClick={() => simulate(false)}>Simular falha</button></div>}{note.payment === 'confirmed' && <><p>{note.moderation === 'pending' ? 'Sua mensagem está aguardando aprovação.' : note.moderation === 'approved' ? 'Bilhete aprovado! O destaque dura 24 horas a partir da aprovação.' : note.moderation === 'rejected' ? 'Mensagem não aprovada. O reembolso foi simulado.' : 'Mensagem removida do mural.'}</p><p>Você pode testar a revisão na aba “Moderação demo”.</p></>}<button onClick={() => { clearTimeout(timer.current); setId(null); }}>{note.payment === 'failed' ? 'Tentar novamente' : 'Escrever outro bilhete'}</button></div>;
  return <form onSubmit={submit} className="cp-form">
    <label htmlFor="cp-name">Nome de exibição</label><input id="cp-name" value={name} onChange={e => setName(e.target.value)} maxLength={40} required={!anonymous} disabled={anonymous} autoComplete="nickname" />
    <label className="cp-check"><input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} /> Publicar anonimamente</label>
    <label htmlFor="cp-theme">Tema</label><select id="cp-theme" value={theme} onChange={e => setTheme(e.target.value)}>{themes.map(item => <option key={item}>{item}</option>)}</select>
    <label htmlFor="cp-message">Seu bilhetinho</label><textarea id="cp-message" rows={4} maxLength={180} required value={message} onChange={e => setMessage(e.target.value)} placeholder="Que palavra de fé você gostaria de deixar para quem passar por aqui?" aria-describedby="cp-counter cp-rules" /><span id="cp-counter">{message.length}/180 caracteres</span>
    <h3>Prévia do cartão</h3><Note note={draft} preview />
    <label htmlFor="cp-amount">Valor do café — demonstração</label><select id="cp-amount" value={amount} onChange={e => setAmount(e.target.value)}>{[5,10,20].map(value => <option key={value} value={value}>{money(value)}</option>)}</select><p>Todos os bilhetes recebem o mesmo destaque. O valor não aparece no mural.</p>
    <p id="cp-rules">Sem ofensas, publicidade, dados pessoais sensíveis ou promessas de bênçãos em troca de dinheiro.</p>
    <p>Após a revisão, seu bilhete fica em destaque por 24 horas. Se não for aprovado, a proposta desta demonstração é reembolso integral. Essa política precisa ser confirmada antes de abrir pagamentos reais.</p>
    <label className="cp-check"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} /> Li as condições. Sei que este pagamento é simulado.</label>
    {error && <p role="alert">{error}</p>}<button className="cp-primary" type="submit">Simular café de {money(Number(amount))}</button>
  </form>;
}
function Moderation({ items }) {
  const [reason, setReason] = useState('');
  const queue = items.filter(item => !item.example && item.payment === 'confirmed' && ['pending','approved'].includes(item.moderation));
  return <div className="cp-admin"><h3>Moderação demonstrativa</h3><p>Sem autenticação. Apenas dados locais simulados. Uma área real precisará de acesso protegido no servidor.</p><label htmlFor="cp-reason">Motivo da rejeição ou remoção</label><input id="cp-reason" value={reason} onChange={e => setReason(e.target.value)} maxLength={180} /><ul>{queue.map(item => <li key={item.id}><strong>{item.name || 'Alguém da comunidade'} · {item.theme}</strong><p>{item.message}</p><small>{item.moderation === 'pending' ? 'Pagamento confirmado · aguardando revisão' : 'Aprovada'}</small><div className="cp-actions">{item.moderation === 'pending' && <button onClick={() => moderate(item.id,'approved')}>Aprovar</button>}<button disabled={!reason.trim()} onClick={() => { moderate(item.id,item.moderation === 'pending' ? 'rejected' : 'removed', reason); setReason(''); }}>{item.moderation === 'pending' ? 'Rejeitar e simular reembolso' : 'Remover'}</button></div></li>)}</ul>{!queue.length && <p>Nenhuma mensagem para revisar.</p>}<div className="cp-actions"><button onClick={() => resetDemo(true)}>Testar mural vazio</button><button onClick={() => resetDemo()}>Restaurar exemplos</button></div></div>;
}
export default function CafePrayer({ expanded, onExpandedChange }) {
  const items = useSyncExternalStore(subscribe, getSnapshot);
  const [now,setNow] = useState(Date.now()); const [paused,setPaused] = useState(false); const [offset,setOffset] = useState(0);
  const [tab,setTab] = useState('wall'); const [dialogTab,setDialogTab] = useState('wall');
  const dialog = useRef(null); const mobileButton = useRef(null);
  useEffect(() => setOffset(0), [items]);
  const notes = visibleNotes(items,now); const count = notes.length;
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()),10000); return () => clearInterval(timer); },[]);
  useEffect(() => { if (paused || count <= 3 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer = setInterval(() => setOffset(value => (value + 3) % count),12000); return () => clearInterval(timer); },[paused,count]);
  const shown = count <= 3 ? notes : Array.from({length:Math.min(3,count)},(_,i) => notes[((offset % count)+i)%count]);
  function collapse() { onExpandedChange(false); requestAnimationFrame(() => mobileButton.current?.focus({ preventScroll: true })); }
  function expand() { onExpandedChange(true); requestAnimationFrame(() => document.getElementById('cp-hide')?.focus({ preventScroll: true })); }
  function open(next) { setDialogTab(next); dialog.current.showModal(); }
  function wall() { return <><button className="cp-primary" onClick={() => open('form')}>Deixar um café</button><div className="cp-wall-tools"><span>{count} {count === 1 ? 'bilhete' : 'bilhetes'} em destaque</span>{count > 3 && <button aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Retomar rotação' : 'Pausar rotação'}</button>}</div><div className="cp-notes" onFocusCapture={() => setPaused(true)} onMouseEnter={() => setPaused(true)}>{shown.map(note => <Note key={note.id} note={note} />)}{!count && <p className="cp-empty">O café está pronto. Que tal deixar a primeira mensagem de fé por aqui?</p>}</div><p className="cp-update" role="status">Atualização local simulada · {count} bilhetes disponíveis.</p></>; }
  const intro = <><span className="cp-kicker">UM BILHETE, UM RESPIRO</span><h2>Café &amp; Oração</h2><p>Uma mensagem sua pode trazer ânimo ao dia de alguém. Ofereça um café e deixe um bilhetinho de fé para a comunidade.</p><p className="cp-demo">Demonstração · nenhum pagamento real será realizado. Os bilhetes ficam neste navegador.</p></>;
  return <><div className="cp-togglebar"><button hidden={expanded} ref={mobileButton} className="cp-mobile" aria-expanded={expanded} aria-controls="cp-community-wall" onClick={expand}>☕ Abrir mural</button></div><div className="cp-reserved-zone"><aside id="cp-community-wall" hidden={!expanded} className="cp-sidebar" aria-label="Café e Oração"><button id="cp-hide" className="cp-hide" aria-label="Recolher mural Café e Oração" aria-expanded={expanded} aria-controls="cp-community-wall" onClick={collapse}>Recolher mural ✕</button><div className="cp-heading">{intro}</div><div className="cp-tabs"><button aria-pressed={tab === 'wall'} onClick={() => setTab('wall')}>Mural</button><button aria-pressed={tab === 'admin'} onClick={() => setTab('admin')}>Moderação demo</button></div><div className="cp-scroll">{tab === 'wall' ? wall() : <Moderation items={items}/>}</div></aside></div><dialog ref={dialog} className="cp-dialog" aria-labelledby="cp-dialog-title"><header><h2 id="cp-dialog-title">Café &amp; Oração</h2><button autoFocus aria-label="Fechar painel" onClick={() => dialog.current.close()}>✕</button></header><p className="cp-demo">Demonstração · nenhum pagamento real.</p><div className="cp-tabs">{[['wall','Mural'],['form','Participar'],['admin','Moderação demo']].map(([id,label]) => <button key={id} aria-pressed={dialogTab === id} onClick={() => setDialogTab(id)}>{label}</button>)}</div><div className="cp-dialog-content">{dialogTab === 'wall' ? wall() : dialogTab === 'form' ? <Participation/> : <Moderation items={items}/>}</div></dialog></>;
}
