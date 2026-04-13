// components/seo/GlobalSchemas.tsx
// Adicione este componente no app/[locale]/layout.tsx para injetar schemas globais em todas as páginas

import SchemaMarkup from './SchemaMarkup'

export default function GlobalSchemas() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Leonardo Ferreira — Design UI/UX',
    url: 'https://www.leonardoferreirr.com.br',
    logo: 'https://www.leonardoferreirr.com.br/assets/profile.png',
    description:
      'Especialista em design estratégico e construção de marcas com mais de 5 anos de experiência. Criação de identidade visual, logotipos e brandbooks para empresas de todos os segmentos.',
    email: 'leonardoferreirrs@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
    },
    sameAs: [
      // Adicione seus perfis sociais aqui quando disponíveis
      // 'https://linkedin.com/in/...',
      // 'https://instagram.com/...',
      // 'https://behance.net/...',
    ],
    founder: {
      '@type': 'Person',
      name: 'Leonardo Ferreira',
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Leonardo Ferreira',
    jobTitle: 'Designer UI/UX e Especialista em Identidade Visual',
    description:
      'Especialista em design estratégico com mais de 5 anos de experiência na criação de identidades visuais de alto impacto para empresas.',
    url: 'https://www.leonardoferreirr.com.br/pt',
    email: 'leonardoferreirrs@gmail.com',
    worksFor: {
      '@type': 'Organization',
      name: 'Leonardo Ferreira — Design UI/UX',
    },
    knowsAbout: [
      'Identidade Visual',
      'Design de Logotipo',
      'Branding',
      'Design UI/UX',
      'Desenvolvimento Web',
      'Brandbook',
      'Manual de Marca',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Leonardo Ferreira — Design UI/UX',
    url: 'https://www.leonardoferreirr.com.br',
    description:
      'Portfólio e serviços de design estratégico, identidade visual e desenvolvimento web de Leonardo Ferreira.',
    inLanguage: ['pt-BR', 'en', 'es'],
    potentialAction: {
      '@type': 'ContactAction',
      target: 'https://www.leonardoferreirr.com.br/pt/orcamento',
      name: 'Solicitar Orçamento',
    },
  }

  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={personSchema} />
      <SchemaMarkup schema={websiteSchema} />
    </>
  )
}
