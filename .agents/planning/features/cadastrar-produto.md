# Feature: Cadastro e Gestão de Produtos

**Como** um artesão
**Quero** criar e organizar meus produtos finais baseados nos meus insumos e fichas técnicas
**Para que** eu possa definir meu preço de venda e analisar rapidamente o meu Custo Médio Variável (CMV) e lucro.

---

## 1. Criação e Composição do Produto

### Cenário: Estruturação base do Produto
**Dado** que o usuário inicia a criação de um novo "Produto"
**Quando** ele preenche o "Nome do Produto" (ex: "Bolo de Chocolate Decorado")
**E** define um "Preço de Venda" planejado de `<preco_venda>`
**Então** o sistema salva o cabeçalho do produto
**E** o disponibiliza para adicionar seus componentes de custo (Insumos e Fichas Técnicas).

### Cenário: Produto não pode ser componente de outras composições (Apenas item final)
**Dado** que o usuário está criando uma Ficha Técnica ou outro Produto
**Quando** ele busca por componentes para adicionar à lista
**Então** "Produtos" **não devem** aparecer nos resultados (apenas Insumos e Fichas Técnicas devem aparecer)
**E** garantindo assim que a hierarquia do Produto fique estritamente no topo da cadeia de precificação.

---

## 2. Cálculo do CMV e Agregação de Custos

### Cenário: Composição dinâmica de custos (Inline)
**Dado** que a criação de Produto herda a UX ágil de planilhas (Inline editing, atalhos de teclado)
**Quando** o usuário adiciona componentes (Fichas Técnicas ou Insumos) à composição do produto
**E** informa suas respectivas quantidades utilizadas
**Então** o sistema soma automaticamente o custo de cada linha
**E** atualiza em tempo real o **Custo Total por Unidade** gerada desse produto.

### Cenário: Cálculo do CMV (Custo Médio Variável)
**Dado** que o usuário adicionou todos os componentes, resultando num "Custo Total" de `<custo_total>`
**E** o "Preço de Venda" do produto está preenchido como `<preco_venda>`
**Quando** os dados são processados na tabela/visualização
**Então** o sistema calcula o CMV utilizando a fórmula `(Custo Total / Preço de Venda) * 100`
**E** exibe o CMV como uma porcentagem `<cmv_percentual>` de forma destacada, indicando o peso do custo sobre o preço.

#### Exemplos e Proposta Gerencial
| preco_venda | custo_total | cmv_percentual | significado p/ negócio |
|---|---|---|---|
| R$ 100,00   | R$ 30,00    | 30%            | "CMV Saudável" (sobra 70% para cobrir custos fixos e virar lucro) |
| R$ 50,00    | R$ 25,00    | 50%            | "CMV de Atenção" (metade do preço de venda é só para pagar o próprio material) |
| R$ 20,00    | R$ 25,00    | 125%           | "CMV Crítico" (Prejuízo direto material, custo é maior que o preço cobrado) |

---

## 3. Listagem e Organização em Coleções/Grupos

### Cenário: Visualização dos indicadores chave na Listagem
**Dado** que o usuário acessa a tela principal de "Produtos"
**Quando** a lista de produtos é apresentada
**Então** cada linha (ou card mobile) correspondente a um produto deve exibir claramente:
1. Nome do Produto
2. Preço de Venda
3. Custo por Unidade (Total de insumos/fichas)
4. CMV (%)

### Cenário: Agrupamento Customizado (Tags/Coleções)
**Dado** que um artesão vende por diferentes coleções, épocas do ano, ou pronto-entrega
**Quando** ele visualiza a tabela/lista de produtos
**Então** o sistema deve permitir criar e atribuir "Grupos" ou "Tags" flexíveis aos seus produtos (ex: "Especial de Páscoa", "Sob Encomenda", "Pronta Entrega")
**E** permitir filtrar ou ordenar a visão da listagem baseada nesses grupos
**E** permitir a organização inline (sem sair da tela ou abrir popups complexos).

---

## 4. Dinâmicas de Edição e Restrições (UX de Planilha)

**(Herda automaticamente da Especificação Base de Insumos e Fichas Técnicas)**
- A experiência de manutenção de produtos utilizará as estritas regras de UX já documentadas:
  - Navegação fluida por setas de teclado (Arrow Keys e Tab).
  - *Inline editing* com confirmação via `Enter`.
  - Salvamento automático (*Auto-Save*) silencioso em background após o debounce da digitação.
  - Destaque visual temporário para "dirty state" (linhas alteradas ainda não salvas).
  - Prevenção de fechamento de tela acidental com edições pendentes não computadas pelo auto-save.
