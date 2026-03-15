# EPIC-003: MVP - Módulo de Cadastros e Gestão (Insumos, Fichas Técnicas e Produtos)

**Status:** `[IN_PROGRESS]`
**Responsável:** Product Lead / Equipes de Engenharia (Agentes)

## Descrição
Este épico representa o coração da primeira grande entrega de valor funcional para o App do Artesão. Ele contempla a fundação dos três pilares da gestão artesanal: **Insumos** (Matérias-primas), **Fichas Técnicas** (composições intermediárias) e **Produtos** (o item final comercializado). 

A premissa principal desse épico é utilizar e respeitar as bases técnicas já fundadas: salvamento local *Offline-First* usando Dexie.js (ADR-001) e aderência irrestrita aos padrões do *"Design as Code"* definidos (UI Híbrida e Responsiva aprovada em RFC-002 e RFC-003).

*(Nota: Os requisitos de domínio, comportamentos, campos específicos para cadastros e regras de negócios associadas a estes domínios serão liderados pelo Product Lead em tarefas subsequentes, antes da implementação técnica iniciar).*

## Objetivos
- Permitir a criação, listagem, edição e exclusão de **Insumos**.
- Permitir a criação, listagem, edição e exclusão de **Fichas Técnicas Base** (que podem utilizar Insumos ou outras Fichas Técnicas).
- Permitir a criação, listagem, edição e exclusão de **Produtos Finais** (que englobam fichas técnicas/insumos e consolidam os custos e precificação finais).
- Assegurar a resiliência persistindo tudo no LocalStorage/IndexedDB via estratégia arquitetural *A-Frame* e Testes sem Mocks (Nullables).
- Seguir as leis estritas de UX e estéticas (Tailwind CSS) ditadas pelos guidelines da Vibe Híbrida.

## Tarefas (Tasks) Relacionadas

### Pipeline de Domínio e Requisitos
- [x] [[TASK-008] Especificação por Exemplo: Regras e Atributos para Insumos, Fichas Técnicas e Produtos](../tasks/TASK-008-domain-definition.md)

### Pipeline da Entidade: Insumos
- [x] [[TASK-009] Design UX: Mockup e Interface de Insumos](../tasks/TASK-009-design-insumos.md) — `doc/mockups/insumos-v1.html` ✅
- [ ] [[TASK-010] Implementação: Módulo de Cadastros de Insumos](../tasks/TASK-010-feature-insumos.md)

### Pipeline da Entidade: Fichas Técnicas 
- [x] [[TASK-011] Design UX: Mockup e Interface das Fichas Técnicas](../tasks/TASK-011-design-fichas-tecnicas.md) — `doc/mockups/fichas-tecnicas-v1.html` ✅
- [ ] [[TASK-012] Implementação: Módulo de Cadastros de Fichas Técnicas](../tasks/TASK-012-feature-fichas-tecnicas.md)

### Pipeline da Entidade: Produtos
- [x] [[TASK-013] Design UX: Mockup e Interface de Produtos](../tasks/TASK-013-design-produtos.md) — `doc/mockups/produtos-v1.html` ✅
- [ ] [[TASK-014] Implementação: Módulo de Cadastros de Produtos](../tasks/TASK-014-feature-produtos.md)
