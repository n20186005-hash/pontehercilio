/**
 * Fonte única de verdade para nomeação e fatos do site.
 * Formato de nome SEO: atração + cidade + guia de visita.
 */

export const SITE_URL = 'https://pontehercilio.com';

export const ATTRACTION_NAME = 'Ponte Hercílio Luz';
export const CITY_NAME = 'Florianópolis';
export const STATE_NAME = 'Santa Catarina';
export const COUNTRY_NAME = 'Brasil';

/** Nome completo do site usado em og:site_name, manifest e sufixo de páginas internas. */
export const SITE_NAME = `${ATTRACTION_NAME} ${CITY_NAME} — Guia de Visita`;

/** Nome curto para elementos de interface (PWA, maçã, logo). */
export const SITE_NAME_SHORT = 'Guia Ponte Hercílio Luz';

/** Endereço de referência e geolocalização usados no conteúdo e no JSON-LD. */
export const ADDRESS = {
  streetAddress: 'Ponte pênsil - Centro',
  addressLocality: CITY_NAME,
  addressRegion: 'SC',
  postalCode: '88010-400',
  addressCountry: 'BR',
};

export const GEO = {
  latitude: -27.5938117,
  longitude: -48.5651101,
};

export const MAPS_URL = 'https://maps.app.goo.gl/NTxFSZTyTbenYDZo6';

/** Avaliação pública usada como referência (consulta ao Google Maps em 23 de outubro de 2026). */
export const RATING = { value: '4.8', count: '24611' };

/** Rotas internas do guia, usadas em links de navegação e breadcrumbs. */
export const GUIDE_ROUTES = [
  { path: '/horarios/', title: 'Horários e circulação' },
  { path: '/como-chegar/', title: 'Como chegar' },
  { path: '/historia/', title: 'História e engenharia' },
] as const;

/** Sufixo padrão das páginas internas: "Título | SITE_NAME". */
export function withSiteName(title: string): string {
  return `${title} | ${SITE_NAME}`;
}
