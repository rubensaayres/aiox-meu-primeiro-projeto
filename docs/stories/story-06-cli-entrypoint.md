# STORY-06: Corrigir inicialização direta da CLI AIOX

**Status:** Done
**Tipo:** Correção local, sem Epic ou ClickUp externo

## História

Como pessoa desenvolvedora do AIOX, quero iniciar a CLI executando diretamente seu entrypoint, para consultar o help e usar os comandos documentados.

## Contexto

`.aiox-core/cli/index.js` define e exporta `run()`, mas não chama a função quando o arquivo é executado diretamente. O `package.json` não declara um binário nem script da CLI, e a documentação do projeto indica `node .aiox-core/cli/index.js --help` como forma de consulta.

## Critérios de aceitação

1. `node .aiox-core/cli/index.js --help` imprime o help da CLI e termina com código 0.
2. Importar `.aiox-core/cli/index.js` de outro módulo continua expondo `createProgram` e `run` sem iniciar a CLI automaticamente.
3. A correção não altera `package.json`, os módulos de métricas, `.claude/` ou a integração WhatsApp.

## Escopo técnico

- Invocar `run()` apenas quando `index.js` for o módulo principal (`require.main === module`).
- Manter a arquitetura Commander e os exports existentes.

## Validação

- `node .aiox-core/cli/index.js --help`
- `npm run validate:agents`
- `npm run validate:codex-skills`
- `git diff --check`

## Lista de arquivos

- [x] `docs/stories/story-06-cli-entrypoint.md`
- [x] `.aiox-core/cli/index.js`
