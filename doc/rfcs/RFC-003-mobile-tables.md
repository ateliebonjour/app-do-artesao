# RFC-003: Interação Mobile para Alta Densidade de Dados (Tabelas)

**Status:** `[DRAFT]` / Em Teste
**Contexto de Origem:** [TASK-006](../../.agents/planning/tasks/TASK-006-rfc-mobile-tables.md)

## Problema
O registro de um Novo Cadastro Diário, como a receita de um Bolo Mousse, exige ingredientes variados em colunas com: Quantidade Relativa, Categoria, Unidade, Custo, etc. Em um Tablet/Desktop horizontal, esta matriz é o layout ideal (estilo "Notion"/Planilha).
No entanto, no seu dia-a-dia de vendas pelo Whatsapp, o celular não suporta esse tipo de Tabela em sua forma original. A digitação vira um tormento, piorando com a abertura inevitável do "Teclado Virtual", que engolirá 50% da altura já apertada de tela.

O que faremos para conciliar a Alta Densidade necessitada no cadastro versus o espaço e pragmatismo mobile?

## Opções Propostas e Protótipos

Criamos 2 maquetes de prova-de-conceito (PoC) baseadas em HTML+Tailwind visando unicamente validar a ergonomia dos 2 caminhos técnicos listados na Task: 

*(Para testar fielmente: Abra os arquivos no navegador de um Celular ou ative o DevTools Mode "Responsive/Device" do seu browser - `F12 > Toggle Device Toolbar`)*

### Opção 1: Responsive Cards (Transformação de Tabela em Cartões Editáveis)
- **Foco:** Abordagem "Mobile Nativa" Absoluta.
- **Funcionamento:** Em telas pequenas, a visualização colapsa. Cada linha (ingrediente) atua como um bloco empilhado (card) descrevendo os metadados (como etiqueta). Um botão "Editar" abre modal/expande o card para alterar colunas (custo/quantidade) sem scroll horizontal.
- **Vantagem:** Evita a frustração terrível do scroll lateral infinito enquanto edita. O teclado do celular só abre focado no input relevante.
- **Desvantagem:** Péssima visão holística da receita de forma rápida. Perde a natureza de "Preenchimento rápido e contínuo da planilha com TABs" para uma interação mais lenta (clica -> abre modal -> digita -> salva -> próximo).
- **Protótipo Interativo:** [doc/mockups/mobile-tables/1-cards.html](../../mockups/mobile-tables/1-cards.html)

### Opção 2: Scroll Horizontal de Dados Congelados
- **Foco:** Visão Analítica Resgatada (Estilo Planilha Excel Mobile).
- **Funcionamento:** O componente continuará a se comportar como uma tabela em tela pequena. Para permitir a visualização, estipula-se que a 1ª coluna (Nome do Componente) torna-se com posição "Sticky" à margem esquerda, enquanto o resto vira área rolável. Input Boxes são encolhidas.
- **Vantagem:** Muito familiar a quem já operava um Excel pelo Google Drive. Preservação macro do custo, sem perder as colunas de métricas.
- **Desvantagem:** Toque confuso, pois ao tentar scrollar a tela pra baixo, o usuário pode travar no scroll lateral da tabela. A digitação fica minúscula.
- **Protótipo Interativo:** [doc/mockups/mobile-tables/2-data-grid.html](../../mockups/mobile-tables/2-data-grid.html)

## Discussão (Comentários para a Liderança)

**(Como especialista UI/UX baseando-me em produtos de inventário rápido (ex. aplicativos Módulo PDV)):**
- **[@Design Lead Antigravity]**: Eu tenho fortes indícios de que, pelo volume de uso e digitação apressada sob estresse, a manipulação de um Grid Scroll no Celular é um tiro no pé gigantesco (Opção 2) no quesito frustração. A fluidez nativa da Opção 1 (Cards expansíveis) parece melhor como solução mobile. No computador ela pode virar Tabela densa automaticamente pelo *CSS Grid*. Porém, preciso que teste os 2 mocks enviadas para aprovar. Se o usuário exigir modelo "Excel pra tudo sempre", os grids são inevitáveis. Como você testou ali e preferiu?
- **[Lucas / Usuário]**: Perguntou se era possível usar o Card para mobile, mas usar o Data Grid no Desktop.

> [!IMPORTANT]
> **Veredito do Lead Designer:** `✅ Design Responsivo Híbrido Aprovado`.
> Como provado pelo protótipo secundário (`3-responsive.html`), nós vamos utilizar CSS puro (Media Queries via Tailwind, ex: `md:grid`, `hidden md:block`) para criar **um único componente** Vue/React. 
> - No Celular (`< 768px`), as divs colapsam no modo **Card** (Opção 1) com target zones amigáveis para os dedos. 
> - No Desktop (`>= 768px`), o mesmo HTML expande sua propriedade CSS Grid usando `grid-cols-12` e simula nativamente a tabela **Data Grid** (Opção 2), aproveitando todo o monitor. 
> - Essa solução resolve o calcanhar de aquiles da usabilidade de ambos os lados perfeitamente.
