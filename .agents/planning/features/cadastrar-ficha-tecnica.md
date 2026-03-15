# Feature: Cadastro de Ficha Técnica (Antiga Receita)

**Como** um artesão
**Quero** criar fichas técnicas compostas por múltiplos insumos ou por outras fichas técnicas
**Para que** eu possa calcular automaticamente o custo total de produção e o custo unitário com base no rendimento daquela composição.

---

## 1. Estrutura e Cabeçalho da Ficha Técnica

### Cenário: Definição de nome e rendimento (Yield)
**Dado** que o usuário inicia a criação de uma nova "Ficha Técnica"
**Quando** ele preenche o "Nome da Ficha" (ex: "Massa de Bolo Branca")
**E** preenche o campo "Rende" (Quantidade Produzida) com `<quantidade_rendimento>`
**E** seleciona a "Unidade de Medida" do rendimento como `<unidade_rendimento>`
**Então** o sistema salva o cabeçalho base da ficha técnica
**E** prepara a exibição do "Custo Total" e "Custo por Unidade (`<unidade_rendimento>`)" de forma destacada em um espaço reservado na interface.

#### Exemplos
| nome_ficha | quantidade_rendimento | unidade_rendimento |
|---|---|---|
| Massa de Bolo Branca | 2 | kg |
| Estampa Floral | 5 | m |

---

## 2. Inserção de Componentes (Insumos ou Outras Fichas)

### Cenário: Adição de Insumos base à Ficha Técnica
**Dado** que o usuário está montando a lista de componentes da sua Ficha Técnica
**Quando** ele busca e seleciona um Insumo da sua base local
**Então** o sistema exibe automaticamente o Preço Unitário e a Unidade de Medida originais daquele insumo
**E** adiciona o item na tabela da ficha técnica aguardando o preenchimento da quantidade utilizada.

### Cenário: Adição de uma Ficha Técnica dentro de outra Ficha Técnica (Sub-composição)
**Dado** que o usuário está buscando por itens para adicionar à Ficha Técnica
**Quando** a busca é exibida
**Então** a lista de opções de componentes deve mesclar de forma fluida tanto "Insumos" simples quanto outras "Fichas Técnicas" já cadastradas (marcadas com um selo/ícone indicativo)
**E** ao selecionar uma "Ficha Técnica" como componente
**O** sistema deve utilizar o "Custo por Unidade" (yield cost) dessa Ficha Técnica filha como se ela fosse um insumo comum.

---

## 3. Cálculos Dinâmicos de Custos (Inline)

### Cenário: Cálculo do custo do componente utilizado
**Dado** que o usuário adicionou um componente (Insumo ou Ficha Técnica) na tabela
**Quando** ele informa a "Quantidade Utilizada" na receita com `<quantidade_usada>`
**Então** o sistema multiplica o "Preço Unitário do Componente" pela `<quantidade_usada>`
**E** exibe quase instantaneamente o "Custo da Linha" `<custo_calculado_linha>`

#### Exemplos
| componente_nome | preco_unitario | quantidade_usada | custo_calculado_linha |
|---|---|---|---|
| Farinha de Trigo | R$ 5,00 / kg | 0.5 | R$ 2,50 |
| Açúcar Refinado | R$ 4,00 / kg | 1 | R$ 4,00 |
| Leite Integral | R$ 6,00 / L | 0.25 | R$ 1,50 |

### Cenário: Rateio (Cálculo do Custo Total e Custo por Rendimento)
**Dado** que o usuário inseriu e preencheu as quantidades de vários componentes
**E** o cabeçalho possui o "Rendimento" definido como `<quantidade_rendimento>`
**Quando** os cálculos individuais por linha são finalizados
**Então** o sistema soma os custos de todas as linhas para compor o `<custo_total_ficha>`
**E** divide o `<custo_total_ficha>` pelo `<quantidade_rendimento>`
**E** atualiza dinamicamente o `<custo_por_unidade_rendimento>` no espaço reservado da tela.

#### Exemplo do Cálculo Final
- **Componentes Somados (Custo Total):** R$ 8,00
- **Rendimento Definido:** Rende `2` `kg`
- **Resultado Exibido:** Custo Total = R$ 8,00 | Custo Direto = R$ 4,00 / kg

---

## 4. Integração das Fichas Técnicas na Visão Geral de Insumos

### Cenário: Fichas Técnicas listadas junto com Insumos
**Dado** que uma Ficha Técnica foi estruturada e possui um "Custo por Unidade de Rendimento" final válido
**Quando** o usuário navega até a tela global/tabela de "Insumos"
**Então** essa Ficha Técnica pronta também deve aparecer listada nessa tabela (possivelmente destacada por cor ou ícone)
**E** seu comportamento ali deve espelhar um Insumo padrão (permitindo uso fácil e rápido de seu preço unitário de custo para montar novas coisas).

---

## 5. Dinâmicas de Edição e Restrições (UX de Planilha)

**(Herda automaticamente da Especificação de Insumos)**
- Assim como nos Insumos, a edição de quantidades na Ficha Técnica utiliza os atalhos de navegação de teclado, *inline editing*, Enter para confirmar, e *Auto-Save* em background para não perder dados, protegendo contra saída acidental em estado "Dirty".
