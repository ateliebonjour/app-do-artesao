# A-Frame Architecture (Resumo e Guia Prático)

O padrão arquitetural A-Frame, proposto por James Shore, organiza aplicações em três grandes camadas:

```
   Application/UI     Values
   /            \
  V              V
Logic          Infrastructure
```

## Camadas

- **Application/UI**: Camada de coordenação. Orquestra a comunicação entre lógica e infraestrutura, sem implementar lógica de negócio ou detalhes de infraestrutura. Pode usar padrões como Logic Sandwich ou Traffic Cop.
- **Logic**: Contém toda a lógica de negócio pura, sem dependências de infraestrutura. Fácil de testar com testes de estado.
- **Infrastructure**: Responsável por interagir com sistemas externos (ex: armazenamento, APIs, navegador, localStorage). Cada dependência externa deve ter um wrapper próprio.
- **Values**: Objetos de valor, usados para transferir dados entre Logic e Infrastructure.

## Princípios

- **Infraestrutura e lógica são pares**: Não há dependência direta entre Logic e Infrastructure. Ambas são coordenadas pela Application/UI.
- **Testabilidade**: Lógica é testada com testes de estado. Infraestrutura é testada com testes de integração estreitos e Nullables.
- **Evolução incremental**: Comece simples, evolua a arquitetura conforme o projeto cresce.

## Padrão Logic Sandwich

A camada Application/UI lê dados da infraestrutura, processa com a lógica e grava de volta na infraestrutura:

```js
const input = infrastructure.readData();
const output = logic.processInput(input);
infrastructure.writeData(output);
```

## Padrão Traffic Cop

Para apps baseadas em eventos, a Application/UI escuta eventos de infraestrutura e lógica, coordenando as ações.

## Boas práticas

- **Wrappers de infraestrutura**: Crie classes para cada dependência externa, facilitando testes e isolamento.
- **Nullables**: Implemente versões "nulas" das dependências de infraestrutura para testes rápidos e confiáveis.
- **Factories sem parâmetros**: Facilite a criação de instâncias para testes e produção.
- **Testes de estado**: Prefira verificar o estado/resultados ao invés de interações.

## Estrutura de pastas sugerida

```
/logic         # Lógica de negócio pura
/infrastructure # Wrappers para localStorage, APIs, etc
/values        # Objetos de valor (opcional)
/app           # Camada de orquestração (Application/UI)
/public        # Arquivos estáticos (index.html, style.css, etc)
/doc           # Documentação
```

## Referências
- https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks#a-frame-arch
- https://martinfowler.com/bliki/HexagonalArchitecture.html
