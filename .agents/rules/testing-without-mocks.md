# Testing Without Mocks: A Pattern Language (Guidelines)

Este documento detalha as regras e padrões arquiteturais obrigatórios no **App do Artesão**, baseados no artigo [Testing Without Mocks de James Shore](https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks). Todo código deve ser fundamentado nestes princípios.

---

## 1. Foundational Patterns

### State-Based Tests (vs Interaction-Based Tests)
Evite testes baseados em interações (ex: "verificar se função X foi chamada com parâmetro Y"). Prefira testes **baseados em estado**, que checam o resultado do código ou a mudança no estado público.

**💡 Exemplo:**
```javascript
// Ruim: Interaction-Based (usando mocks)
mocker.expect(moon.describePhase).toBeCalledWith(999);
describeMoonPhase(date);
mocker.verify();

// Bom: State-Based (Verifica o comportamento final)
const description = describeMoonPhase(dateOfFullMoon);
assert.equal(description, "The moon is full on December 8th, 2022.");
```

### Overlapping Sociable Tests
Em vez de isolar completamente as classes (mocking), permita que os testes executem as dependências reais (sociáveis) desde que essas não acionem I/O real (use *Nullables* se necessário).

---

## 2. Architectural Patterns

### A-Frame Architecture
A infraestrutura (banco de dados, rede, UI) e a lógica de negócio **jamais** devem se comunicar diretamente. Ambas são coordenadas pela camada de Aplicação (`app/`). O tráfego de dados entre elas acontece através de Value Objects (`values/`).

### Logic Sandwich
O padrão mais comum para a coordenação na camada `app/`. A Aplicação:
1. Lê da Infraestrutura.
2. Passa os dados para a Lógica.
3. Grava o retorno da Lógica de volta na Infraestrutura.

**💡 Exemplo:**
```javascript
const input = infrastructure.readData();     // 1. Lê (Infra)
const output = logic.processInput(input);    // 2. Processa (Logic)
infrastructure.writeData(output);            // 3. Grava (Infra)
```

### Traffic Cop
Para interfaces ou ações que disparam eventos (como cliques ou respostas HTTP), use o Traffic Cop para coordenar Logic Sandwiches mediante eventos.

**💡 Exemplo:**
```javascript
ui.onSaveClick((formData) => {
  const parsedData = parserLogic.parse(formData);
  databaseInfra.save(parsedData);
});
```

---

## 3. Logic Patterns

### Easily-Visible Behavior
A camada de Lógica (`logic/`) deve ser pura (sem dependências externas) e seu comportamento deve ser facilmente observável. Privilegie pure functions ou objetos imutáveis (Value Objects).

**💡 Exemplo:**
```javascript
class Value {
  constructor(initialValue) { this._value = initialValue; }
  plus(addend) { return new Value(this._value + addend); } // Imutável
}
```

---

## 4. Infrastructure Patterns

### Infrastructure Wrappers
Proteja seu código do "mundo exterior" criando `Wrappers` dedicados para cada sistema externo (banco, arquivos, APIs HTTP). A complexidade do mundo real (tratamento de erros, serialização) fica restrita ao Wrapper.

### Narrow Integration Tests
Apenas os Wrappers de Infraestrutura devem possuir "Integration Tests" reais para garantir que funcionam em produção. Códigos de aplicação e lógica não testam a infraestrutura real.

---

## 5. Nullability Patterns

Mocks tornam testes frágeis. Em sua ausência, utilizamos os padrões *Nullables* e *Embedded Stubs* nas frentes de infraestrutura.

### Nullables e Embedded Stubs
Classes de Infraestrutura devem ser projetadas com um Factory Method `createNull()` que embute uma versão em memória (*Embedded Stub*) da dependência externa, permitindo executar toda a lógica sã, mas "desligando" o side-effect externo.

**💡 Exemplo:**
```javascript
class DieRoller {
  // Factory para produção
  static create() {
    return new DieRoller(Math); // Injeta a Math real
  }

  // Factory para testes ("Null")
  static createNull() {
    return new DieRoller(new StubbedMath()); // Injeta o Stub (Embedded Stub)
  }

  constructor(math) { this._math = math; }

  roll() {
    return Math.trunc((this._math.random() * 6) + 1);
  }
}

// Embedded Stub
class StubbedMath {
  random() { return 0; } // Comportamento previsível, sem rede/lado externo
}
```

### Configurable Responses
Quando testamos código que depende de `Nullables`, frequentemente precisamos simular respostas de erro ou valores específicos (ex: Banco de Dados retornando 3 itens em vez de vazio). Permita que o `createNull()` receba configurações de resposta.

**💡 Exemplo:**
```javascript
it("lida com lista pré-existente", async () => {
  // Configura a resposta do wrapper "nulado"
  const dbConfigurado = DatabaseWrapper.createNull([ { id: 1, name: "Teste" } ]);
  const relatorio = new ActionController(dbConfigurado);
  
  assert.equal(relatorio.getTotal(), 1);
});
```

### Output Tracking (Emissor de Comportamento)
Se houver métodos de infraestrutura com side-effects (ex: enviou email, apagou do banco), providencie um rastreador de *output* (`trackXxx()`) via EventEmitters na classe Nullable para verificar a "gravação" usando os paradigmas do Estado.

**💡 Exemplo:**
```javascript
it("grava no log ao salvar", async () => {
  // Configura o Log (Nullable) e ativa o OutputTracker
  const log = Log.createNull();
  const logOutput = log.trackOutput();

  const app = new LoginPage(log);
  await app.postAsync(formData);

  // Verificação Baseada em Estado sobre o tracker
  assert.deepEqual(logOutput.data, [{ alert: "info", message: "User login" }]);
});
```
