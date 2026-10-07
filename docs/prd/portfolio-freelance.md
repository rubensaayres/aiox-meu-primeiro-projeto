# PRD: Portfólio Profissional para Freelancers

**Status:** Draft
**Version:** 1.0
**Owner:** @pm (Morgan)
**Architectural Alignment:** Aria (Holistic Fullstack)

## 1. Visão do Produto
O objetivo deste projeto é criar uma presença digital de alta conversão para atrair e converter clientes freelance. O site deve posicionar o desenvolvedor como um especialista capaz de entregar soluções de negócio, e não apenas código.

### 1.1 Objetivo Principal
Transformar visitantes em leads qualificados através da demonstração de competência técnica e resultados comprovados.

### 1.2 Público-Alvo
- Empreendedores e donos de pequenas/médias empresas.
- Gerentes de produto e diretores de tecnologia (CTOs) de startups.
- Recrutadores de agências de software.

---

## 2. Requisitos Funcionais (FR)

### FR1: Landing Page de Alta Conversão (Home)
- **FR1.1 Hero Section:** Headline impactante com a proposta de valor + Subheadline explicativa + CTA principal ("Solicitar Orçamento").
- **FR1.2 Seção de Serviços:** Cards descrevendo as soluções oferecidas (ex: Desenvolvimento Web, Consultoria Técnica, UI/UX).
- **FR1.3 Vitrine de Projetos:** Grid de projetos selecionados com filtros por tecnologia.
- **FR1.4 Prova Social:** Seção de depoimentos de clientes anteriores ou logos de empresas atendidas.
- **FR1.5 Footer:** Links sociais, copyright e link rápido para contato.

### FR2: Detalhamento de Projetos (Case Studies)
- **FR2.1 Página de Detalhe:** Cada projeto deve ter sua própria página.
- **FR2.2 Estrutura do Case:** 
    - Problema enfrentado pelo cliente.
    - Solução implementada (abordagem técnica).
    - Resultado alcançado (ex: "aumento de 20% na conversão").
    - Stack tecnológica utilizada.
- **FR2.3 Links Externos:** Link para o site ao vivo e link para o repositório (se público).

### FR3: Captura de Leads (Contato)
- **FR3.1 Formulário de Contato:** Nome, E-mail, Assunto e Mensagem.
- **FR3.2 Validação:** Validação de campos obrigatórios e formato de e-mail.
- **FR3.3 Integração:** Envio de e-mail ou salvamento em banco de dados/CMS.

### FR4: Blog/Artigos Técnicos (Autoridade)
- **FR4.1 Feed de Artigos:** Lista de postagens para demonstrar domínio técnico.
- **FR4.2 Leitura Otimizada:** Página de artigo com suporte a Markdown e sintaxe de código (syntax highlighting).

---

## 3. Requisitos Não Funcionais (NFR)

| ID | Atributo | Requisito | Severidade |
|----|-----------|-----------|------------|
| NFR1 | Performance | LCP < 2.5s e Score PageSpeed > 90 (Mobile/Desktop) | CRITICAL |
| NFR2 | Responsividade | Experiência perfeita em Mobile, Tablet e Desktop | CRITICAL |
| NFR3 | SEO | Meta tags dinâmicas, Sitemap e JSON-LD para cada projeto | HIGH |
| NFR4 | Acessibilidade | Conformidade com WCAG 2.1 (nível AA) | MEDIUM |
| NFR5 | Segurança | Proteção contra spam no formulário de contato | HIGH |

---

## 4. Roadmap de Implementação (Epics)

### Epic 1: Core Infrastructure (MVP)
- Setup do projeto (Next.js, Tailwind, TypeScript).
- Criação da Home Page básica com Hero e Seção de Contato.
- Implementação da estrutura de roteamento.

### Epic 2: Showcase de Projetos
- Implementação do sistema de conteúdo via MDX.
- Criação da página de listagem de projetos e páginas de detalhe.
- Implementação de filtros de tecnologia.

### Epic 3: Autoridade e Conversão
- Implementação do Blog/Artigos.
- Refinamento de UI/UX com Framer Motion.
- Configuração de SEO avançado e deploy na Vercel.

---

## 5. Métricas de Sucesso
- **Taxa de Conversão:** Porcentagem de visitantes que preenchem o formulário de contato.
- **Tempo de Permanência:** Tempo médio gasto nas páginas de Case Studies.
- **Origem do Lead:** Rastreamento de qual canal trouxe o cliente.
