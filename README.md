# Gestor Artesã (nome temporário)

> Sugestão de nome: **ArtesãGestor**, **AteliêGestor**, **ArtesãFácil**, **Gestão Bonjour**

## Sobre o Projeto

O Gestor Artesã é uma aplicação pensada para pessoas artesãs e empreendedoras que desejam gerenciar seu negócio ou arte de forma simples, rápida e intuitiva. Inspirado na rotina do Ateliê Bonjour (@ateliebonjour no Instagram), negócio de Beatriz Souza, o objetivo é migrar todas as funcionalidades hoje feitas em planilhas de Excel para uma aplicação web acessível e prática.

## Funcionalidades Planejadas

- Cadastro das matérias primas/ingredientes
- Cadastro de receitas base (usando matérias primas ou outras receitas base)
- Cadastro de produtos (usando matérias primas ou receitas base) com previsão de custos
- Controle de precificação de produtos
- Sincronização de dados com provedores de Cloud (Google Drive, OneDrive, etc.)

## Princípios do Projeto

- Sempre rápido
- Fácil de usar e intuitivo
- Acessível
- Custo de manutenção zero ou próximo disso

## Tecnologias

- **Front-end Essencialista:** HTML, Vanilla JS e CSS com **Tailwind CSS v4** compilados via **Vite**.
- **Agentic-First:** O projeto possui diretrizes em código (Context as Code) na pasta `.agents/` orientando ferramentas e LLMs a manter o padrão arquitetural.
- **Docker-First:** Proibido instalar dependências Node no Host. Todo gerenciamento via contêineres e **Devcontainers** (`node:20-alpine`).
- Persistência Local via IndexedDB (para atuar Offline e Standalone) com possibilidade futura de sync via Cloud.

## Arquitetura

- Segue o padrão arquitetural [A-Frame](https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks#a-frame-arch)
- Sempre que possível, testes sem mocks conforme proposto por James Shore

## Como rodar e desenvolver

Aviso: **Não instale ferramentas localmente** (ex: Node/npm no Host).

1. Clone o repositório.
2. Certifique-se de ter o Docker e Docker Compose instalados.
3. Suba o ambiente e instale as dependências:
   ```bash
   docker compose up -d
   docker compose exec app npm install
   ```
4. Inicie o servidor Vite:
   ```bash
   docker compose exec app npm run dev
   ```
   E acesse: [http://localhost:5173](http://localhost:5173).

5. (Opcional) Abra o projeto num **Devcontainer** (VSCode / Cursor) que ele automaticamente fará o bind no container.

---

### Diretrizes para IA (Agentes)
**Regra de Ouro:** Antes de implementar uma feature ou testes, leia OBRIGATORIAMENTE os arquivos:
1. `.cursorrules` (Na raiz).
2. O workflow em `.agents/workflows/create_feature.md`.
3. As regras de arquitetura em `.agents/rules/`.

---

Este projeto está em desenvolvimento inicial. Sugestões de nomes e funcionalidades são bem-vindas!

O projeto utiliza **GitHub Actions** para CI/CD. A cada push na branch `main`, os testes são executados e o deploy é feito automaticamente para o GitHub Pages.

## Hospedagem

Esta aplicação será hospedada gratuitamente no GitHub Pages, facilitando o acesso e a manutenção sem custos.
