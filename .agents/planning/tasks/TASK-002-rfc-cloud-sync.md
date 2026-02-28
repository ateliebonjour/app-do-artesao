# TASK-002: RFC - Estratégia de Sincronização Cloud

**Épico Pai:** [EPIC-001](../epics/EPIC-001-technical-decisions.md)
**Status:** `[DONE]`

## Contexto
Temos que permitir que o usuário salve seus dados na nuvem (Google Drive, OneDrive, etc) futuramente de forma resiliente usando o token OAuth do usuário, para o App do Artesão não ter custo próprio com BD.

## O Que Deve Ser Feito (Missão para o Agente Especialista)
1. Estudar os paradigmas de Sincronização de Software Offline-First (CRDTs vs Event Sourcing vs Last-Write-Wins).
2. Escrever o RFC sobre como e em que formato salvaremos os arquivos na nuvem do cliente.
3. Propor uma abordagem incremental (ex: começar exportando um JSON estúpido antes de abstrair coisas complexas).

## Critérios de Aceite
- [ ] O RFC documenta os prós e contras das abordagens.
- [ ] Arquitetura garante que o App continua sendo Zero Server (Sem back-end do nosso lado).
