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
        this.attachListeners();
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
                tr.querySelectorAll('input').forEach((input, idx) => {
                    this.columns[idx].set(obj, input.value);
                });
                return obj;
            })
            .filter(item => this.hasValue(item));
    }

    attachListeners() {
        // Listener para mudança de qualquer célula
        this.table.addEventListener('change', () => {
            this.onChange(this.getItems());
        });
    }
}
