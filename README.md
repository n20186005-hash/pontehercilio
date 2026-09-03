# Guia Ponte Hercílio Luz

Site estático em português brasileiro, feito com Astro + Tailwind CSS + TypeScript e preparado para publicação como Cloudflare Worker com assets estáticos.

## Requisitos

- Node.js 24.20.0
- pnpm 11.25.0

## Domínio

O domínio é configurado em um único ponto lógico: a opção `site` do `astro.config.mjs`, alimentada pela variável `SITE_URL`.

- Sem `SITE_URL`: o build continua normalmente; canonical/OG absolutos são omitidos e o sitemap não é ativado.
- Com `SITE_URL`: canonical, Open Graph, JSON-LD e `@astrojs/sitemap` passam a derivar do mesmo domínio.

Exemplo:

```bash
SITE_URL=https://seudominio.com pnpm build
```

## Desenvolvimento

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

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

## Status do pacote desta conversa

Leia `DELIVERY-STATUS.md` antes de publicar. O código e o conteúdo estão preparados, mas este runtime não conseguiu materializar os seis JPGs reais nem gerar/validar o `pnpm-lock.yaml` por bloqueio de transferência de binários e de acesso ao registry npm. O pacote não é apresentado como build final aprovado.
