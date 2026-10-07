---
name: dev-coding-standards
description: Padrões de codificação e estilo para o agente de desenvolvimento (@dev)
metadata:
  type: project
---

# Padrões de Desenvolvimento (@dev)

Este documento define as diretrizes obrigatórias para a implementação de código no projeto.

## Frontend & UI
- **HTML Semântico:** Sempre utilizar tags semânticas (`<main>`, `<section>`, `<article>`, `<nav>`, etc.) com o atributo `lang="pt-BR"` na tag `<html>`.
- **CSS Mobile First:** A estilização deve ser escrita primeiramente para dispositivos móveis, utilizando media queries para expandir a interface em telas maiores.
- **Variáveis CSS:** Todas as cores e tokens de design do projeto devem ser centralizados em variáveis CSS (ex: `--cor-primaria`, `--cor-fundo`).
- **Nomenclatura de Classes:** Os nomes das classes CSS devem ser escritos em **português** para manter a consistência com a documentação e a equipe.

## Git & Versionamento
- **Commits:** Devem ser escritos em **português**.
- **Padrão:** Utilizar *Conventional Commits* (ex: `feat:`, `fix:`, `docs:`, `chore:`, `style:`, `refactor:`, `test:`, `perf:`).
- **Referência:** Sempre referenciar a Story correspondente no final da mensagem (ex: `feat: implementa validação de formulário [Story 03]`).

**Why:** Garantir acessibilidade, manutenibilidade e consistência linguística em todo o ciclo de vida do desenvolvimento.
**How to apply:** O agente `@dev` deve validar cada arquivo criado e cada commit realizado contra estes critérios antes de marcar a task como completa.

Links relacionados: [[constitution-aiox]]
