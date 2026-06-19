import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// Ordem e rótulos do e-mail, espelhando o formulário.
const SECTIONS: { title: string; fields: [string, string][] }[] = [
  {
    title: 'Sobre você e a marca',
    fields: [
      ['nome', 'Nome'],
      ['email_contato', 'Email'],
      ['telefone', 'Telefone / WhatsApp'],
      ['marca', 'Marca ou projeto'],
      ['segmento', 'Segmento'],
      ['site_e_redes', 'Site e redes'],
      ['tempo_de_existencia', 'Tempo de existência'],
      ['tamanho_do_time', 'Tamanho do time'],
    ],
  },
  {
    title: 'O negócio',
    fields: [
      ['o_que_faz_e_como_ganha', 'O que faz e como ganha dinheiro'],
      ['como_funciona_a_venda', 'Como funciona a venda'],
      ['de_onde_sai_para_onde_vai', 'De onde sai, para onde vai (1 a 3 anos)'],
      ['o_que_ja_funciona', 'O que já funciona e não pode se perder'],
      ['por_que_marca_agora', 'Por que investir em marca agora'],
      ['maior_risco', 'Se der tudo errado, o motivo provável'],
      ['datas_ou_metas', 'Datas ou metas amarradas'],
    ],
  },
  {
    title: 'Quem quer atingir',
    fields: [
      ['cliente_ideal', 'Cliente ideal'],
      ['dor_real', 'Dor real do cliente'],
      ['como_resolve_hoje', 'Como ele resolve isso hoje'],
      ['onde_busca_e_confia', 'Onde busca informação e em quem confia'],
      ['cliente_que_nao_quer', 'Cliente que NÃO quer'],
    ],
  },
  {
    title: 'Mercado e diferenciação',
    fields: [
      ['promessa', 'Promessa / transformação'],
      ['concorrentes', 'Concorrentes'],
      ['fa_e_hater', 'Fã e hater de cada concorrente'],
      ['por_que_diferente_e_verdadeira', 'Por que é diferente e verdadeira'],
    ],
  },
  {
    title: 'História e personalidade',
    fields: [
      ['como_a_marca_nasceu', 'Como a marca nasceu'],
      ['eu_nunca_vou', 'Eu nunca vou...'],
      ['o_que_mais_me_move', 'O que mais me move...'],
      ['legado_30_anos', 'Legado (30 anos)'],
      ['personalidade', 'Personalidade'],
      ['marcas_que_admira', 'Marcas que admira e por quê'],
    ],
  },
  {
    title: 'Identidade visual e aplicações',
    fields: [
      ['identidade_atual', 'Identidade atual'],
      ['cores_e_fontes', 'Cores e fontes (ama / detesta)'],
      ['sensacoes', 'Sensações a transmitir'],
      ['onde_vai_aparecer', 'Onde vai aparecer'],
      ['mais_alguma_coisa', 'Mais alguma coisa'],
    ],
  },
];

function esc(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Payload inválido.' }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.BRANDING_TO || user;

  if (!user || !pass) {
    return NextResponse.json(
      { success: false, message: 'Envio de e-mail não configurado no servidor.' },
      { status: 500 },
    );
  }

  const get = (k: string) => (data[k] || '').toString().trim();
  const marca = get('marca') || get('nome') || 'sem nome';

  // Monta corpo HTML e texto
  const htmlParts: string[] = [
    `<div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:680px;margin:0 auto">`,
    `<h2 style="margin:0 0 4px">Novo formulário de branding</h2>`,
    `<p style="margin:0 0 24px;color:#666">Marca: <strong>${esc(marca)}</strong></p>`,
  ];
  const textParts: string[] = [`NOVO FORMULÁRIO DE BRANDING — ${marca}`, ''];

  for (const section of SECTIONS) {
    const rows = section.fields
      .map(([key, label]) => [label, get(key)] as const)
      .filter(([, val]) => val !== '');
    if (rows.length === 0) continue;

    htmlParts.push(
      `<h3 style="margin:24px 0 8px;padding-bottom:6px;border-bottom:1px solid #eee">${esc(section.title)}</h3>`,
    );
    textParts.push(`== ${section.title.toUpperCase()} ==`);

    for (const [label, val] of rows) {
      htmlParts.push(
        `<p style="margin:0 0 12px"><strong style="color:#555">${esc(label)}:</strong><br>${esc(val).replace(/\n/g, '<br>')}</p>`,
      );
      textParts.push(`${label}: ${val}`);
    }
    textParts.push('');
  }
  htmlParts.push('</div>');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Formulário de Branding" <${user}>`,
      to,
      replyTo: get('email_contato') || undefined,
      subject: `Novo formulário de branding: ${marca}`,
      text: textParts.join('\n'),
      html: htmlParts.join('\n'),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Falha ao enviar e-mail do formulário de branding:', err);
    return NextResponse.json({ success: false, message: 'Falha ao enviar o e-mail.' }, { status: 502 });
  }
}
