import { ADDRESS, ATTRACTION_NAME, GEO, MAPS_URL } from '../data/site';

export type FaqItem = { q: string; a: string };

/** Entidade do ponto turístico. O @id é compartilhado por todas as páginas. */
export function attractionSchema(origin: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${origin}/#attraction`,
    name: ATTRACTION_NAME,
    additionalType: 'https://schema.org/Bridge',
    alternateName: ['Ponte pênsil Hercílio Luz', 'Ponte Hercílio Luz de Florianópolis', 'Ponte Hercilio Luz', 'Puente Hercílio Luz', 'Hercílio Luz Bridge'],
    description: 'Ponte pênsil histórica no Centro de Florianópolis (Santa Catarina, Brasil): patrimônio cultural tombado, símbolo do estado.',
    url: `${origin}/`,
    image: [`${origin}/images/ponte-hercilio-luz-hero.jpg`],
    address: { '@type': 'PostalAddress', ...ADDRESS },
    geo: { '@type': 'GeoCoordinates', ...GEO },
    hasMap: MAPS_URL,
    sameAs: [
      'https://www.gov.br/iphan/pt-br/assuntos/noticias/ponte-hercilio-luz-chega-aos-100-anos-como-simbolo-de-santa-catarina',
      'https://www.sc.gov.br/vivaaponte/',
      'https://redeplanejamento.pmf.sc.gov.br/pt-BR/projetos/ponte-viva',
      'https://www.setur.sc.gov.br/',
      MAPS_URL
    ]
  };
}

export function breadcrumbSchema(origin: string, trail: Array<{ name: string; path: string }>): Record<string, unknown> {
  const current = trail[trail.length - 1] ?? { name: 'Início', path: '/' };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${origin}${current.path}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`
    }))
  };
}

export function faqSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
}

export function webPageSchema(origin: string, path: string, name: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${origin}${path}`,
    url: `${origin}${path}`,
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#attraction` },
    breadcrumb: { '@id': `${origin}${path}#breadcrumb` }
  };
}
