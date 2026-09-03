# Guia Ponte Hercílio Luz

Site estático em português brasileiro, feito com Astro + Tailwind CSS + TypeScript e preparado para publicação como Cloudflare Worker com assets estáticos.

Projeto independente e **sem fins lucrativos**: estabelecimentos do entorno são descritos apenas por **tipo** (banheiros, estacionamento, alimentação, hospedagem, etc.), sem recomendação comercial.

## Requisitos

- Node.js 24.20.0 (versões menores funcionam com aviso do pnpm)
- pnpm 11.25.0

## Domínio

O domínio é **https://pontehercilio.com**, definido como padrão no `astro.config.mjs` e usado em canonical, Open Graph, JSON-LD e sitemap. A variável `SITE_URL` continua disponível para sobrescrever o domínio em builds de teste ou pré-visualização:

```bash
SITE_URL=https://preview.example.com pnpm build
```

Observação: `public/robots.txt` e `public/site.webmanifest` citam `pontehercilio.com` como endereço fixo — atualize esses arquivos caso o site seja publicado sob outro domínio.

## Desenvolvimento

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

O arquivo `pnpm-workspace.yaml` libera os scripts nativos de `esbuild` (Astro/Vite) e `workerd` (Wrangler). Não reative a verificação automática de dependências do pnpm (`verifyDepsBeforeRun`) sem manter essas permissões, sob risco de erro "Ignored build scripts".

## Otimização de imagens

As fotografias JPG em `public/images/` são comprimidas (progressive JPEG, sem perda de dimensão relevante) com sharp:

```bash
pnpm optimize:images
```

Não há dependência de serviços externos para servir imagens; os arquivos ficam no próprio site.

## Clima em tempo real

A seção `#clima` usa a API aberta **Open-Meteo** (sem chave e sem cookies), consultada no navegador com cache local de 30 minutos. A previsão é geocodificada para o centro de Florianópolis (-27.5938117, -48.5676850, `America/Sao_Paulo`).

## PWA e navegação offline

O site é uma PWA instalável: `public/site.webmanifest` (ícones gerados em `public/brand/icon-192.png`, `icon-512.png` e `icon-maskable-512.png`), `theme-color` `#07141d` e `public/sw.js` registrado em páginas servidas por HTTPS. O service worker usa network-first para navegação e stale-while-revalidate para imagens, CSS e outros recursos do mesmo domínio, com fallback offline para a página inicial. O cache é exclusivo do domínio e seu funcionamento é descrito na Política de Privacidade.

## SEO (entidade única)

Dados do ponto turístico concentrados em `src/pages/index.astro`: TouristAttraction com `@id`, `alternateName`, `hasMap`, `aggregateRating` 4,8 (24.497 avaliações) e `sameAs` (Iphan, Governo de SC, PMF, Santur e Google Maps); FAQPage com 12 perguntas; canonical/OG sempre absolutos a partir do domínio.

## Cloudflare Worker

O projeto é inteiramente estático, portanto segue a modalidade recomendada pela documentação do Astro/Cloudflare para Workers com `assets.directory = ./dist`, sem adapter SSR desnecessário.

```bash
pnpm deploy
```

## Privacidade e GA4

O identificador GA4 é `G-HXM22WWPKP`. O script do Google Analytics só é carregado quando o visitante ativa explicitamente cookies de análise em `/cookies/`.

## Fontes institucionais usadas para o conteúdo

- Prefeitura Municipal de Florianópolis / REPLAN — Ponte Viva
- Governo do Estado de Santa Catarina — Viva a Ponte e Secretaria de Infraestrutura e Mobilidade
- Iphan — patrimônio cultural e centenário da Ponte Hercílio Luz
- Secretaria de Estado do Turismo de Santa Catarina
- Ministério do Turismo

As regras de circulação podem mudar temporariamente por eventos e manutenção; o texto do site orienta o visitante a consultar os canais oficiais.

## Status do pacote

`DELIVERY-STATUS.md` registra o histórico da entrega. O código está com `astro check` 0 erros e build estático concluído (5 páginas).
