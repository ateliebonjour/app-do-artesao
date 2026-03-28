# Backend (Logic & Infrastructure Layer) Code Style Guidelines

Estas regras se aplicam às camadas `logic/`, `infrastructure/` e `values/` do projeto **App do Artesão**. Mesmo não havendo um servidor Node.js (o código roda no cliente), esta é a "camada de Backend" conceitual do sistema.

## 1. Responsabilidades da Lógica Pura (`logic/`)
- A Lógica deve ser 100% pura, contendo apenas regras de negócio.
- **Proibido:** Importar window, document, fetch, localStorage, IndexedDB, Date.now() (se imprevisível), Math.random() ou qualquer IO não determinístico.
- Caso precise de imprevisibilidade (tempo, random), tais dependências devem vir como parâmetros (Inversão de Controle) ou passadas através dos wrappers da Infraestrutura.

## 2. Responsabilidades da Infraestrutura (`infrastructure/`)
- Apenas a Infraestrutura interage com o "mundo exterior" (redes, IndexedDB do Dexie, APIs do navegador).
- Toda dependência externa deve possuir uma classe/wrapper correspondente (ex: `InsumosDatabase.js`).
- O Wrapper NUNCA deve implementar regras de negócio, servindo apenas de túnel para ler e gravar dados ou executar efeitos colaterais.

## 3. Testabilidade e TDD
- A camada `logic/` deve ser testada com **Testes de Estado**, baseados em inputs e outputs fixos (Asserções de retorno).
- A camada de `infrastructure/` deve ser testada com testes que escrevem e leem no Wrapper garantindo que o que foi enviado foi processado sem depender de "Mocks" clássicos (Testes de Integração). Crie sempre as versões "Nullables" (`createNull()`) descritas nos padrões de Nullables.

## 4. Value Objects (`values/`)
- Sempre que possível, estruture dados em *Value Objects* imutáveis, encapsulando validações de formato (ex: `Insumo`, `Preço`, `Quantidade`).
- Trate cópias dos dados de forma imutável em vez de alterar o estado do Value Object em si.
