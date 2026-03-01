---
description: Como projetar e iterar componentes e telas na abordagem "Agentic First"
---

# Fluxo de Trabalho de Design de UI (Agentic First)

Este workflow define como um Agente de IA e o Usuário (Lead de Produto/Design) devem criar, iterar e aprovar novos elementos visuais sem o uso de ferramentas visuais tradicionais (ex: Figma).

O objetivo fundamental é **"Design as Code"** e **"Context as Code"**.

## Passo 1: Levantamento de Requisitos e Restrições de UX
1. O Agente de IA deve consultar as ADRs de Design existentes (`doc/adrs/`) para entender o direcionamento visual do projeto (Cores, Vibe, Padrões Mobile vs Desktop).
2. Entrevistar o Usuário (se necessário) para capturar o "User Flow" principal:
   - *Onde o usuário vai clicar?*
   - *O que acontece no celular vs computador?*
   - *Quais os estados de erro/sucesso esperados?*

## Passo 2: Rascunho Funcional Isolado (Playground)
### Regra de Ouro: Nunca integrar ao framework (React/Next) prematuramente.
1. Crie um arquivo HTML isolado na pasta `doc/mockups/` ou um diretório temporário amigável.
2. Use CDN do Tailwind CSS (versão atual do projeto) e importe ícones (ex: Lucide) via CDN.
3. Escreva o componente ou tela completa usando apenas HTML semântico e classes Tailwind para focar 100% na estética e responsividade estrutural.
4. Adicione Javascript mínimo no `<script>` apenas para demonstrar comportamentos visuais críticos (ex: abrir modal, alternar tabs, toggle menu).

## Passo 3: Revisão por Código (Review Loop)
1. O Agente deve notificar o usuário apontando para o arquivo HTML gerado para que ele possa abrí-lo no navegador e inspecioná-lo.
2. O usuário fará apontamentos qualitativos de Design ("Aumente o espaçamento", "A cor está muito pálida").
3. O Agente itera rapidamente no arquivo HTML até a aprovação.

## Passo 4: Integração (Tech Handoff)
1. Com o Design aprovado, outro workflow de implementação (ex: `/create_feature`) ou agente assumirá.
2. O Agente deverá traduzir o HTML estático aprovado para componentes reutilizáveis da stack do projeto (React/Shadcn), mantendo 1:1 o mapeamento das classes Tailwind.
3. Registrar no arquivo do Design System (`.agents/rules/ui-design-guidelines.md` ou similar) se um novo padrão foi criado (ex: "Novo padrão de Card Móvel definido na Feature X").
