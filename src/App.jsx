import { useEffect, useRef, useState } from 'react';
import { Header, Footer } from './components/Layout';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Faith from './pages/Faith';
import Prayers from './pages/Prayers';
import Worship from './pages/Worship';
import Shop from './pages/Shop';
import CafePrayer from './features/cafe-prayer/CafePrayer';
const pages = { inicio: Home, mensagens: Messages, fe: Faith, oracoes: Prayers, louvores: Worship, lojinha: Shop };
function readPage() { const id = window.location.hash.slice(1); return Object.hasOwn(pages, id) ? id : 'inicio'; }
export default function App() {
  const [page, setPage] = useState(readPage);
  const [cafeExpanded, setCafeExpanded] = useState(true);
  const main = useRef(null);
  useEffect(() => {
    const onHashChange = () => { setPage(readPage()); window.scrollTo({ top: 0, behavior: 'instant' }); main.current?.focus(); };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const Page = pages[page];
  return <div className={page === 'inicio' && cafeExpanded ? 'has-cafe-prayer' : undefined}><a className="skip-link" href="#content" onClick={event => { event.preventDefault(); main.current?.focus(); main.current?.scrollIntoView(); }}>Pular para o conteúdo</a><Header page={page} />{page === 'inicio' && <CafePrayer expanded={cafeExpanded} onExpandedChange={setCafeExpanded} />}<main id="content" ref={main} tabIndex={-1}><Page /></main><Footer /></div>;
}
