import PortfolioGrid from './PortfolioGrid';
import './portfolio.css';

const WHATSAPP =
  'https://wa.me/5534936180691?text=' +
  encodeURIComponent(
    'Oi Léo! Vim pelo seu portfólio e gostaria de construir o site da minha empresa com você.'
  );

export default function PortfolioPage() {
  return (
    <main className="pf-page">
      <div className="pf-shell">
        <nav className="pf-nav">
          <a className="pf-brand" href="/">
            Leonardo Ferreira
          </a>
          <a className="pf-back" href="/">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar ao site
          </a>
        </nav>

        <header className="pf-hero">
          <h1 className="pf-title">
            Sites que eu <em>desenhei e construí</em>.
          </h1>
          <p className="pf-sub">
            Cada projeto aqui está no ar, funcionando e gerando resultado para quem confiou no
            trabalho. Clique em qualquer um para abrir o site de verdade, não uma imagem de
            apresentação.
          </p>
        </header>

        <PortfolioGrid />

        <section className="pf-cta">
          <div className="pf-cta-inner">
            <h2>
              Construa o seu site <em>comigo</em>.
            </h2>
            <p>
              Me conta em uma mensagem o que a sua empresa faz, e eu te digo exatamente como o seu
              site pode ficar. Sem compromisso.
            </p>
            <a className="pf-wa" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M.05 24l1.7-6.2A11.9 11.9 0 0 1 12 0a11.9 11.9 0 0 1 8.4 20.3A11.9 11.9 0 0 1 6.3 22.3zM6.7 20l.4.2a9.9 9.9 0 0 0 5 1.4 9.9 9.9 0 1 0-9.9-9.9c0 1.8.5 3.6 1.4 5.1l.3.4-1 3.6zM17.5 14.3c-.1-.2-.5-.4-1-.6s-1.5-.7-1.7-.8-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.4.1-.6l.4-.5.3-.5v-.5L8 6.6c-.2-.4-.3-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2c0 1.3 1 2.6 1.1 2.8s1.9 2.9 4.6 4a16 16 0 0 0 1.5.6c.6.2 1.2.2 1.7.1.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2z" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </section>

        <footer className="pf-foot">
          <span>© {new Date().getFullYear()} Leonardo Ferreira</span>
          <a href="/">leonardoferreirr.com.br</a>
        </footer>
      </div>
    </main>
  );
}
