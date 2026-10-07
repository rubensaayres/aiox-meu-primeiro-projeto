# Project Brief: Sistema de Automação Inteligente para Clínicas de Estética

**Status:** Briefing / Discovery
**Author:** @analyst (Atlas)
**Strategic Goal:** Aumentar a conversão de leads e a retenção de clientes através de IA.

## 1. Visão Geral do Problema
Clínicas de estética sofrem com a alta carga operacional de agendamentos manuais, taxas elevadas de *no-show* e a dificuldade de manter a recorrência de tratamentos que exigem manutenção (ex: Botox, Preenchimento). A comunicação é centralizada no WhatsApp, tornando a gestão de dados ineficiente.

## 2. Oportunidades de Solução (Insights de Pesquisa)

### A. Agente de Agendamento & Triagem (Conversacional)
- **Necessidade:** Reduzir o tempo de resposta e a carga da secretária.
- **Solução:** Um agente de IA que interaja via WhatsApp/Web, entenda a necessidade do cliente, verifique a disponibilidade na agenda e realize a marcação.
- **Diferencial:** O agente não apenas agenda, mas faz a **anamnese prévia** (coleta de dados iniciais), qualificando o lead antes mesmo do primeiro contato humano.

### B. Motor de Retenção Preditiva (LTV Boost)
- **Necessidade:** Maximizar a frequência de retorno do cliente.
- **Solução:** Um sistema que monitora a data do último procedimento e dispara lembretes personalizados sugerindo a manutenção no momento ideal.
- **Diferencial:** Uso de dados para sugerir tratamentos complementares baseados no perfil do cliente.

### C. Central de Conhecimento para Pacientes (RAG)
- **Necessidade:** Diminuir dúvidas repetitivas sobre preparo e pós-procedimento.
- **Solução:** Uma base de conhecimento alimentada pelos protocolos da clínica, acessível via IA para respostas instantâneas e precisas.

## 3. Requisitos de Alto Nível (High-Level)
- **Integração:** Necessidade de integração com Google Calendar ou sistemas de agenda similares.
- **Interface:** Dashboard simples para a clínica visualizar os leads qualificados e o calendário de retornos.
- **Privacidade:** Conformidade com a LGPD, dado que lida com dados sensíveis de saúde/estética.

## 4. KPIs de Sucesso
- **Redução de No-Shows:** Diminuir a taxa de faltas através de lembretes inteligentes.
- **Aumento de LTV:** Aumentar a frequência média de visitas por cliente.
- **Eficiência Operacional:** Redução de X% no tempo gasto em agendamentos manuais.

## 5. Sugestão de Abordagem Técnica (Para @architect)
- **Backend:** Node.js com integração de LLM (OpenAI/Anthropic) via LangChain ou similar.
- **Interface:** Next.js para o Dashboard da clínica.
- **Canais:** API do WhatsApp (via Twilio ou Evolution API).
- **Banco de Dados:** PostgreSQL para gestão de clientes e agendamentos.
