# Arquitetura e Restrições do Projeto

Você está trabalhando no projeto **App do Artesão**. Este é um projeto standalone, serverless e "agentic-first" com as seguintes regras Inegociáveis:

## 1. Zero Custo e Standalone
- A aplicação será hospedada no **GitHub Pages**.
- Não há backend Node.js, Python ou qualquer servidor rodando. O "backend" é, na verdade, a camada `logic/` rodando inteiramente no navegador do cliente.
- O armazenamento de dados inicial deve ser feito 100% no navegador (LocalStorage ou IndexedDB). Sincronizações futuras usarão provedores Cloud via OAuth, sem servidor próprio.

## 2. Acessibilidade e Performance
- O app deve ser absurdamente leve e rápido.
- Público-alvo: Profissionais que podem ter dificuldade com tecnologia. UX/UI deve ser óbvia, com textos claros e botões grandes.
- Use estado da arte em JavaScript (ES Modules, Native Web APIs).
- Ferramentas de UI (Shadcn/Tailwind) são permitidas desde que o bundle final seja estático (Vite).

## 3. Arquitetura A-Frame
Baseado nos ensinamentos de James Shore e [Testing Without Mocks](https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks):
- O código é dividido em `logic/` (decisões puras, sem dependências externas), `infrastructure/` (fala com o mundo externo, ex: Network, UI, DB) e `values/` (estruturas de dados imutáveis).
- **Sem Mocks:** Testes automatizados usam instâncias Reais ou "Nullables" da infraestrutura (Embedded Stubs).

## 4. TDD como Primeira Prática
- TODO código de negócio deve ser guiado por testes (Test-Driven Development).
- Escreva a intenção no teste primeiro. Use o Vitest para rodar os testes (`npm test`), preferencialmente dentro do contêiner Docker.

## 5. Desenvolvimento Dockerizado (Remote Dev)
- É TERMINANTEMENTE PROIBIDO instalar dependências locais na máquina host (`npm install` no host).
- Todo o setup, execução de tarefas (build, TDD, lint) deve ser feito dentro de um contêiner (ex: `docker compose run app npm test` ou através de Dev Containers no VSCode/Cursor).

## 6. Manutenção de Contexto
Sempre ao tomar decisões, atualize a documentação em `.agents/` para que os próximos agentes mantenham o padrão.
