# Planejamento do Projeto (Agentic First & Human Friendly)

Este diretório contém o planejamento do App do Artesão iterativo e vivo, utilizado tanto por humanos (CTO/Especialistas) quanto por Agentes IA.

## Estrutura

- **/epics/**: Grandes iniciativas ou agrupamentos de funcionalidades/problemas (ex: "MVP de Gestão de Estoque", "Decisões Técnicas de Longo Prazo").
- **/stories/**: Histórias de usuário ou recortes de um Épico que entregam valor (ex: "Como usuário, quero cadastrar um ingrediente").
- **/tasks/**: Tarefas técnicas e acionáveis geradas a partir de Histórias ou Épicos (ex: "RFC sobre Pipeline CI/CD", "Criar componente UI de botão").

## Como utilizar (Para Agentes)
1. Antes de iniciar trabalho autônomo, o Agente pode buscar por arquivos em `tasks/` que estejam com status `[TODO]`.
2. Ao realizar um trabalho, o Agente atualiza o status do Markdown de `[TODO]` para `[IN_PROGRESS]` e, ao terminar, para `[DONE]`.
3. Os arquivos devem utilizar Markdown simples, focando em checklists, links para outros artefatos e referências aos Épicos e Histórias pai.
