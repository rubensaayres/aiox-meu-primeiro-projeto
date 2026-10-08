# AGENTS.md - Synkra AIOX (Codex CLI)

Este arquivo define as instrucoes do projeto para o Codex CLI.

<!-- AIOX-MANAGED-START: core -->
## Core Rules

1. Siga a Constitution em `.aiox-core/constitution.md`
2. Priorize `CLI First -> Observability Second -> UI Third`
3. Trabalhe por stories em `docs/stories/`
4. Nao invente requisitos fora dos artefatos existentes
<!-- AIOX-MANAGED-END: core -->

<!-- AIOX-MANAGED-START: quality -->
## Quality Gates

- Siga os quality gates de `.aiox-core/constitution.md`: `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`.
- O script atual de `npm test` ainda é um placeholder que termina com erro; execute-o e reporte esse resultado até que exista uma suíte configurada.
- Atualize checklist e file list da story antes de concluir.
<!-- AIOX-MANAGED-END: quality -->

<!-- AIOX-MANAGED-START: codebase -->
## Project Map

- Core framework e agentes canônicos: `.aiox-core/`
- AIOX CLI: `node .aiox-core/cli/index.js`
- Aplicação: `src/`
- Stories e documentação: `docs/`
- Squads e seus artefatos: `squads/`
- Skills Codex dos agentes centrais: `.codex/skills/`
<!-- AIOX-MANAGED-END: codebase -->

<!-- AIOX-MANAGED-START: commands -->
## Common Commands

- `node .aiox-core/cli/index.js --help` (CLI AIOX)
- `npm run sync:ide:codex` (sincroniza somente `.codex/agents/`)
- `npm run sync:ide:check:codex` (valida somente a projeção de agentes Codex)
- `npm run sync:skills:codex`
- `npm run validate:codex-skills`
- `npm run validate:agents`
<!-- AIOX-MANAGED-END: commands -->

<!-- AIOX-MANAGED-START: shortcuts -->
## Agent Shortcuts

Ative os agentes pelo skill correspondente `aiox-<agent-id>` em `.codex/skills/` (pelo seletor de skills do Codex, quando disponível) ou peça diretamente pelo papel, como `@dev` ou `@architect`.

As definições em `.aiox-core/development/agents/` são a fonte canônica; `.codex/agents/` é uma projeção auxiliar. Os comandos `*...` são instruções de fluxo para o agente, não comandos de shell. A CLI real pode ser consultada com `node .aiox-core/cli/index.js --help`.

As skills de agente orientam a leitura da definição canônica, a saudação via `node .aiox-core/development/scripts/generate-greeting.js <agent-id>` e a permanência no papel até o pedido de saída.
<!-- AIOX-MANAGED-END: shortcuts -->
