---
task: Avaliar Qualidade
responsavel: "@revisor"
atomic_layer: task
elicit: false
Entrada:
  - texto_corrigido: O conteúdo após a revisão
  - objetivo_do_post: O que se espera alcançar com esse post
Saida:
  - veredito: APROVADO ou REJEITADO
  - feedback_detalhado: Justificativa do veredito e sugestões de melhoria
Checklist:
  - "[ ] Avaliar se o conteúdo atende ao objetivo estratégico"
  - "[ ] Verificar se o call-to-action está claro"
  - "[ ] Checar se o conteúdo é seguro para a marca"
---

# *avaliar
Dá o veredito final sobre a qualidade do conteúdo, decidindo se ele está pronto para ir ao ar.
