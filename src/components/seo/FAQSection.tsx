// components/seo/FAQSection.tsx
import SchemaMarkup from './SchemaMarkup'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items?: FAQItem[]
  title?: string
}

// FAQ padrão otimizado para GEO — nicho de identidade visual e design de marca
export const defaultFAQItems: FAQItem[] = [
  {
    question: 'O que é identidade visual e por que minha empresa precisa de uma?',
    answer:
      'Identidade visual é o conjunto de elementos gráficos que representam uma marca de forma consistente: logotipo, paleta de cores, tipografia, grafismos e padrões. Empresas com identidade visual profissional transmitem credibilidade, são reconhecidas mais facilmente e se diferenciam da concorrência. Estudos mostram que a consistência visual pode aumentar o reconhecimento de marca em até 80%.',
  },
  {
    question: 'Qual a diferença entre logotipo e identidade visual completa?',
    answer:
      'O logotipo é apenas um dos elementos da identidade visual — é o símbolo ou tipografia que representa a marca. A identidade visual completa inclui o logotipo, paleta de cores técnica (com códigos RGB, CMYK e Pantone), tipografia primária e secundária, grafismos de apoio, padronagens, manual da marca (brandbook) e mockups de aplicação. Uma identidade visual completa garante consistência em todos os pontos de contato da empresa.',
  },
  {
    question: 'Quanto tempo leva para criar uma identidade visual completa?',
    answer:
      'O processo de criação de identidade visual na Leonardo Ferreira leva em média de 3 a 6 semanas, dependendo da complexidade do projeto. O processo é dividido em 7 etapas: imersão e análise, estratégia de marca, direcionamento visual, design de logotipo, sistema de identidade visual, apresentação estratégica e entrega final. Cada etapa inclui revisões e validações com o cliente.',
  },
  {
    question: 'O que está incluso no brandbook (manual da marca)?',
    answer:
      'O brandbook entregue nos projetos de identidade visual inclui: versões do logotipo (colorido, monocromático, negativo e positivo), paleta de cores com códigos técnicos (Pantone, CMYK, RGB e HEX), guia tipográfico com fontes primárias e secundárias, regras de uso e espaçamento, grafismos e padrões visuais, exemplos de aplicações corretas e incorretas, e diretrizes para aplicação em materiais digitais e impressos.',
  },
  {
    question: 'Como funciona o processo de criação de identidade visual?',
    answer:
      'O processo começa com uma reunião de imersão para entender o negócio, o público-alvo e os objetivos da marca. Em seguida, é definida a estratégia de posicionamento e criado um moodboard com referências visuais para validação. Após aprovação da direção criativa, são desenvolvidos o logotipo e o sistema de identidade visual completo. O projeto é apresentado em uma chamada de vídeo detalhada com o cliente antes da entrega dos arquivos finais.',
  },
  {
    question: 'Quais formatos de arquivo são entregues no projeto de identidade visual?',
    answer:
      'Todos os projetos de identidade visual incluem os arquivos em formatos abertos e editáveis (AI e PDF) e para uso imediato (PNG com fundo transparente, SVG e EPS). As cores são fornecidas em perfis RGB para uso digital e CMYK para impressão, com referências Pantone para padronização em gráficas. Os arquivos são organizados em pastas por categoria para facilitar o uso.',
  },
  {
    question: 'É possível criar identidade visual para empresas de qualquer segmento?',
    answer:
      'Sim. O portfólio da Leonardo Ferreira inclui projetos para segmentos variados, como saúde (Biothera), automotivo (Divino Car), seguros (RAX Seguros), tecnologia (Hello BIM), finanças (Remach Capital), moda (Poly Santos) e sustentabilidade (Ecomove). A metodologia de imersão e estratégia de marca é adaptada para as características, público e posicionamento de cada setor.',
  },
  {
    question: 'Como solicitar um orçamento para identidade visual ou design?',
    answer:
      'Para solicitar um orçamento, basta acessar a página de orçamento em leonardoferreirr.com.br/pt/orcamento, preencher o formulário com as informações do projeto ou enviar um e-mail para leonardoferreirrs@gmail.com. Após o contato inicial, é agendada uma conversa para alinhar expectativas, entender os objetivos do projeto e apresentar a proposta personalizada.',
  },
]

export default function FAQSection({
  items = defaultFAQItems,
  title = 'Perguntas Frequentes',
}: FAQSectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }

  return (
    <>
      <SchemaMarkup schema={schema} />
      <section aria-labelledby="faq-heading" className="py-16 px-4 max-w-4xl mx-auto">
        <h2
          id="faq-heading"
          className="text-2xl font-bold mb-10 text-center"
        >
          {title}
        </h2>
        <dl className="space-y-8">
          {items.map(({ question, answer }) => (
            <div key={question} className="border-b border-neutral-200 pb-8">
              <dt className="text-lg font-semibold mb-3">{question}</dt>
              <dd className="text-neutral-600 leading-relaxed">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
