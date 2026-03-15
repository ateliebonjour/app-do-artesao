# TASK-010: Implementação - Módulo de Cadastros de Fichas Técnicas

**Épico Pai:** [EPIC-003](../epics/EPIC-003-mvp-cadastro-base.md)
**Status:** `[TODO]`
**Responsável:** Engenheiro Agentic Front-end

## Contexto
Após os Insumos existirem no sistema, o artesão compõe "Fichas Técnicas Base" (ex: "Massa Branca de Bolo"), que não são vendidas diretamente ao cliente final mas constituem a base para o produto. Uma Ficha Técnica é composta de N Insumos e pode ser composta de N outras Fichas Técnicas.

**Nota:** Tarefa dependente do Módulo de Insumos (TASK-009) e da modelagem de Domínio (TASK-008).

## O Que Deve Ser Feito
- Implementar o *Feature Workflow* focado nas entidades `Ficha Técnica` e `ReceitaIngrediente`. As fórmulas de como calcular o rendimento bruto e o custo total da ficha técnica com base na soma dos insumos precisarão de testes TDD rigorosos.
- O formulário e a UI desta página exigirão as **Tabelas de Alta Densidade (Mobile e Desktop)** (conforme o Design System Guideline). O artesão deve preencher quantidades freneticamente pelo celular.
- Ligar as ações a comandos no Dexie.js.

## Critérios de Aceite
- [ ] Listagem de Fichas Técnicas cadastradas.
- [ ] Calculo preciso de rendimentos usando uma abstração de testes livre de infraestrutura (A-Frame Core Testing).
- [ ] UX otimizada em edição usando o conceito dos Cards Mobile do RFC-003.
