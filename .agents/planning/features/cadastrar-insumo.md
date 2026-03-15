# Feature: Gestão de Insumos (Planilha Híbrida)

**Como** um artesão acostumado com planilhas
**Quero** visualizar, criar e editar meus insumos em uma única tela fluida sem pop-ups ou navegação extra
**Para que** eu ganhe agilidade no meu processo de cadastro, tendo a liberdade de alterar múltiplos itens rapidamente e salvar tudo de uma vez.

---

## 1. Criação e Inserção Inline

### Cenário: Adicionar nova linha de Insumo na tabela
**Dado** que o usuário está na tela de "Insumos"
**Quando** o usuário clica no botão "Adicionar Insumo" ou numa linha vazia ao final
**Então** o sistema insere uma nova linha editável imediatamente na tabela
**E** foca o cursor no primeiro campo ("Nome").

### Cenário: Cálculo Automático do Custo Unitário (Inline)
**Dado** que o usuário está preenchendo a linha de um Insumo na tabela
**Quando** ele preenche simultaneamente a "Quantidade" com `<quantidade_compra>` e o "Preço de Custo" com `<preco_compra>`
**E** seleciona a "Unidade" como `<unidade_medida>`
**Então** o sistema deve calcular instantaneamente, na própria linha, a coluna "Preço Unitário" com o valor de `<preco_unitario_calculado>`

#### Exemplos
| quantidade_compra | unidade_medida | preco_compra | preco_unitario_calculado | notas |
|---|---|---|---|---|
| 2                 | kg             | R$ 50,00     | R$ 25,00 / kg            | Matemática simples |
| 500               | ml             | R$ 100,00    | R$ 0,20 / ml             | Resultando em centavos |
| 1.5               | m              | R$ 30,00     | R$ 20,00 / m             | Fracionado |

---

## 2. Edição Contínua e Auto-Save (Planilha UX)

### Cenário: Edição direta na própria célula (Inline Editing)
**Dado** que o usuário está na tela de "Insumos" visualizando a tabela com dados preenchidos
**Quando** o usuário clica (ou foca via teclado) em qualquer campo de um insumo existente
**Então** o campo correspondente se torna editável imediatamente (sem necessidade de botão "Editar")
**E** permite a digitação direta do novo valor.

### Cenário: Feedback visual de células alteradas (Dirty State)
**Dado** que um insumo foi editado em alguma de suas células
**E** o valor atual difere do valor salvo anteriormente no banco de dados local
**Quando** a edição é realizada
**Então** a linha (ou célula) correspondente deve receber um leve destaque visual (ex: um brilho suave, cor diferenciada de borda ou ícone de "Não salvo").

### Cenário: Salvamento Automático em Background (Auto-Save)
**Dado** que o usuário alterou um ou mais dados válidos na tabela
**Quando** o usuário para de digitar por um curto período (Debounce ex: 1 segundo) ou clica fora da célula (Blur)
**Então** o sistema executa um salvamento automático silencioso na base local
**E** remove o destaque visual de alteração daquela célula/linha
**E** exibe discretamente "Status: Todas as alterações foram salvas".

### Cenário: Salvamento Global via teclado ou Botão
**Dado** que o usuário alterou múltiplos campos em várias linhas mais rapidamente que o Auto-Save
**Quando** o usuário clica no botão "Salvar Tudo" (ou pressiona um atalho como Ctrl+S / Cmd+S)
**Então** o sistema força o salvamento de todas as alterações pendentes da tabela
**E** limpa o estado "Dirty" de todos os registros visíveis.

---

## 3. Navegação Ágil por Teclado (Estilo Planilha)

### Cenário: Navegação entre células usando setas e Tab
**Dado** que o foco do usuário está em uma célula da tabela de Insumos
**Quando** o usuário pressiona as teclas direcionais (↑, ↓, ←, →) ou a tecla `Tab` / `Shift+Tab`
**Então** o foco deve se mover para a célula adjacente correspondente
**E** o valor da nova célula deve ser selecionado (highlight) para rápida substituição.

### Cenário: Iniciar edição e confirmar com Enter
**Dado** que o foco está em uma célula, mas ela não está em modo de edição de texto (apenas selecionada)
**Quando** o usuário começa a digitar alfanuméricos ou pressiona a tecla `F2` ou `Enter`
**Então** a célula entra em modo de edição
**E** ao pressionar `Enter` novamente, a edição é confirmada (disparando Auto-Save) e o foco desce para a célula da linha de baixo (comportamento padrão de planilhas).

### Cenário: Cancelar edição com Esc
**Dado** que o usuário está editando o conteúdo de uma célula (modo de edição ativa)
**Quando** ele pressiona a tecla `Esc` (Escape)
**Então** a edição atual é cancelada
**E** o valor da célula retorna imediatamente ao seu estado original antes do início da edição.

---

## 4. Prevenção de Perdas de Dados

### Cenário: Prevenir fechamento ou navegação acidental com edições não salvas
**Dado** que existem células "Dirty" (com alterações pendentes não enviadas ao Auto-Save ainda ou com erros de validação) na tela atual
**Quando** o usuário tenta fechar a aba do navegador, atualizar a página, ou navegar para outra tela do aplicativo
**Então** o sistema deve interceptar a ação exibindo um Modal ou "BeforeUnload Alert"
**E** exibir a mensagem: "Você tem alterações não salvas. Tem certeza que deseja sair?"
**E** permitir que ele continue na tela para forçar ou aguardar o salvamento.

---

## 5. Exclusão Dinâmica

### Cenário: Exclusão de Insumo (Sem Dependências) diretamente na linha
**Dado** que o usuário visualiza um insumo sem nenhum vínculo a Fichas Técnicas ou Produtos
**Quando** ele clica no ícone de exclusão (Lixeira) na mesma linha da tabela
**Então** a linha exibe rapidamente um confirm inline ou muda de tom (esmaecida)
**E** o insumo é deletado imediatamente do banco de dados (também silencioso por Auto-Save ou via Undo Timer)
**E** a linha desaparece da visualização.

### Cenário: Exclusão revogável (Undo Timer) após exclusão na linha
**Dado** que o usuário excluiu um insumo diretamente na tabela
**Então** a linha desaparece e é substituída por um componente de status (Toast/Atalho) exibindo: "Insumo [Nome] removido. Desfazer" por 5 segundos
**Quando** o usuário clica em "Desfazer" antes do tempo expirar
**Então** o Insumo retorna a tela exatamente onde estava sem ser efetivamente excluído da base local.

### Cenário: Impedir exclusão na própria linha se Insumo vinculado
**Dado** que um insumo é parte de uma Ficha Técnica ou Produto
**Quando** o usuário visualiza a linha correspondente
**Então** o botão de lixeira correspondente deve estar desabilitado (grayed out) ou apresentar um "tooltip/alerta" ao clique:
**E** informando: "Insumo em uso (Ex: Ficha Técnica de Bolo, Produto A). Impossível excluir."
