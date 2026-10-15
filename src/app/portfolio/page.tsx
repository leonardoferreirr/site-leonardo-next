import CodeField from '@/components/CodeField';
import PortfolioGrid from './PortfolioGrid';
import './portfolio.css';

const WHATSAPP =
  'https://wa.me/5534936180691?text=' +
  encodeURIComponent(
    'Oi Léo! Vim pelo seu portfólio e gostaria de construir o site da minha empresa com você.'
  );

// Imagem vazia de 1 pixel. A caricatura aparece em um lugar no celular e em
// outro no computador; na tela em que ela fica escondida, o <picture> pega
// esta fonte e o arquivo de verdade nem é baixado.
const VAZIO = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const CELULAR = '(max-width: 860px)';
const COMPUTADOR = '(min-width: 861px)';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.05 24l1.7-6.2A11.9 11.9 0 0 1 12 0a11.9 11.9 0 0 1 8.4 20.3A11.9 11.9 0 0 1 6.3 22.3zM6.7 20l.4.2a9.9 9.9 0 0 0 5 1.4 9.9 9.9 0 1 0-9.9-9.9c0 1.8.5 3.6 1.4 5.1l.3.4-1 3.6zM17.5 14.3c-.1-.2-.5-.4-1-.6s-1.5-.7-1.7-.8-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.4.1-.6l.4-.5.3-.5v-.5L8 6.6c-.2-.4-.3-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2c0 1.3 1 2.6 1.1 2.8s1.9 2.9 4.6 4a16 16 0 0 0 1.5.6c.6.2 1.2.2 1.7.1.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2z" />
    </svg>
  );
}

export default function PortfolioPage() {
  return (
    <main className="pf-page">
      <CodeField />
      <div className="pf-shell">
        <nav className="pf-nav">
          <span className="pf-brand">Leonardo Ferreira</span>
          <picture className="pf-face pf-face--nav">
            <source media={COMPUTADOR} srcSet={VAZIO} />
            <img
              src="/assets/portfolio/leonardo-caricatura-sm.webp"
              alt="Caricatura de Leonardo Ferreira"
              width={128}
              height={154}
              decoding="async"
            />
          </picture>
        </nav>

        <header className="pf-hero">
          <div className="pf-hero-text">
            <h1 className="pf-title">
              Sites que eu <em>desenhei e construí</em>.
            </h1>
            <p className="pf-sub">
              Cada projeto aqui está no ar, funcionando e gerando resultado para quem confiou no
              trabalho. Clique em qualquer um para abrir o site de verdade.
            </p>
            <a
              className="pf-wa pf-wa--hero"
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Construa seu site comigo
            </a>
          </div>

          <picture className="pf-face pf-face--hero">
            <source media={CELULAR} srcSet={VAZIO} />
            <img
              src="/assets/portfolio/leonardo-caricatura.webp"
              alt="Caricatura de Leonardo Ferreira"
              width={640}
              height={775}
              decoding="async"
            />
          </picture>
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
              <WhatsAppIcon />
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
