# STORY-05: Restaurar funcionamento da CLI de métricas do AIOX

**Status:** Done
**Tipo:** Correção local, sem Epic ou ClickUp externo

## História

Como pessoa desenvolvedora do AIOX, quero que os comandos de métricas da CLI tenham os módulos de qualidade dos quais dependem, para que a CLI inicie e permita registrar, consultar, exportar, limpar por retenção e simular métricas.

## Contexto

Os comandos existentes `metrics record`, `metrics show`, `metrics cleanup` e `metrics seed` importam módulos ausentes em `.aiox-core/quality/`. Os contratos são definidos pelos chamadores em `.aiox-core/cli/commands/metrics/`; a persistência documentada é `.aiox/data/quality-metrics.json`, com retenção padrão de 30 dias. A especificação de quality gates existente descreve três camadas: pre-commit, automação de PR e revisão humana.

## Critérios de aceitação

1. `node .aiox-core/cli/index.js --help` inicia sem erro de resolução dos módulos de métricas.
2. `MetricsCollector` implementa somente os métodos usados pelos comandos: `recordRun(layerNum, result)`, `recordPRReview(result)`, `getMetrics()`, `export('csv')` e `cleanup()`.
3. A persistência usa `.aiox/data/quality-metrics.json`, preserva o histórico válido existente e aplica retenção de 30 dias por padrão; `cleanup` aceita o período passado pelo comando.
4. Os dados agregados têm os campos consumidos por `record`, `show` e `cleanup`, incluindo histórico, resumos das camadas e tendências exibidas por `show`.
5. `generateSeedData(options)` fornece a estrutura usada pelo dry-run de `metrics seed`; `seedMetrics(options)` grava dados no caminho documentado e retorna os agregados consumidos pelo comando.
6. `metrics show --format csv` exporta cabeçalho e registros de histórico em CSV.
7. Os comandos são exercitados em modo seguro e não removem dados do projeto durante a validação.
8. A correção não altera `.claude/`, `skills/whatsapp/`, `squads/conteudo-squad/`, `AGENTS.md` ou `package.json`.

## Escopo técnico

- Criar `.aiox-core/quality/metrics-collector.js` com a interface acima e armazenamento JSON compatível com os comandos existentes.
- Criar `.aiox-core/quality/seed-metrics.js` exportando `generateSeedData(options)` e `seedMetrics(options)`.
- Manter as camadas 1, 2 e 3 e os campos opcionais CodeRabbit/Quinn conforme consumidos pelos comandos atuais.
- Não introduzir dependências nem arquitetura adicional.

## Validação

- `node .aiox-core/cli/index.js --help`
- Smoke test de métricas seguro, isolado e sem limpeza destrutiva
- `npm run validate:agents`
- `npm run validate:codex-skills`
- `git diff --check`

## Riscos e cuidados

- Um arquivo JSON existente deve ser lido e atualizado sem descartar registros válidos.
- A limpeza deve remover somente entradas anteriores ao limite de retenção.
- A geração de seed não deve gravar durante `--dry-run`.
- O caminho de armazenamento é relativo ao diretório de execução da CLI; o smoke test deve usar diretório temporário isolado.

## Lista de arquivos

- [x] `docs/stories/story-05-restore-aiox-metrics-cli.md`
- [x] `.aiox-core/quality/metrics-collector.js`
- [x] `.aiox-core/quality/seed-metrics.js`
