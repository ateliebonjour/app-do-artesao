# TASK-012: Implementação - Módulo de Cadastros de Fichas Técnicas

**Épico Pai:** [EPIC-003](../epics/EPIC-003-mvp-cadastro-base.md)
**Status:** `[TODO]`
**Responsável:** Engenheiro Agentic Front-end

## Contexto
É a hora de aplicar a engenharia onde mais importa. Fichas Técnicas são compostas de relacionamentos M:N com Insumos, possuindo multiplicadores e unidade de medida. Estas regras foram detalhadas na Etapa 1 (`TASK-008`) e a interface na `TASK-011`.

**Nota:** Bloqueada pela `TASK-011` (Design UI) e, idealmente, pela Infraestrutura provida pelos Insumos.

## O Que Deve Ser Feito
- TDD robusto baseando-se especificamente nos cenários do Product Lead. Os cálculos de fração/custo *não* podem dar false-positive ou erro em ponto flutuante.
- Integrar a lógica nos mockups Híbridos (Tabela/Card). 
- O usuário deve ver o cálculo dos custos (Soma dos Insumos) atualizar assincronamente (Reactively) na tela sem reloading.
- Persistir via Dexie.js (ou similar na infraestrutura).

## Critérios de Aceite
- [ ] Lógica de domínio imaculada sem quebrar referências.
- [ ] Funcionalidade conectada à UI e persistindo corretamente os relacionamentos.
