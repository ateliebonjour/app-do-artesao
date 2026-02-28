# Test-Driven Development & Nullables

Você deve aplicar rigorosamente os princípios de TDD e "Testing Without Mocks" descritos por James Shore e Kent Beck.

## Regras de TDD
1. **Red** -> Escreva um pequeno teste que falha. Não crie componentes ou complexidade prematura.
2. **Green** -> Escreva a quantidade mínima de código para o teste passar.
3. **Refactor** -> Limpe o código, remova duplicação, melhore nomes sem alterar comportamento.

## A-Frame e Infrastructure Nullables
- Nunca use Bibliotecas de Mocks (como Jest/Vitest Mocks genéricos para classes de negócio).
- Se precisar testar algo que toca no IndexedDB ou na UI, a classe de Infraestrutura (ex: `DatabaseConnector`) deve possuir uma fábrica estática `createNull()`.
- O `createNull()` retorna uma instância real que não fala com a rede ou o disco, mas armazena o estado em memória ou simula com trackers predefinidos.

```javascript
// Exemplo de Infrastructure class com Nullable
export class LocalStorageDatabase {
  static create() {
    return new LocalStorageDatabase(window.localStorage);
  }

  static createNull(seedData = {}) {
    return new LocalStorageDatabase(new MemoryStorageFallback(seedData));
  }
}
```

- A camada `logic/` instancia os recursos recebidos via dependência, mas a coordenação (Controller/App) amarra a infraestrutura à lógica.

## Executando os Testes
- Rode `npm run test` (ou `vitest`) no terminal.
- Todos os testes devem rodar em `< 1s` de preferência. TDD sem lentidão.
