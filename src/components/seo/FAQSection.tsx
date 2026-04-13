import React from 'react';
import SchemaMarkup from './SchemaMarkup';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQSection({ items, title = 'Perguntas Frequentes' }: FAQSectionProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": { "@type": "Answer", "text": answer }
    }))
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      <section aria-labelledby="faq-title" className="ds-container" style={{ padding: '80px 0' }}>
        <h2 id="faq-title" className="ds-h2 ds-text-stroke" style={{ marginBottom: '40px' }}>{title}</h2>
        <dl style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {items.map(({ question, answer }) => (
            <div key={question} className="ds-glass-card" style={{ padding: '24px' }}>
              <dt className="ds-h3" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{question}</dt>
              <dd className="ds-body">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
