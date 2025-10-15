

import { saveIngredients, loadIngredients } from '../infrastructure/ingredientes_storage.js';
import Ingredient from '../values/ingredient.js';
import { validateIngredient } from '../logic/validar_ingredient.js';

document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('ingredientes-table').getElementsByTagName('tbody')[0];

    function getIngredientsFromTable() {
        const rows = Array.from(table.getElementsByTagName('tr'));
        return rows
            .map(row => {
                const inputs = row.querySelectorAll('input');
                return new Ingredient({
                    nome: inputs[0].value.trim(),
                    preco: inputs[1].value.trim(),
                    unidade: inputs[2].value.trim(),
                    quantidade: inputs[3].value.trim()
                });
            })
            .filter(ing => ing.nome || ing.preco || ing.unidade || ing.quantidade);
    }

    function renderIngredients(ingredients) {
        table.innerHTML = '';
        // Se ingredientes for vazio, adiciona uma linha vazia
        let hasIngredients = Array.isArray(ingredients) && ingredients.length > 0;
        let renderedRows = 0;
        if (hasIngredients) {
            ingredients.forEach(ing => {
                // Não renderiza linhas completamente vazias (linha extra será adicionada depois)
                if (!ing.nome && !ing.preco && !ing.unidade && !ing.quantidade) return;
                const { valido, erros } = validateIngredient(ing);
                const row = document.createElement('tr');
                row.className = valido ? '' : 'erro-ingrediente';
                row.innerHTML = `
                    <td><input type="text" class="nome" value="${ing.nome}"></td>
                    <td><input type="number" class="preco" step="0.01" min="0" value="${ing.preco}"></td>
                    <td><input type="text" class="unidade" value="${ing.unidade}"></td>
                    <td><input type="number" class="quantidade" step="0.01" min="0" value="${ing.quantidade}"></td>
                `;
                if (!valido) {
                    const feedback = document.createElement('tr');
                    feedback.className = 'feedback-erro';
                    feedback.innerHTML = `<td colspan="4">
                        ${Object.values(erros).map(msg => `<div>${msg}</div>`).join('')}
                    </td>`;
                    table.appendChild(row);
                    table.appendChild(feedback);
                } else {
                    table.appendChild(row);
                }
                renderedRows++;
            });
        }
        // Sempre adiciona uma linha vazia ao final
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="nome"></td>
            <td><input type="number" class="preco" step="0.01" min="0"></td>
            <td><input type="text" class="unidade"></td>
            <td><input type="number" class="quantidade" step="0.01" min="0"></td>
        `;
        table.appendChild(newRow);
    }

    function isRowFilled(row) {
        return Array.from(row.querySelectorAll('input')).some(input => input.value.trim() !== '');
    }

    function addRowIfNeeded() {
        const rows = table.getElementsByTagName('tr');
        const lastRow = rows[rows.length - 1];
        if (isRowFilled(lastRow)) {
            const newRow = lastRow.cloneNode(true);
            Array.from(newRow.querySelectorAll('input')).forEach(input => input.value = '');
            table.appendChild(newRow);
        }
    }

    table.addEventListener('input', function(e) {
        addRowIfNeeded();
    });

    table.addEventListener('change', function(e) {
        const ingredientes = getIngredientesFromTable();
        renderIngredientes(ingredientes);
        salvarIngredientes(ingredientes);
    });

    // Carrega ingredientes ao abrir a página
    renderIngredientes(carregarIngredientes());

// Estilo para linha de erro e feedback
const style = document.createElement('style');
style.innerHTML = `
.erro-ingrediente input {
    background: #ffeaea !important;
    border: 1.5px solid #e57373 !important;
}
.feedback-erro td {
    color: #e53935;
    font-size: 0.95em;
    background: #fff6f6;
    border-bottom: 1px solid #e57373;
    padding: 6px 8px;
}
`;
document.head.appendChild(style);
});
