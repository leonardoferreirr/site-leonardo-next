import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://www.leonardoferreirr.com.br/sitemap.xml',
  };
}
