import { useState } from 'react';
import { navigation } from '../data/content';
export function Header({ page }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner">
    <a className="brand" href="#inicio" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">☕</span><span>Café com Louvor<small>FÉ PARA O COTIDIANO</small></span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Fechar ✕' : 'Menu ☰'}</button>
    <nav id="main-nav" className={open ? 'open' : ''} aria-label="Navegação principal">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={page === id ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>)}</nav>
  </div></header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><div><a className="footer-brand" href="#inicio">Café com Louvor</a><p>Fé para sonhar. Sabedoria para construir.<br />Gratidão para reconhecer. Generosidade para compartilhar.</p></div><div className="footer-links">{navigation.slice(1).map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><p className="footer-note">Sirva o café.<br />Abra espaço para a fé.<br />Respire fundo.</p></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Café com Louvor</span><span>Feito com fé, café e propósito.</span></div></footer>;
}
export function PageHeading({ eyebrow, title, children }) {
  return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <p className="intro">{children}</p>}</div>;
}
