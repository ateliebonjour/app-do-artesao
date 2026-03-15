# Domain Definition: Gestão de Custos e Produtos (MVP)

Este documento define a linguagem ubíqua, as entidades de negócio e a semântica dos atributos para o módulo central do App do Artesão. 
**Nota:** Este é um documento de especificação de produto. A modelagem de dados técnica (tabelas, chaves primárias/estrangeiras, índices IndexedDB, etc.) estrutural ficará a cargo do Agente de Engenharia de Software responsável pela implementação.

---

## Entidades e Hierarquia

A estrutura de custos do artesão baseia-se em uma hierarquia de três níveis:

1. **Insumo:** A matéria-prima comprada. A base de todo o custo.
2. **Ficha Técnica (Composição):** Um passo intermediário. Uma mistura de Insumos e/ou outras Fichas Técnicas que gera um novo "material" com seu próprio custo unitário.
3. **Produto:** O item final destinado à venda. Agrupa Fichas Técnicas e Insumos, agregando valor (Preço de Venda) e revelando indicadores financeiros (CMV/Lucro). Não pode ser usado como componente de outra entidade.

---

## 1. Entidade: Insumo

Matéria-prima bruta adquirida pelo artesão. É a menor unidade de custo do sistema.

### Atributos de Negócio

| Atributo | Semântica / Regra de Negócio | Origem / Preenchimento |
|---|---|---|
| **Nome** | Identificação legível da matéria-prima (ex: "Farinha de Trigo", "Fio de Malha"). | Manual (Input do Usuário) |
| **Quantidade de Compra** | O volume ou peso total da embalagem adquirida (ex: `5`). | Manual |
| **Unidade de Medida** | A grandeza física (ex: `kg`, `ml`, `un`, `m`, `g`). Deve ser padronizada para permitir cálculos futuros. | Manual (Seleção de Lista) |
| **Preço de Compra** | O valor total pago por aquela embalagem/quantidade (ex: `R$ 20,00`). | Manual |
| **Custo Unitário Calculado** | O valor fracionado de 1 unidade de medida. Usado como base universal para compor as Fichas e Produtos. <br>Fórmula: `Preço de Compra / Quantidade de Compra`. | **Automático** (Sistema) |

---

## 2. Entidade: Ficha Técnica

Uma composição intermediária. Representa um subproduto ou processo (ex: "Massa de Bolo Branca", "Molde Base de Camisa") que o artesão fabrica em lote para usar depois.

### Atributos de Negócio (Cabeçalho)

| Atributo | Semântica / Regra de Negócio | Origem / Preenchimento |
|---|---|---|
| **Nome** | Identificação da composição. | Manual |
| **Rendimento (Qtd)** | Quanto essa receita rende ao final do processo (ex: Rende `2` bolos, Rende `500` gramas de recheio). | Manual |
| **Unidade de Rendimento** | A grandeza do que foi produzido (`kg`, `un`). Define como as Fichas Técnicas serão "puxadas" por outras Fichas ou Produtos. | Manual |
| **Custo Total** | A soma financeira bruta de todos os componentes utilizados nesta Ficha Técnica. | **Automático** |
| **Custo Unitário (Rendimento)** | O valor que será efetivamente repassado para o Produto ou outra Ficha. <br>Fórmula: `Custo Total / Rendimento (Qtd)`. | **Automático** |

### Atributos de Negócio (Itens/Componentes da Ficha)
*A Ficha Técnica é composta por uma lista de Componentes. Cada Componente possui:*

| Atributo | Semântica / Regra de Negócio | Origem / Preenchimento |
|---|---|---|
| **Referência do Componente** | O apontamento para um Insumo ou para outra Ficha Técnica base. | Manual (Busca/Seleção) |
| **Custo Base Reutilizado** | O `Custo Unitário Calculado` (se Insumo) ou o `Custo Unitário de Rendimento` (se Ficha Técnica) no momento do cálculo. É o "preço de custo da matriz". | **Automático** (Herdado) |
| **Quantidade Utilizada** | O quanto daquele componente está sendo consumido nesta receita específica. | Manual |
| **Custo da Linha** | O valor correspondente àquele ingrediente na composição. <br>Fórmula: `Quantidade Utilizada * Custo Base Reutilizado`. | **Automático** |

---

## 3. Entidade: Produto

O item final da cadeia que será comercializado. Herda a estrutura de componentes da Ficha Técnica, mas adiciona o contexto de precificação e análise gerencial.

### Atributos de Negócio (Cabeçalho Comercial)

| Atributo | Semântica / Regra de Negócio | Origem / Preenchimento |
|---|---|---|
| **Nome do Produto** | A nomenclatura comercial do item finalizado. | Manual |
| **Preço de Venda** | O valor monetário fixado pelo artesão para venda ao cliente final. | Manual |
| **Grupo / Tags** | Agrupadores semânticos para organização de catálogo (ex: "Dia das Mães", "Pronta Entrega"). O mesmo produto pode ter múltiplas tags. | Manual |
| **Custo Total (CPV)** | O Custo do Produto Vendido. Soma de todos os componentes (Insumos + Fichas) atrelados ao produto. Representa o "quanto me custa para fabricar esse item final". | **Automático** |
| **CMV (Custo Médio Variável)** | Indicador financeiro percentual que sinaliza a saúde do preço de venda. Mostra que porcentagem do preço o artesão gasta apenas para pagar os materiais. <br>Fórmula: `(Custo Total / Preço de Venda) * 100`. | **Automático** |

### Atributos de Negócio (Itens/Componentes do Produto)
*O Produto repete a estrutura de componentes da Ficha Técnica (listando Fichas ou Insumos com suas quantidades e custos de linha), **com o bloqueio semântico** vital de que "Produtos não podem referenciar outros Produtos".*

---

## Resumo das Fórmulas Vitais (Single Source of Truth)

1. **Preço Unitário (Insumo Base):** `= Preço de Compra / Quantidade de Compra Tabela`
2. **Custo do Componente (Linha):** `= Preço Unitário (Insumo ou Ficha) * Quantidade Usada na Receita/Produto`
3. **Custo Total (Ficha/Produto):** `= SOMA(Todos os Custos de Linhas dos Componentes)`
4. **Custo por Unidade Formada (Ficha):** `= Custo Total / Rendimento Declarado`
5. **CMV % (Produto):** `= (Custo Total / Preço de Venda) * 100`
