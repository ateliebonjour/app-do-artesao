# TASK-003: RFC - Pipeline de CI/CD (GitHub Actions)

**Épico Pai:** [EPIC-001](../epics/EPIC-001-technical-decisions.md)
**Status:** `[TODO]`

## Contexto
O front-end (`Vite` + `Tailwind`) precisa ser gerado (build) e hospedado nas GitHub Pages toda vez que código for mergeado na `main`.

## O Que Deve Ser Feito (Missão para o Agente Especialista)
1. Escrever um arquivo de Workflow do GitHub Actions.
2. Definir no RFC/Workflow que o pipeline deve:
   - Fazer `npm install`
   - Rodar testes (Vitest / TDD da arquitetura A-Frame)
   - Realizar o build estático (`npm run build`)
   - Realizar Deploy usando `peaceiris/actions-gh-pages` ou a action nativa do GitHub Pages.

## Critérios de Aceite
- [ ] Workflow YAML criado e discutido com o CTO.
- [ ] Estrutura mantém o desenvolvimento Docker-first protegido mas roda em Ubuntu `runner` nas actions nativamente por performance.
