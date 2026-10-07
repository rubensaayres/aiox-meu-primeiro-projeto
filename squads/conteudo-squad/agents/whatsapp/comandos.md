# Manual de Comandos e Operação — WhatsApp Agent

Este documento serve como referência rápida para a execução de comandos e diretrizes de operação do agente de WhatsApp.

## 🛠️ Comandos da Skill (CLI)

O agente opera através do script `node skills/whatsapp/scripts/whatsapp-cli.js`.

### Operações de Leitura
| Comando | Descrição | Uso Recomendado |
|---|---|---|
| `nao-lidas` | Lista conversas com mensagens pendentes | Início de qualquer ciclo de triagem |
| `conversas` | Lista as últimas conversas ativas | Visão geral de atividade da squad |
| `mensagens` | Lê o histórico de um chat específico | Antes de rascunhar qualquer resposta |
| `contatos` | Busca contatos por nome ou número | Localização de leads específicos |
| `grupos` | Lista grupos participantes | Gestão de comunidades |

### Operações de Envio
| Comando | Descrição | Observação Crítica |
|---|---|---|
| `enviar` | Despacha mensagem de texto ou arquivo | **EXIGE** a flag `--confirmado` |

---

## ⚠️ Matriz de Erros e Bloqueios

| Erro / Sintoma | Causa | Resolução |
|---|---|---|
| **Envio bloqueado** | Falta da flag `--confirmado` | O agente deve solicitar a aprovação humana e adicionar a flag ao comando |
| **Contexto Insuficiente** | Resposta baseada apenas na última mensagem | Executar `mensagens --chat <id>` para ler o histórico completo |
| **Falha de Conexão** | BaseUrl ou Token incorretos no config.json | Revisar `skills/whatsapp/config.json` |

---

## 🛡️ Boas Práticas (Anti-Dor de Cabeça)

Para garantir a saúde dos relacionamentos e a reputação da empresa, as seguintes regras são **inegociáveis**:

1. **Leitura Primeiro:** Ler o histórico antes de escrever. Sempre. Jamais responda "no escuro".
2. **Foco Único:** Um assunto por mensagem. Evite blocos de texto com múltiplos tópicos.
3. **Anti-Spam:** Não mande a mesma mensagem para muitas pessoas. Disparos em massa possuem regras e ferramentas diferentes.
4. **Respeito ao Relógio:** Respeite o horário comercial. Mensagens de madrugada queimam o relacionamento.
5. **Respeito ao Opt-out:** Se o cliente pediu para não receber mais mensagens, registre isso na memória e cesse a comunicação imediatamente.

---
*Referência de Operação — Squad de Conteúdo*
