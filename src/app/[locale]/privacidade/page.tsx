'use client';

import Header from '@/components/Header';
import { Link } from '@/routing';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function PrivacidadePage() {
  const { setRef } = useIntersectionObserver();

  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="ds-container">
          <div className="ds-section-title fade-in-up" ref={setRef(0)} style={{ marginBottom: '64px', textAlign: 'left' }}>
            <h1 className="ds-h2">Política de Privacidade</h1>
            <p className="ds-body" style={{ margin: '16px 0 0' }}>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <div className="ds-glass-card fade-in-up delay-1" ref={setRef(1)} style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section>
              <h2 className="ds-h3" style={{ marginBottom: '16px' }}>1. Introdução</h2>
              <p className="ds-body">Bem-vindo à nossa Política de Privacidade. Seu direito à privacidade e à segurança de seus dados pessoais são nossa prioridade. Esta política de privacidade descreve como coletamos, usamos, e compartilhamos suas informações pessoais ao utilizar nosso site. Ao acessar o site, você concorda com os termos aqui descritos.</p>
            </section>
            
            <section>
              <h2 className="ds-h3" style={{ marginBottom: '16px' }}>2. Informações que Coletamos</h2>
              <p className="ds-body">Podemos coletar seu nome, endereço de e-mail, telefone, nome da empresa e outras informações que você nos fornece voluntariamente por meio de formulários em nosso site. Também coletamos automaticamente dados de navegação, como endereço IP, tipo de navegador, páginas acessadas e tempo de permanência, visando melhorar a experiência do usuário.</p>
            </section>

            <section>
              <h2 className="ds-h3" style={{ marginBottom: '16px' }}>3. Como Usamos Suas Informações</h2>
              <p className="ds-body">Utilizamos as informações coletadas para:</p>
              <ul className="ds-body" style={{ listStyleType: 'disc', paddingLeft: '24px', marginTop: '8px' }}>
                <li>Prestar, operar e manter nosso site;</li>
                <li>Melhorar, personalizar e expandir nosso site;</li>
                <li>Entender e analisar como você usa nosso site;</li>
                <li>Desenvolver novos produtos, serviços, recursos e funcionalidades;</li>
                <li>Comunicar-nos com você, seja diretamente ou por meio de parceiros, incluindo atendimento ao cliente e suporte;</li>
                <li>Enviar e-mails e contatar você caso tenha solicitado um orçamento.</li>
              </ul>
            </section>

            <section>
              <h2 className="ds-h3" style={{ marginBottom: '16px' }}>4. Compartilhamento de Informações</h2>
              <p className="ds-body">Não vendemos, trocamos ou transferimos de outra forma suas informações pessoais identificáveis a terceiros. No entanto, podemos compartilhar dados genéricos demográficos com nossos parceiros de negócios ou prestadores de serviços estritamente para os fins descritos acima. O compartilhamento ocorre apenas quando o terceiro concorda em manter a informação confidencial.</p>
            </section>

            <section>
              <h2 className="ds-h3" style={{ marginBottom: '16px' }}>5. Segurança dos Dados</h2>
              <p className="ds-body">Empregamos protocolos de segurança robustos para proteger as suas informações. No entanto, lembre-se de que nenhum método de transmissão através da Internet, ou método de armazenamento eletrônico, é 100% seguro. Embora nos esforcemos para usar todos e quaisquer meios para proteger sua informação pessoal, não garantimos sua segurança absoluta.</p>
            </section>

            <section>
              <h2 className="ds-h3" style={{ marginBottom: '16px' }}>6. Direitos dos Usuários</h2>
              <p className="ds-body">Como titular dos dados, você pode solicitar o acesso, a correção ou a exclusão das suas informações pessoais nos nossos registros a qualquer momento, enviando um e-mail para nós. Você também tem o direito de se opor ao processamento das suas informações ou de retirar o seu consentimento.</p>
            </section>

            <section>
              <h2 className="ds-h3" style={{ marginBottom: '16px' }}>7. Contato</h2>
              <p className="ds-body">Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do e-mail: <a href="mailto:leonardoferreirrs@gmail.com" style={{ color: 'var(--ds-text-primary)' }}>leonardoferreirrs@gmail.com</a>.</p>
            </section>
          </div>
          
          <div className="fade-in-up delay-2" ref={setRef(2)} style={{ marginTop: '48px' }}>
             <Link href="/" className="ds-body-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--ds-text-secondary)', textDecoration: 'none', transition: 'color var(--speed-fast)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Voltar ao Início
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--ds-glass-border)' }}>
        <div className="ds-container footer-container">
          <div className="ds-body-sm footer-copyright">
            <span style={{ marginRight: '8px' }}>© {new Date().getFullYear()} Leonardo Ferreira. Todos os direitos reservados.</span>
            <Link href="/privacidade" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacidade</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
