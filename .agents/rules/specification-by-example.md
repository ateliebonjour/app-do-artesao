# Workflow: Specification by Example (SbE) para Agentes AI

Este documento define o padrão de Especificação por Exemplo (BDD/Gherkin adaptado) que **todos os agentes de produto e engenharia** devem seguir ao detalhar, ler e implementar novas features para o App do Artesão.

## 1. Estrutura de Documentos

A especificação de um novo épico ou funcionalidade se divide em dois artefatos principais:

### A. Documento de Domínio (`.agents/planning/domain/<entidade>.md`)
- **Propósito:** Definir a Linguagem Ubíqua, o Dicionário de Dados e as Regras de Negócio Globais da entidade.
- **Formato:** Markdown padrão contendo a definição da entidade, atributos (tipo, obrigatoriedade) e validações, independente da UI.

### B. Documento de Feature (`.agents/planning/features/<nome-da-feature>.md`)
- **Propósito:** Descrever o comportamento esperado do sistema usando histórias de usuário e cenários de testes executáveis/verificáveis.
- **Formato principal:** Markdown utilizando a sintaxe Gherkin (`Contexto`, `Cenário`, `Dado`, `Quando`, `Então`, `Exemplos`).

### C. Como se Conectam
1. **Épicos** (`EPIC-*.md`) referenciam **Tasks** (`TASK-*.md`).
2. **Tasks** de especificação orientam a criação dos documentos de **Domínio** e **Features**.
3. **Tasks** de engenharia (implementação) contêm links diretos para a `.agents/planning/features/<feature>.md` e `.agents/planning/domain/<entidade>.md`. O agente de engenharia DEVE ler estes arquivos antes de codificar.

## 2. Padrão de Escrita dos Cenários (Gherkin em Markdown)

Para que próximos agentes consigam parsear, entender e implementar testes automatizados sem ambiguidez, os cenários devem seguir esta estrutura exata:

```markdown
# Feature: [Nome da Funcionalidade]

**Como** um [ator/persona]
**Quero** [ação/desejo]
**Para que** [valor de negócio/benefício]

## Cenário: [Breve descrição do comportamento]

**Dado** [um estado inicial ou contexto]
**Quando** [uma ação é tomada interagindo com o sistema]
**E** [ações adicionais com `<variaveis>` delimitadas]
**Então** [o sistema assume um novo estado ou exibe um resultado esperado]

### Exemplos

| variavel_1 | variavel_2 | resultado_esperado |
|---|---|---|
| valor    | valor    | valor              |
```

## 3. Diretrizes para Agentes de Engenharia
Ao receber uma Feature documentada neste padrão:
1. **Desenvolvimento Guiado por Testes (TDD/BDD):** Agentes de engenharia devem primeiro traduzir a tabela de `Exemplos` em testes parametrizados (ex: `test.each` no Vitest) descrevendo os cenários.
2. Os testes devem cobrir de forma estrita as tabelas de exemplo (Happy cases e Edge cases).
3. Somente após o teste falhar (Red), a implementação (Green) deve ser codificada.
