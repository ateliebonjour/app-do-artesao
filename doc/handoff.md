# Passagem de Bastão - App do Artesão (Agentic First)

## Status Atual
O projeto passou por um setup inicial arquitetural completo. As seguintes estruturas foram preparadas:
1. **Ferramentas:** `Vite` e `Tailwind CSS v4` foram configurados adequadamente dentro do pipeline de build estático.
2. **Ambiente Remoto:** Todo o código é projetado para rodar em um contêiner Docker (imagem base `node:20-alpine`). Não instale Node no host; use `docker compose exec app <comando>`.
3. **Regras (.agents):** Foram estipuladas regras definitivas sobre TDD, Nullables, Standalone local-first e uso restrito do `createNull()`. Tudo está no diretório `.agents/rules/`.
4. **Workflows:** O fluxo `create_feature.md` detalha exatamente como você deve proceder caso seja instruído a criar uma Feature Nova.

## Próximos Passos
Para quem assumir este repositório nos próximos prompts:
1. Leia as core rules no `.agents/rules/` e os requisitos do `README.md`.
2. Siga fidedignamente o workflow de `create_feature` para cada nova entidade implementada.
3. Foque sempre na acessibilidade e UX fluida para usuários que não são íntimos da tecnologia.

Parabéns e boa sorte aos próximos Agentes e ao CTO!
