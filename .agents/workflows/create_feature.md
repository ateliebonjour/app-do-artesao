---
description: Como criar uma nova feature e manter os padrões "Agentic First" e A-Frame
---

Ao receber a missão de criar uma nova feature, o projeto obedece rigorosamente um pipeline "Agentic First" de 3 etapas principais. Nenhuma etapa deve ser ignorada ou iniciada sem que a anterior esteja com status `[DONE]`.

## Etapa 1: Especificação por Exemplo de Produto (Product Lead)
Nesta etapa, o Agente assume o papel de **Product Lead** e trabalha junto com o usuário para descrever as regras de negócio em um formato acionável.
1. Crie ou valide um documento de domínio na pasta `.agents/planning/tasks/` focado em **Especificação por Exemplo** (BDD/Gherkin ou cenários práticos detalhados).
2. Não descreva apenas tipos de dados ("Nome é string"), descreva comportamentos ("Dada uma ficha técnica sem insumos, ao calcular o custo, o valor deve ser zero").
3. Finalize a especificação obtendo aprovação do usuário.

## Etapa 2: Design UX/UI e Mockups (Design Specialist)
Com os requisitos e dados da Etapa 1 em mãos, o Agente assume o papel de **Especialista de Design**.
1. Consulte os componentes já validados no `.agents/rules/ui-design-guidelines.md`.
2. Projete a nova interface visual da funcionalidade em HTML estático usando Tailwind CSS v4, alinhando-se aos princípios da Vibe Híbrida.
3. Salve o mockup temporário visual (se necessário) em `doc/mockups/` ou implemente diretamente o componente de visualização.
4. O Design só é considerado `[DONE]` após avaliação visual do usuário ou do Lead (Human in the loop).

## Etapa 3: Implementação (Software Engineer)
Com a especificação aprovada e a interface validada via Mockups, o Agente Especialista em **Engenharia de Software** entra em ação.

### 3.1: Planejar os Casos de Uso (Values & Logic)
1. Crie os Value Objects (em `logic/values/` ou similar) se novos conceitos surgirem (ex: `MeasurementUnit.js`).
2. Defina os Casos de Uso / Lógica de Domínio.
3. **[TDD]** Crie os arquivos de teste unitário. Escreva o primeiro teste falhando (Red), faça-o passar (Green), e refatore (Refactor).

### 3.2: Infraestrutura de Dados Local
1. Implemente o repositório em `infrastructure/` integrando ao Dexie.js / IndexedDB.
2. Certifique-se de que a implementação respeita a arquitetura **A-Frame** e inclua fábricas `createNull()` para simular as respostas em memória (Testing Without Mocks).

### 3.3: Integração do Frontend
1. Consuma o Layout validado na Etapa 2.
2. Conecte os eventos do HTML aos Casos de Uso da Camada Lógica (Etapa 3.1).
3. A UI deve ser despida de regras de negócio; apenas exibe dados e capta intenções do usuário.

## Etapa Final: Commit e Encerramento
Atualize os arquivos da pasta `.agents/planning/` com a feature concluída, mova as tarefas para `[DONE]` e realize o `git commit` e `git push` seguindo as regras do projeto. Se houver atualizações na arquitetura macro, anote em um ADR.
