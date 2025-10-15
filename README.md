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

- HTML, CSS e JavaScript puro
- Possibilidade futura de build para Android/iOS

## Arquitetura

- Segue o padrão arquitetural [A-Frame](https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks#a-frame-arch)
- Sempre que possível, testes sem mocks conforme proposto por James Shore

## Como rodar

1. Clone o repositório
2. Abra o arquivo `index.html` em seu navegador
3. Para desenvolvimento local, pode-se usar um servidor simples:
   ```bash
   cd /caminho/do/projeto
   python3 -m http.server 8000
   ```
   E acesse: http://localhost:8000

---

Este projeto está em desenvolvimento inicial. Sugestões de nomes e funcionalidades são bem-vindas!

## Hospedagem

Esta aplicação será hospedada gratuitamente no GitHub Pages, facilitando o acesso e a manutenção sem custos.
