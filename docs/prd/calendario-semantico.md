# PRD: Módulo de Calendário Semântico para Automação de Estética (v1.0)

## 1. Visão Geral
O Módulo de Calendário Semântico é uma extensão do Sistema de Automação Inteligente para Clínicas de Estética. Seu objetivo é automatizar a curadoria de datas comemorativas e oportunidades de marketing baseadas em palavras-chave fornecidas pelo usuário, transformando dados brutos em um calendário editorial estratégico.

## 2. Objetivos de Negócio
- **Eliminar o trabalho manual** de busca por datas comemorativas do nicho de estética.
- **Garantir a precisão** das datas para evitar erros de postagem em redes sociais.
- **Prover insights semânticos**, correlacionando termos técnicos de estética com eventos globais ou locais.

## 3. Jornada do Usuário
1. **Configuração:** O usuário vincula seu Google Drive e indica o arquivo de palavras-chave (ex: "Botox", "Limpeza de Pele", "Outubro Rosa").
2. **Processamento:** 
   - O sistema extrai as palavras.
   - A IA analisa a semântica de cada termo.
   - A IA busca datas comemorativas relacionadas (ex: "Dia do Esteticista", "Dia da Saúde").
3. **Validação:** O sistema cruza as datas sugeridas com o calendário real do ano vigente.
4. **Entrega:** O usuário recebe um relatório via e-mail com a agenda de datas e sugestões de temas.

## 4. Requisitos Funcionais (RF)
| ID | Requisito | Descrição | Prioridade |
|----|-----------|-----------|------------|
| RF01 | Integração Google Drive | Autenticação via Service Account para leitura de arquivos TXT/Sheets. | Crítica |
| RF02 | Motor de Análise Semântica | Uso de LLM para correlacionar palavras $\rightarrow$ datas comemorativas. | Crítica |
| RF03 | Validador de Calendário | Verificação de datas reais para evitar alucinações de IA. | Crítica |
| RF04 | Geração de Relatório | Formatação dos resultados em tabela clara e concisa. | Alta |
| RF05 | Notificação via E-mail | Envio automático do relatório para o e-mail do administrador. | Alta |
| RF06 | Agendamento (Cron) | Execução automática diária às 08:00 AM. | Média |

## 5. Requisitos Não-Funcionais (RNF)
- **Segurança:** Tokens e chaves de API armazenados exclusivamente em `.env`.
- **Confiabilidade:** Implementação do Artigo IV da Constituição AIOX (No Invention) para proibir datas inventadas.
- **Tecnologia:** Backend em Python 3.x.
- **Performance:** O processamento total não deve exceder 5 minutos por execução.

## 6. Regras de Negócio
- **RN01:** Se nenhuma data for encontrada para uma palavra-chave, o sistema deve informar "Nenhuma data relevante encontrada" em vez de sugerir datas genéricas.
- **RN02:** A prioridade de datas deve seguir a ordem: Datas Internacionais $\rightarrow$ Datas Nacionais $\rightarrow$ Datas Regionais.

## 7. Critérios de Aceite (DoD)
- [ ] O sistema lê com sucesso arquivos do Google Drive.
- [ ] A IA identifica corretamente datas ligadas a termos de estética.
- [ ] As datas enviadas por e-mail coincidem com o calendário real.
- [ ] O e-mail é entregue no horário agendado.
