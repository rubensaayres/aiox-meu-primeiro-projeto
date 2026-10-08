# Story: Codex como agente principal do AIOX

**Status:** Review
**Story ID:** STORY-04-CODEX-PRIMARY
**Epic:** N/A — story local autorizada pelo usuário, sem Epic ou ClickUp externo
**Executor:** @dev
**Quality Gate:** @architect
**Quality Gate Tools:** `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, validação de skills Codex e sync Codex em dry-run

## Story

Como responsável por este projeto, quero usar o Codex como agente principal de desenvolvimento do AIOX, para trabalhar com instruções e comandos fiéis ao repositório sem interromper o Claude Code.

## Acceptance Criteria

- [x] **AC1 — Instruções Codex fiéis ao repositório:** `AGENTS.md` descreve caminhos existentes, regras AIOX aplicáveis e comandos realmente disponíveis ou documentados no projeto; não apresenta `bin/`, `packages/` ou `tests/` como estrutura presente quando não existem.
- [x] **AC2 — Comandos Codex operacionais:** `package.json` expõe comandos locais para sincronizar/validar a projeção Codex de agentes e sincronizar/validar skills Codex, usando scripts já existentes em `.aiox-core/infrastructure/scripts/`.
- [x] **AC3 — Skills essenciais preservadas:** as 12 skills Codex dos agentes centrais continuam apontando para as definições canônicas em `.aiox-core/development/agents/`; não são duplicadas nem substituídas por projeções Claude.
- [x] **AC4 — Compatibilidade mantida:** nenhum arquivo em `.claude/` ou na integração WhatsApp (`skills/whatsapp/` e `squads/conteudo-squad/`) foi alterado por esta implementação.
- [x] **AC5 — Escopo incremental:** SYNAPSE, hooks, enforcement de `git push` e `wave-execute` não foram migrados; a constituição e a arquitetura AIOX permanecem inalteradas.
- [x] **AC6 — Validação reportada:** lint, typecheck, build, testes e validadores disponíveis foram executados conforme aplicável; falhas e limitações estão registradas sem mascarar o resultado.

## CodeRabbit Integration

> **CodeRabbit Integration**: Configuração ausente
>
> `.aiox-core/core-config.yaml` não define `coderabbit_integration.enabled`.
> Manter os quality gates constitucionais e registrar a disponibilidade de revisão CodeRabbit durante a implementação.

## Tasks / Subtasks

- [x] **T1 (AC1):** Corrigir `AGENTS.md` para refletir a estrutura real, o fluxo de stories, o uso das skills Codex existentes e comandos locais confirmados.
- [x] **T2 (AC2):** Adicionar scripts npm para sincronização/validação direcionadas à projeção Codex, usando entrypoints existentes e sem sync geral que possa modificar `.claude/`.
- [x] **T3 (AC3–AC5):** Verificar paridade das 12 skills e conferir que `.claude/`, WhatsApp, constituição e arquitetura AIOX não foram alterados por esta implementação.
- [x] **T4 (AC6):** Executar os gates disponíveis e registrar limitações preexistentes, incluindo a configuração atual de `npm test`.

## Dev Notes

- Fonte de requisitos: solicitação direta do usuário nesta conversa; sem Epic externo por autorização explícita.
- Constituição: `.aiox-core/constitution.md` — CLI first, story-driven development, autoridade dos agentes, quality gates e portabilidade de squads.
- Instruções do projeto: `AGENTS.md`.
- Scripts existentes: `.aiox-core/infrastructure/scripts/ide-sync/index.js`, `.aiox-core/infrastructure/scripts/codex-skills-sync/index.js`, `.aiox-core/infrastructure/scripts/codex-skills-sync/validate.js` e `.aiox-core/infrastructure/scripts/validate-agents.js`.
- Definições canônicas dos agentes: `.aiox-core/development/agents/`; projeção de skills atual: `.codex/skills/`.
- Não criar nova skill WhatsApp nem modificar a CLI ou arquivos de configuração WhatsApp.
- Evitar `sync:ide` genérico: a configuração habilita Claude e Codex, então sync geral pode atualizar `.claude/`.
- O script atual `npm test` em `package.json` retorna erro “no test specified”; registrar o resultado, sem ampliar o escopo para criar infraestrutura de testes.

## Testing

- `npm run lint` — FAIL: `eslint` não está instalado/disponível no ambiente.
- `npm run typecheck` — FAIL: dependências/tipos ausentes (`axios`, `dotenv/config`, `nodemailer`, `cheerio`, tipos Node); também há erros derivados de tipos implícitos em `scraper.ts`.
- `npm run build` — FAIL na etapa `tsc` pelos mesmos erros de typecheck; Vite não foi executado.
- `npm test` — FAIL: script ainda é o placeholder `Error: no test specified`.
- `npm run validate:agents` — PASS, exit 0; 0 erros e 121 avisos de dependências/arquivos ausentes no framework.
- `npm run validate:codex-skills` — PASS, 12 skills verificadas.
- `npm run sync:ide:codex -- --dry-run` — PASS; preview limitado a `.codex/agents/`.
- `npm run sync:ide:codex -- --verbose` — PASS após autorização de escrita; sincronizou 12 agentes e 4 redirects somente em `.codex/agents/`.
- `npm run sync:ide:check:codex` — PASS, 16/16 sincronizados, sem drift ou ausências.
- `npm run sync:skills:codex -- --dry-run` — PASS; preview de 12 skills sem escrita.
- `git diff --check` — PASS.
- CodeRabbit CLI não está disponível; a propriedade `coderabbit_integration.enabled` também não está definida em `core-config.yaml`.
- Diff revisado: `.claude/` sem alterações; alterações preexistentes em `skills/whatsapp/envios.log` e `squads/conteudo-squad/scripts/squad-runner.js` foram preservadas.

## Dev Agent Record

### Agent Model Used

Codex (modelo da sessão de implementação).

### Debug Log References

N/A.

### Completion Notes List

- Validação PO: **GO / Ready**, com escopo derivado da solicitação direta do usuário.
- Exceção de processo: story local sem Epic e sem ClickUp, autorizada explicitamente pelo usuário.
- CodeRabbit: propriedade de configuração ausente em `core-config.yaml`; a story não presume que a integração esteja desabilitada.
- QA formal pendente: a tarefa `qa-review-story` exige testes automatizados passando antes da revisão, condição ainda não atendida; manter status Review e registrar os bloqueios para @qa.
- A sincronização inicial do Codex foi bloqueada por `EPERM` no sandbox; após autorização para acesso de escrita, a sincronização direcionada concluiu com sucesso.

### Change Log

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 2026-10-08 | 1.0 | Story local criada e validada como Ready; Epic e ClickUp externos dispensados por autorização explícita. | @sm / @po |
| 2026-10-08 | 1.1 | Implementação incremental concluída; sync Codex passou; status Review por quality gates preexistentes não atendidos. | @dev |

### QA Results

**Pendente** — a tarefa AIOX `qa-review-story` requer os testes automatizados aprovados antes de iniciar a revisão. Como lint, typecheck, build e `npm test` falham no estado atual, a revisão formal deve ser retomada por @qa após resolver esses bloqueios. A revisão de diff confirmou que o escopo protegido não foi alterado.

### File List

- `docs/stories/story-04-codex-primary.md`
- `AGENTS.md`
- `package.json`
- `.codex/agents/aiox-developer.md`
- `.codex/agents/aiox-orchestrator.md`
- `.codex/agents/db-sage.md`
- `.codex/agents/github-devops.md`
