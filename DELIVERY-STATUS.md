# Status desta entrega

## Implementado

- Astro + Tailwind CSS + TypeScript, sem banco, login ou CMS.
- Configuração estática para Cloudflare Workers (`assets.directory = ./dist`).
- Versões exatas em `package.json`, `packageManager`, `engines` e `.node-version`.
- `SITE_URL` opcional e centralizado em `astro.config.mjs`; sitemap só é ativado quando `site` existe.
- Página principal em português brasileiro, com identidade visual própria inspirada na estrutura metálica da Ponte Hercílio Luz.
- JSON-LD `TouristAttraction` + `FAQPage`.
- Google Maps localizado em `pt-BR` / `br`.
- GA4 `G-HXM22WWPKP` carregado somente após consentimento de analytics.
- Páginas independentes `/privacidade/`, `/termos/` e `/cookies/`.
- Logo SVG e favicon SVG/16/32/180 locais e coerentes.
- Conteúdo de história, engenharia, visita, custo, melhor horário, duração, transporte, estacionamento, atrações próximas, gastronomia e FAQ.
- Fontes institucionais e associação geográfica/semântica com Florianópolis, Santa Catarina e Brasil.

## Bloqueios do ambiente (não mascarados como sucesso)

1. **JPGs reais**: a pesquisa web encontrou e verificou fotografias reais/licenciadas, mas este runtime bloqueia a transferência de binários da internet para o filesystem. Os seis JPGs esperados pelo layout, portanto, não estão materializados neste rascunho.
2. **pnpm-lock.yaml e build limpo**: o runtime não possui pnpm nem dependências em cache e não consegue alcançar `registry.npmjs.org`. Assim, não foi possível gerar um lockfile sincronizado nem executar `pnpm install --frozen-lockfile`, `pnpm check` e `pnpm build` de forma verdadeira.

Por esses dois motivos, este ZIP é deliberadamente identificado como **rascunho de código-fonte**, e não como pacote final aprovado para produção.

## Verificações locais que puderam ser executadas

- Ausência, no código-fonte, de `example.com`, `localhost`, `chrome-extension://`, `zh-CN`, `Baguio` e placeholders XX/XXX.
- Iframe do Google Maps usa `pt-BR` e `br`.
- Não existe `pnpm-workspace.yaml`.
- Arquivos de logo/favicon locais existem.
