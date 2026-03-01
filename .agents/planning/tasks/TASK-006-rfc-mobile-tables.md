# TASK-006: RFC - Interação Mobile para Alta Densidade (Tabelas)

**Épico Pai:** [EPIC-002](../epics/EPIC-002-design-definitions.md)
**Status:** `[TODO]`

## Contexto
O usuário artesão lida com quantidades de insumos, planilhas de receitas, e custos detalhados. A introdução inicial se baseia no comportamento estilo Excel/Notion (desktop first). Porém, a maioria do uso para atualizações diárias acontecerá no Whatsapp, precisando de respostas rápidas no celular. O layout de Tabela nativa `<table>` é inútil no mobile sem uma intervenção técnica forte. Precisamos antes testar se usaremos uma técnica de "Scroll com colunas fixas" ou "Cards Mobile".

## O Que Deve Ser Feito (Missão)
1. Iniciar documento `doc/rfcs/RFC-003-mobile-tables.md`, discutindo a dificuldade de layout em UX de Tabelas para preenchimento de inventário e custos.
2. Formular o problema de digitação rápida no celular versus visualização macro de planilhas.
3. Projetar (escrever código Tailwind sujo, focado apenas no formato) dois layouts testáveis.
4. Mostrar ao usuário no browser e simular o cenário de uso "Artesão editando a receita xícaras no trânsito".

## Critérios de Aceite
- [ ] Protótipos das diferentes propostas finalizados e testados.
- [ ] Discussão no RFC sobre viabilidade e limitações de cada padrão em telas minúsculas.
- [ ] O escolhido será portado futuramente a um Componente-Base do nosso projeto oficial.
