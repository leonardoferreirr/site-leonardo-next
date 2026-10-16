'use client';

import { useTranslations } from 'next-intl';
import { WhatsApp } from './Icons';

export const WHATSAPP_URL = 'https://wa.me/5534936180691?text=Oi%20L%C3%A9o!%20Vim%20pelo%20site%20e%20queria%20falar%20sobre%20um%20projeto!';

// botão de WhatsApp no fim de cada seção (menos no hero e no contato, pedido de 16/10)
export default function SectionCta({ light = false }: { light?: boolean }) {
  const t = useTranslations('Home2.cta');
  return (
    <div className="v2-sec-cta v2-in">
      <a href={WHATSAPP_URL} target="_blank" rel="noopener" className={`v2-btn ${light ? 'v2-btn--ink' : 'v2-btn--solid'}`}>
        <WhatsApp /> {t('section')}
      </a>
    </div>
  );
}
