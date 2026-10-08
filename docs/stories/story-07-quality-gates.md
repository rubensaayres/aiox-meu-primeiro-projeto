# STORY-07: Restaurar os quality gates locais

**Status:** Ready for Review
**Tipo:** Correção local, sem Epic ou ClickUp externo

## História

Como pessoa desenvolvedora, quero executar lint, typecheck, testes e build no projeto, para validar as alterações antes de publicá-las.

## Critérios de aceite

- [x] `npm run lint` executa o ESLint configurado para TypeScript e TSX.
- [x] `npm run typecheck` resolve as dependências e tipos importados pelo código em `src/`.
- [x] `npm test` executa testes reais via runner nativo do Node, incluindo smoke da CLI e interfaces de métricas.
- [x] `npm run build` conclui a compilação TypeScript e o build Vite.
- [x] Dependências e lockfile permanecem sincronizados.
- [x] CodeRabbit documentado como opcional/indisponível; a ausência não bloqueia os quality gates obrigatórios ou agentes AIOX.

## Validação

- `npm run lint` — PASS.
- `npm run typecheck` — PASS.
- `npm test` — PASS, 2 testes de smoke.
- `npm run build` — PASS; bundle Vite gerado.
- `npm run validate:port-denylist` — PASS, 1.100 arquivos verificados.
- `npm audit --offline=false` — PASS, 0 vulnerabilidades conhecidas.
- `git diff --check` — PASS.
- CodeRabbit — SKIPPED por indisponibilidade indicada pelo usuário; nenhuma instalação ou alteração de configuração da ferramenta foi feita.

## Lista de arquivos

- [x] `package.json`
- [x] `package-lock.json`
- [x] `tsconfig.json`
- [x] `.eslintrc.cjs`
- [x] `tests/cli.test.js`
- [x] `.aiox-core/infrastructure/scripts/validate-port-denylist.js`
- [x] `.aiox-core/development/tasks/github-devops-pre-push-quality-gate.md`
- [x] `.aiox-core/development/agents/devops.md`
- [x] `.codex/agents/devops.md` (projeção sincronizada)
- [x] `.claude/skills/AIOX/agents/devops/SKILL.md` (projeção sincronizada)
- [x] `.gemini/rules/AIOX/agents/devops.md` (projeção sincronizada)
- [x] `.kimi/skills/aiox-devops/SKILL.md` (projeção sincronizada)
- [x] `postcss.config.js`
- [x] `src/index.css`
- [x] `docs/stories/story-07-quality-gates.md`
