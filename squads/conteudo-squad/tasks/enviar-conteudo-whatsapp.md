---
task: Enviar Conteúdo via WhatsApp
responsavel: "@whatsapp"
atomic_layer: task
elicit: true
Entrada:
  - texto_final: O conteúdo revisado pela Vera
  - contato_destino: O lead ou cliente alvo
Saida:
  - status_envio: Confirmação de entrega via CLI
Checklist:
  - "[ ] Adaptar a formatação para a interface do WhatsApp"
  - "[ ] Validar a aprovação humana do rascunho"
  - "[ ] Executar `enviar --para <numero> --texto "..." --confirmado`"
---

# *enviar
Responsável por levar o conteúdo produzido pela squad até o destinatário final, utilizando a Skill de WhatsApp com confirmação obrigatória.
