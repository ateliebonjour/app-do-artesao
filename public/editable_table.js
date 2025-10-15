// Utilitário de tabela editável genérica
// Uso: new EditableTable({
//   tableElement, columns, items, onChange
// })

export class EditableTable {
    constructor({ tableElement, columns, items = [], onChange = () => {} }) {
        this.table = tableElement;
        this.columns = columns; // [{ label, get, set, type }]
        this.onChange = onChange;
        this.items = items;
        this.render();
    }

    render() {
        this.table.innerHTML = '';
        // Render linhas existentes
        this.items.forEach(item => {
            this.table.appendChild(this.createRow(item));
        });
        // Garante uma linha vazia
        this.table.appendChild(this.createRow(this.emptyItem()));
    }

    createRow(item) {
        const tr = document.createElement('tr');
        this.columns.forEach((col, idx) => {
            if (!col || typeof col.get !== 'function' || typeof col.set !== 'function') {
                console.error('Column definition is invalid:', col, idx, this.columns);
                return;
            }
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = col.type || 'text';
            input.value = col.get(item) ?? '';
            input.className = col.className || '';
            input.addEventListener('input', () => {
                col.set(item, input.value);
                // Se for a última linha e começar a digitar, adiciona nova linha
                if (tr === this.table.lastElementChild && this.hasValue(item)) {
                    this.items.push(item);
                    this.table.appendChild(this.createRow(this.emptyItem()));
                }
                this.onChange(this.getItems());
            });
            td.appendChild(input);
            tr.appendChild(td);
        });
        return tr;
    }

    emptyItem() {
        // Cria um novo objeto vazio baseado nas chaves dos getters
        const obj = {};
        this.columns.forEach(col => {
            col.set(obj, '');
        });
        return obj;
    }

    hasValue(item) {
        // Retorna true se algum campo do item não for vazio
        return this.columns.some(col => (col.get(item) ?? '').toString().trim() !== '');
    }

    getItems() {
        // Retorna todos os itens preenchidos (ignora última linha vazia)
        const rows = Array.from(this.table.querySelectorAll('tr'));
        return rows
            .map(tr => {
                const obj = this.emptyItem();
                const inputs = tr.querySelectorAll('input');
                // Só processa se o número de inputs for igual ao número de columns
                if (inputs.length !== this.columns.length) return null;
                inputs.forEach((input, idx) => {
                    if (this.columns[idx] && typeof this.columns[idx].set === 'function') {
                        this.columns[idx].set(obj, input.value);
                    }
                });
                return obj;
            })
            .filter(item => item && this.hasValue(item));
    }
}
