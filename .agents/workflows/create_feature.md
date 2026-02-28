---
description: Como criar uma nova feature e manter os padrões "Agentic First" e A-Frame
---

Ao receber a missão de criar uma nova feature, siga rigidamente estes passos. Você não deve pular etapas, pois nosso TDD e arquitetura dependem da ordem construtiva.

## Etapa 1: Planejar os Casos de Uso (Values & Logic)
1. Crie os Value Objects (em `values/`) se novos conceitos surgirem (ex: `Ingredient.js`, `Price.js`).
2. Defina os Casos de Uso / Regras de negócio em `logic/`. Não crie a implementação final ainda.
3. **[TDD]** Crie os arquivos de teste no formato `NomeDaClasse.test.js`.
4. Escreva o primeiro teste (Red). Execute `npm run test:run` para ver falhar.
5. Escreva o código funcional para passar (Green). Refatore (Refactor). Repita até a lógica da feature estar coberta.

## Etapa 2: Preparar a Infraestrutura
Se a feature precisa salvar dados (ex: Cadastro de Receita), não acesse o LocalStorage direto na lógica.
1. Vá até `infrastructure/` e defina um `RecipeRepository.js` (ou use um existente).
2. Garanta que ele implemente a fábrica `createNull()` para simular em memória o estado.
3. Faça TDD para a classe de infraestrutura verificando se o `createNull()` age como esperado em relação à versão real (`create()`).

## Etapa 3: Integrar a Interface do Usuário (UI)
A UI deve ser estúpida. Ela apenas traduz cliques e inputs para instâncias das classes de `logic/`.
1. Em `infrastructure/ui/` ou diretamente na configuração padrão, construa os componentes (seja puro DOM ou Shadcn).
2. Para testar a UI, injete as Nullables da camada de dados (`Database.createNull()`).
3. Interaja com o JSDOM (via Testing Library no Vitest) e verifique se as ações refletem no estado lógico.

## Etapa 4: Commit e Atualização de Contexto
Se houver alguma decisão Nova Arquitetural (ex: um novo IndexedDB wrapper), atualize `doc/architecture.md`. Evite surpresas para os próximos agentes.
