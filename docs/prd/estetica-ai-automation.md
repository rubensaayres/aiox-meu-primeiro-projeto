# PRD: Sistema de Automação Inteligente para Clínicas de Estética

**Status:** Draft
**Version:** 1.0
**Owner:** @pm (Morgan)
**Architectural Alignment:** Aria
**Strategic Goal:** Maximizar a receita de clínicas de estética através da redução de *no-shows* e aumento do *Life Time Value* (LTV) via IA.

---

## 1. Visão do Produto
O produto é um ecossistema de automação conversacional e preditiva. Ele atua na intersecção entre o marketing (atração de leads) e a operação (agendamento e retenção), eliminando o gargalo humano da secretária em tarefas repetitivas e transformando o agendamento em uma experiência de consultoria.

### 1.1 Proposta de Valor
- **Para a Clínica:** Mais consultas confirmadas, menos tempo em tarefas manuais e previsibilidade de receita.
- **Para o Cliente:** Agendamento instantâneo, lembretes precisos e sensação de cuidado personalizado.

---

## 2. Requisitos Funcionais (FR)

### FR1: Agente de Agendamento & Triagem Conversacional (The Concierge)
- **FR1.1 Interface Omnichannel:** Integração primária via WhatsApp (API) e Widget Web.
- **FR1.2 Triagem Inteligente (Anamnese):** A IA deve coletar dados iniciais (ex: "Qual procedimento deseja?", "Já fez esse tratamento antes?", "Tem alguma contraindicação?") antes de oferecer horários.
- **FR1.3 Sincronização de Agenda:** Integração em tempo real com Google Calendar/Outlook para leitura de disponibilidade e escrita de agendamentos.
- **FR1.4 Qualificação de Lead:** Classificação automática do lead (ex: "Alta Intenção", "Apenas Curioso") com base nas respostas da triagem.

### FR2: Motor de Retenção Preditiva (LTV Booster)
- **FR2.1 Monitoramento de Ciclo:** O sistema deve rastrear a data do último procedimento (ex: Botox dura ~6 meses).
- **FR2.2 Gatilhos de Re-engajamento:** Disparo automático de mensagem personalizada 15-30 dias antes do vencimento do efeito do tratamento.
- **FR2.3 Sugestão de Cross-sell:** Sugerir tratamentos complementares com base no histórico do cliente (ex: quem faz preenchimento pode ter interesse em bioestimuladores).

### FR3: Base de Conhecimento RAG (Patient Support)
- **FR3.1 Ingestão de Protocolos:** Upload de PDFs/Docs com as regras e cuidados da clínica.
- **FR3.2 FAQ Instantâneo:** Respostas precisas sobre preparo (ex: "Posso tomar sol antes do peeling?") e pós-procedimento.
- **FR3.3 Escalada Humana:** Detecção de dúvidas complexas ou reclamações, transferindo a conversa imediatamente para a secretária humana.

### FR4: Dashboard de Gestão (Clinic View)
- **FR4.1 Kanban de Leads:** Visualização dos leads qualificados pela IA e seu status.
- **FR4.2 Calendário de Retornos:** Visão geral de quais clientes devem ser reativados no mês.
- **FR4.3 Métricas de Conversão:** Gráfico de "Leads Atendidos" vs "Consultas Marcadas".

---

## 3. Requisitos Não Funcionais (NFR)

| ID | Atributo | Requisito | Severidade |
|----|----------|-----------|------------|
| NFR1 | Privacidade | Conformidade total com a LGPD (dados de saúde são sensíveis) | CRITICAL |
| NFR2 | Latência | Resposta da IA no WhatsApp em menos de 5 segundos | HIGH |
| NFR3 | Disponibilidade | Sistema disponível 24/7 para agendamentos | HIGH |
| NFR4 | Usabilidade | Dashboard da clínica deve ser operável por pessoas não-técnicas | MEDIUM |

---

## 4. Roadmap de Implementação (Epics)

### Epic 1: The Conversational Core (MVP)
- Setup de infraestrutura (Node.js, PostgreSQL, LLM).
- Integração com WhatsApp (Evolution API/Twilio).
- Fluxo básico de agendamento sincronizado com Google Calendar.

### Epic 2: Intelligence & Knowledge (RAG)
- Implementação do banco de vetores para a Base de Conhecimento.
- Fluxo de triagem/anamnese automatizado.
- Sistema de detecção de intenções para escalada humana.

### Epic 3: Retention Engine & Dashboard
- Lógica de disparos preditivos baseada em datas.
- Dashboard Next.js para gestão de leads e métricas.
- Refinamento de UX para a dona da clínica.

---

## 5. Métricas de Sucesso (KPIs)
- **Taxa de No-Show:** Redução de $\geq 30\%$ nas faltas não avisadas.
- **Taxa de Conversão:** Aumento de $\geq 20\%$ de leads transformados em consultas.
- **LTV Increase:** Aumento na frequência de retornos anuais por cliente.
