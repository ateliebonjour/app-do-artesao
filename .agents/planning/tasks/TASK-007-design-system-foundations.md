# TASK-007: Revisão de Estrutura de Design "Agent-Readable"

**Épico Pai:** [EPIC-002](../epics/EPIC-002-design-definitions.md)
**Status:** `[DONE]`
**Concluída em:** 2026-03-15

## Contexto
O usuário precisa ter a certeza de que a fundação de design criada é "Agentic First" de fato: isso significa que todo o time virtual que for chamado conseguirá estender a plataforma com zero ambiguidade visual guiado pelo código documentado e não ferramentas UI.

## O Que Deve Ser Feito (Missão)
1. Analisar as implementações feitas (`.agents/workflows/design_ui_component.md` e regras de arquitetura no diretório `doc/`).
2. Averiguar e discutir (em comentário de pull/issue ou na thread principal) se os workflows estão claros o suficiente para qualquer agente futuro desenvolver. 
3. Se houver brechas de compreensão técnica, o agente dessa Task deverá criar ou refatorar a infraestrutura de context (`/.agents/rules/ui-design-guidelines.md`) onde listaremos os utilitários CSS e padrões que de fato "viraram lei".

## Critérios de Aceite
- [x] Confirmação documentada de que Agentes de implementação lerão a infra-estrutura no diretório adequado.
  - ✅ Criado `.agents/rules/ui-design-guidelines.md` — documento canônico com 13 seções cobrindo: tokens de cor, tipografia, espaçamento, bordas, sombras, e componentes completos com código Tailwind copiável.
- [x] Definição do processo final entre Mockup Temporário HTML -> Aprovação -> Implementação React.
  - ✅ Seção 13 do guia documenta o fluxo `doc/mockups/*.html → aprovação → Componente React/Vue` com regra de que extensões ao Design System devem ser aprovadas e registradas antes da implementação.

## Entregas
- [`.agents/rules/ui-design-guidelines.md`](../../.agents/rules/ui-design-guidelines.md) — "Bíblia" do Design System v1.0
