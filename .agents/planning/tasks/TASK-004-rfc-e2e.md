# TASK-004: RFC - Testes E2E (Smoke Tests)

**Épico Pai:** [EPIC-001](../epics/EPIC-001-technical-decisions.md)
**Status:** `[TODO]`

## Contexto
Nosso TDD é baseado na Arquitetura A-Frame (testes sub-segundo rodando via Vitest e JSDOM sem Mocks). O JSDOM cobre bastante, mas não tem APIs genuínas de persistência e layout real (CSSOM).

## O Que Deve Ser Feito (Missão para o Agente Especialista)
1. Propor uma suíte de E2E essencialista apenas para os Workflows de ouro (o chamado *Smoke Test* de "Caminho Feliz").
2. Avaliar ferramentas E2E recomendadas (Playwright é o preferido por não precisar de Java como Selenium e ser ultra rapido).

## Critérios de Aceite
- [ ] O RFC recomenda a ferramenta de E2E.
- [ ] O RFC explica como ela vai rodar no CI (usando Docker/GitHub Actions) e localmente sem estragar a máquina host.
- [ ] Descreve o escopo mínimo que os testes E2E terão (focando em não duplicar com os testes rápidos do Vitest).
