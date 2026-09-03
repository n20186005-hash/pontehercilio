# Status da entrega — Guia Ponte Hercílio Luz

## Histórico resumido

1. **Pacote base**: site estático Astro 7.2.9 + Tailwind CSS + TypeScript para Cloudflare Workers (`assets.directory = ./dist`), página principal em pt-BR, JSON-LD `TouristAttraction` + `FAQPage`, GA4 consentido, páginas de privacidade/termos/cookies, favicon e logo locais.
2. **Rodadas de conteúdo e otimização (03/09/2026)**: clima em tempo real, seções de engenharia e curiosidades, serviços neutros do entorno, FAQ ampliada para 12 perguntas e compressão de imagens (−94,5%).
3. **Rodada de dados finais, SEO de entidade única e PWA (03/09/2026)** — detalhada na última seção deste arquivo.
4. **Correção do pipeline de build (03/09/2026)**: `pnpm-workspace.yaml` usava a chave inválida `allowBuilds` em formato de lista (e `onlyBuiltDependencies`, nome da chave do pnpm v10). No pnpm v11 a configuração correta é `allowBuilds` como **mapa pacote → true/false**; sem ela, o instalador da plataforma abortava em `ERR_PNPM_IGNORED_BUILDS` (esbuild 0.28.1/0.28.2 e workerd bloqueados). Corrigido e validado com `pnpm install --frozen-lockfile` (exit 0, postinstall de esbuild/workerd executados).

## O que foi adicionado nesta rodada

### 1. Conteúdo mais profundo (mantendo o que já existia)
- **História**: novos parágrafos (única ligação rodoviária 1926–1975, pedágio de 1 tostão, quitação do financiamento em 1978, tombamento nas três esferas) + nova linha do tempo com 12 marcos (1922–2026).
- **Engenharia** (nova seção `#engenharia`): narrativa de projeto/construção/restauro (Robinson & Steinman, American Bridge Company, barras de olhal) + ficha técnica com 8 números (821 m, vão 339,5 m, torres ~74 m, ~5.000 t de aço, 14.250 m³ de concreto etc.).
- **Roteiro sugerido** em 5 passos dentro de `#visita`.
- **Entorno**: ampliado de 3 para 6 cartões (Praça XV e Catedral, Largo da Alfândega, Beira-Mar Norte).
- **Histórias e curiosidades** (nova seção `#curiosidades`): 6 cartões com base em registros históricos/públicos (nome do governador, pedágio, recorde de barras de olhal, lição da Silver Bridge, macacos hidráulicos do restauro, símbolo mais citado do estado).
- **FAQ**: ampliado de 6 para **12 perguntas** (banheiros, acessibilidade, pets, drone, iluminação noturna, melhor época etc.), com `FAQPage` JSON-LD atualizado automaticamente.

### 2. Serviços e infraestrutura do entorno (nova seção `#servicos`)
10 categorias **neutras, sem nomes de marcas** (política de não-recomendação do projeto): banheiros públicos, estacionamento, restaurantes, cafés/padarias, mercados e conveniência, hospedagem, combustível e recarga elétrica, farmácia/emergência, dinheiro/cartões e transporte público.
As menções a estabelecimentos privados que existiam em "Gastronomia" e "Estacionamento" foram **reescritas por tipo e localização**, mantendo o valor informativo do conteúdo sem patrocinar marcas.

### 3. Clima em tempo real + 7 dias (nova seção `#clima`)
Componente `src/components/WeatherSection.astro` consulta a API aberta **Open-Meteo** (sem chave/cookies), geocodificada para o Centro de Florianópolis, com cache local de 30 min e casca estática/noscript. Mostra condição atual (temperatura, sensação, umidade, vento) e previsão diária de 7 dias (máx./mín./probabilidade de chuva) com ícones WMO inline. Nota de fonte e privacidade adicionada ao componente, ao rodapé e à página de privacidade.

### 4. Compressão de imagens
- Novo `scripts/optimize-images.mjs` (sharp, progressive JPEG q82, rotação EXIF, max 1600 px; hero 1920 px) e script `pnpm optimize:images`.
- Resultado: **22,0 MB → 1,2 MB (−94,5%)** nas seis fotografias de `public/images/` (hero 14,6 MB → ~0,6 MB).

## Verificações executadas neste ambiente

- `pnpm install` (com `pnpm-lock.yaml` gerado e `pnpm-workspace.yaml` liberando esbuild/workerd).
- `pnpm check` (astro check): **12 arquivos, 0 erros / 0 warnings / 0 hints**.
- `pnpm build`: **5 páginas geradas** em ~12 s (/, /404/, /cookies/, /privacidade/, /termos/).
- Verificação pós-build em `dist/index.html`: 9 âncoras presentes (`#historia #engenharia #visita #clima #servicos #curiosidades #entorno #faq #localizacao`), módulo de clima com chamada Open-Meteo, 12 itens de FAQ, 2 blocos JSON-LD (TouristAttraction + FAQPage), navegação nova ok.
- Teste direto da resposta da API Open-Meteo com os parâmetros usados: OK (7 dias, campos esperados).

## Observações e pendências para publicação

- O conteúdo novo (história, engenharia, curiosidades, serviços) foi escrito a partir de fontes públicas e registros técnicos; números apresentados como aproximados. Recomenda-se **revisão editorial** (de preferência por historiador ou engenheiro familiarizado com a obra) antes da divulgação pública.
- As regras operacionais da ponte (veículos/pedestres/horários) podem mudar; o texto remete sempre aos canais oficiais (SIE/SC, PMF, Iphan).
- Os 6 JPGs agora existem e estão otimizados; os créditos/licenças dos autores permanecem conforme o arquivo de fontes do projeto.
- Build local usou Node 24.14 com aviso não-bloqueante de engines (esperado 24.20).

## Rodada 3 — Dados finais, entidade única e PWA (03/09/2026)

### Dados atualizados do ponto turístico
- Domínio fixo: **https://pontehercilio.com** (padrão em `astro.config.mjs`; `SITE_URL` segue permitindo sobrescrever em builds de teste/preview).
- Google Maps: link curto `https://maps.app.goo.gl/NTxFSZTyTbenYDZo6` e novo iframe de embed fornecido (interface do mapa mantida em pt-BR), já em uso no site.
- Endereço **Ponte pênsil - Centro, Florianópolis - SC, 88010-400, Brasil**; Plus Code **CC4M+FX**; coordenadas −27,5938117 / −48,5676850.
- Avaliação Google **4,8 (24.497)** exibida como badge no herói e na nova seção `#sobre`, além do `aggregateRating` no JSON-LD.

### SEO de entidade única (template aplicado)
- TouristAttraction com `@id` `https://pontehercilio.com/#attraction`, `alternateName` em array, `url`, `image[]`, `hasMap`, `sameAs` (Iphan, Governo de SC, PMF, Santur e Maps) e `isAccessibleForFree`; mantidos `address` (postal 88010-400, país BR), `geo` e FAQPage com 12 perguntas.
- TDK: título `Ponte Hercílio Luz (Florianópolis) | História, Visita e Guia`; canonical, `og:image`/`og:image:alt`, `og:site_name` e Twitter cards absolutos a partir do domínio.
- H1 incorpora a cadeia geográfica "Florianópolis · Santa Catarina · Brasil"; nova seção `#sobre` traz rastro geográfico (Ponte Hercílio Luz → Florianópolis → Santa Catarina → Brasil), parágrafo de equivalência de nomes (Ponte Hercílio Luz = Ponte pênsil Hercílio Luz), cluster de marcos próximos (Praça XV, Mercado Público, Parque da Luz, Forte Santana) e cartões rápidos (avaliação, acesso, endereço, categoria).
- Seção `#localizacao` ganhou o bloco "Portais oficiais" (Santur, Governo de SC e Prefeitura de Florianópolis).

### PWA
- `public/site.webmanifest`, `public/sw.js` (network-first p/ navegação e stale-while-revalidate p/ recursos próprios, com fallback offline), ícones `public/brand/icon-192.png`, `icon-512.png` e `icon-maskable-512.png` gerados a partir de `favicon.svg`; registro do service worker apenas em HTTPS.
- `public/robots.txt` + sitemap automático do Astro apontando para `pontehercilio.com`.
- Política de Privacidade passou a explicar o cache local do service worker.

### Verificações desta rodada
- `astro check`: **13 arquivos, 0 erros / 0 warnings / 0 hints**.
- `pnpm build`: **5 páginas** + `sitemap-index.xml`.
- Verificação pós-build com 32 critérios OK: canonical/OG/H1/título, 2 blocos JSON-LD parseáveis (TouristAttraction com @id e FAQPage com 12 Questions), embed novo (`4v1788345404308`), 4+ ocorrências do link curto, arquivos PWA/robots/sitemap no `dist` e manifest válido com ícones 192/512/maskable.

## Rodada 4 — Auditoria de conformidade contra o guia de armadilhas (03/09/2026)

Reconstrução da lista com base nas categorias conhecidas (JSON-LD / horários / E-E-A-T / sitemap / créditos de imagem / GA4 com consentimento / PWA / 404 / links oficiais / consistência de idioma) + pendências de rodadas anteriores. Verificação item a item com evidência de código:

1. **JSON-LD (estrutura e validade)** — PASS. `index.astro` injeta 2 blocos em `application/ld+json` (linha 53 do layout): `TouristAttraction` com `@id`, `name`, `alternateName[]`, `description`, `url`, `image[]`, `address` (88010-400/BR), `geo`, `hasMap`, `openingHours` descritivo, `aggregateRating` 4.8/24.497 e `sameAs` (Iphan, SC, PMF, Santur, Maps) + `FAQPage` com 12 `Question`. Ambos os blocos foram parseados com `JSON.parse` com sucesso no build de verificação.
2. **Horários de acesso** — PASS (decisão documentada, sem fabricação). A ponte não tem bilheteria nem horário fixo de "abertura": o fluxo de veículos/pedestres segue regras operacionais mutáveis (eventos/manutenção). O JSON-LD usa `openingHours` descritivo e `isAccessibleForFree`, e as seções `#visita` + `#faq` + CTA remetem sempre aos canais oficiais — coerente com a política "não inventar" do projeto. Recomenda-se migrar para `openingHoursSpecification` apenas se houver fonte oficial com horário estável.
3. **E-E-A-T visível** — PASS. Footer: declaração de independência/sem vínculo, "Fontes institucionais" com 6 links oficiais, indicação de revisão "setembro de 2026" e direitos de imagem; páginas legais com "Última atualização: setembro de 2026"; FAQ/JSON-LD derivam do mesmo conteúdo exibido. (Opcional não bloqueante: nós `Organization/WebSite/WebPage` com `dateModified` no JSON-LD poderiam ser adicionados futuramente.)
4. **Sitemap** — PASS. `astro.config.mjs` mantém `site` fixo e integração `@astrojs/sitemap`; build gera `sitemap-index.xml` + `sitemap-0.xml` com 4 URLs absolutas (`/`, `/cookies/`, `/privacidade/`, `/termos/`), sem incluir o 404. `robots.txt` referencia `https://pontehercilio.com/sitemap-index.xml`.
5. **Créditos de imagem** — FALHA corrigida nesta rodada. O arquivo público `public/CREDITOS-IMAGENS.txt` (linkado na galeria) ainda continha o texto de rascunho "não inclui fotografias…", e `public/images/README.txt` afirmava que as fotos "ainda não foram materializadas" — ambos falsos diante dos 6 JPGs existentes. Ações: reescrito `CREDITOS-IMAGENS.txt` com as 6 obras/autores/licenças candidatas (Wikimedia Commons) e estado transparente de emparelhamento arquivo→obra; removido `public/images/README.txt`; `FOTO-FONTES.md` atualizado. Pendência pré-lançamento (humana): confirmar o emparelhamento definitivo de cada arquivo local com sua obra e registrar no arquivo de créditos.
6. **GA4 com consentimento** — PASS. `BaseLayout.astro` (head): GA4 `G-HXM22WWPKP` só carrega se `localStorage['phl-cookie-preferences'].analytics === true` ou após evento `phl-consent-updated`; `/cookies/` salva preferências, dispacha o evento e grava cookie `phl_consent` (SameSite=Lax). Sem ca-pub/AdSense/doubleclick em todo o código.
7. **PWA** — PASS. `site.webmanifest` (start `/`, theme `#07141d`, ícones 192/512/maskable presentes em `public/brand/`), `sw.js` registrado somente em HTTPS; SW faz network-first para navegação, stale-while-revalidate para recursos do próprio domínio e não cacheia terceiros (GA4/Open-Meteo/Google Maps). Política de Privacidade explica o cache local.
8. **404** — PASS. `src/pages/404.astro` com `noindex` e retorno à home; build gera `/404.html`; `wrangler.jsonc` usa `not_found_handling: "404-page"`.
9. **Links oficiais / externos** — PASS. Todos os links externos de `src/` foram inventariados: apenas Iphan (gov.br), Governo de SC (sc.gov.br), PMF, SIE/SC, Santur e Ministério do Turismo (gov.br/turismo, adicionado nesta rodada ao rodapé para ancorar a menção no texto) + Google Maps (curto e embed). Zero hotlink de imagens e zero domínio estranho.
10. **Consistência de idioma e dados** — PASS. Site único em pt-BR (`<html lang="pt-BR">`, `og:locale pt_BR`), sem resquícios de outros POIs (busca por Sule/bless/jaipur/pompeii etc.: 0 ocorrências). Coordenadas −27,5938117/−48,5676850, CEP 88010-400, Plus Code CC4M+FX, curto `NTxFSZTyTbenYDZo6` e embed pb `4v1788345404308` (idioma da interface pt-BR) são únicos e consistentes em página, layout, rodapé e JSON-LD.

Verificações: `astro check` 0 erros/0 warnings/0 hints; build estático OK; re-inspeção pós-build dos arquivos PWA/robots/sitemap/créditos. Pendências de rodadas anteriores mantidas: revisão editorial humana do conteúdo pt-BR antes do lançamento e confirmação do emparelhamento de créditos fotográficos.
