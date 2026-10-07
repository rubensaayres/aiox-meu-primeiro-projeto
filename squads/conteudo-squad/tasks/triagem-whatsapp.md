---
task: Triagem de WhatsApp
responsavel: "@whatsapp"
atomic_layer: task
elicit: false
Entrada:
  - mensagens_nao_lidas: Comando `nao-lidas` da Skill
Saida:
  - lista_priorizada: Conversas ordenadas por urgência e tipo (lead, cliente, etc)
Checklist:
  - "[ ] Executar `nao-lidas` para identificar pendências"
  - "[ ] Para cada chat, executar `mensagens --chat <id>` para ler o histórico"
  - "[ ] Classificar por categoria (urgente, lead, ruído)"
  - "[ ] Ordenar por custo de não resposta"
---

# *triagem
Utiliza a Skill de WhatsApp para analisar mensagens pendentes e organizar a fila de atendimento por prioridade.
