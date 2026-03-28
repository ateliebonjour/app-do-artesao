/**
 * Camada View para o módulo de Insumos.
 * Abstrai o DOM e o Tailwind para o Controller.
 */
export default class InsumosView {
  constructor() {
    this.tableBody = document.getElementById('insumos-table-body');
    this.statusText = document.getElementById('status-text');
    this.statusBar = document.getElementById('status-bar');
    this.saveAllBtn = document.getElementById('save-all-btn');
    this.addInsumoBtn = document.getElementById('add-insumo-btn');
    this.addGhostBtn = document.getElementById('add-row-ghost');
    this.searchInput = document.getElementById('search-input');
    this.saveToast = document.getElementById('save-toast');
    this.undoToast = document.getElementById('undo-toast');
    this.undoText = document.getElementById('undo-text');
    this.undoBtn = document.getElementById('undo-btn');
  }

  renderInsumos(insumos, dirtyIds) {
    this.tableBody.innerHTML = '';
    insumos.forEach(insumo => {
      const isDirty = dirtyIds.has(insumo.id);
      const row = this._createRow(insumo, isDirty);
      this.tableBody.appendChild(row);
    });
    if (window.lucide) window.lucide.createIcons();
  }

  _createRow(insumo, isDirty) {
    const div = document.createElement('div');
    const isNew = String(insumo.id).startsWith('new-');
    div.className = `row ${isDirty ? 'row-dirty' : ''} grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center p-5 md:px-6 md:py-3 bg-white rounded-2xl md:rounded-none border-2 border-stone-100 md:border-0 hover:bg-amber-50/50 transition-colors shadow-sm md:shadow-none`;
    div.dataset.id = insumo.id;

    div.innerHTML = `
      <div class="col-span-1 md:col-span-4 flex justify-between md:justify-start items-center">
        <div class="flex items-center gap-2 w-full">
          <i data-lucide="${this._getIcon(insumo)}" class="w-4 h-4 text-amber-600 shrink-0"></i>
          <input type="text" value="${insumo.nome}" placeholder="Nome do insumo..." 
            class="field-name font-bold text-base md:text-sm text-stone-900 bg-transparent border-b-2 ${isDirty ? 'border-amber-400' : 'border-transparent'} focus:border-amber-400 focus:outline-none w-full">
          ${isDirty ? '<span class="dirty-indicator cell-dirty-indicator"></span>' : ''}
        </div>
        <span class="md:hidden text-[10px] font-bold ${isNew ? 'text-amber-700 bg-amber-100' : 'text-stone-500 bg-stone-100'} px-2 py-0.5 rounded-lg uppercase">
          ${isNew ? 'Novo' : insumo.unidadeMedida}
        </span>
      </div>
      <div class="md:contents grid grid-cols-2 gap-3 mt-1 md:mt-0">
        <div class="col-span-1 md:col-span-2 bg-stone-50 md:bg-transparent p-3 md:p-0 rounded-xl flex flex-col md:block items-center text-center">
          <span class="md:hidden text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Qtd. Compra</span>
          <input type="number" value="${insumo.quantidadeCompra || ''}" placeholder="0" step="0.01"
            class="field-qty w-full md:w-20 border-2 ${isDirty ? 'border-amber-300 bg-amber-50' : 'border-stone-200 bg-white'} rounded-lg px-2 py-1.5 text-center font-bold text-stone-900 focus:border-amber-400 focus:outline-none transition-all">
        </div>
        <div class="col-span-1 md:col-span-2 bg-stone-50 md:bg-transparent p-3 md:p-0 rounded-xl flex flex-col md:block items-center text-center">
          <span class="md:hidden text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Unidade</span>
          <select class="field-unit w-full md:w-20 border-2 ${isDirty ? 'border-amber-300 bg-amber-50' : 'border-stone-200 bg-white'} rounded-lg px-2 py-1.5 text-center font-bold text-stone-900 focus:border-amber-400 focus:outline-none transition-all">
            ${['kg', 'g', 'ml', 'L', 'm', 'un'].map(u => `<option value="${u}" ${insumo.unidadeMedida === u ? 'selected' : ''}>${u}</option>`).join('')}
          </select>
        </div>
        <div class="col-span-1 md:col-span-2 bg-stone-50 md:bg-transparent p-3 md:p-0 rounded-xl flex flex-col md:block items-center text-center">
          <span class="md:hidden text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Preço de Custo</span>
          <div class="relative w-full md:w-24">
            <span class="absolute left-2 top-2 text-stone-400 font-semibold text-xs">R$</span>
            <input type="number" value="${insumo.precoCusto || ''}" placeholder="0,00" step="0.01"
              class="field-price w-full border-2 ${isDirty ? 'border-amber-300 bg-amber-50' : 'border-stone-200 bg-white'} rounded-lg pl-7 pr-2 py-1.5 text-center font-bold text-stone-900 focus:border-amber-400 focus:outline-none transition-all">
          </div>
        </div>
        <div class="col-span-1 md:col-span-1 bg-stone-50 md:bg-transparent p-3 md:p-0 rounded-xl flex flex-col md:block md:text-right">
          <span class="md:hidden text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Preço Unit.</span>
          <span class="unit-price font-black text-emerald-600 text-base md:text-sm">
            ${insumo.precoUnitario > 0 ? insumo.precoUnitarioFormatado : '—'}
          </span>
        </div>
      </div>
      <div class="col-span-1 md:col-span-1 mt-2 md:mt-0 text-center">
        <button class="btn-delete hidden md:inline-block text-red-400 hover:text-red-600 font-bold px-2 py-1 bg-red-50 rounded-lg text-xs hover:bg-red-100 transition-colors">⨯</button>
      </div>
    `;

    // Eventos da linha
    div.querySelector('.field-name').addEventListener('input', (e) => this._onUpdate(insumo.id, 'nome', e.target.value));
    div.querySelector('.field-qty').addEventListener('input', (e) => this._onUpdate(insumo.id, 'quantidadeCompra', e.target.value));
    div.querySelector('.field-unit').addEventListener('change', (e) => this._onUpdate(insumo.id, 'unidadeMedida', e.target.value));
    div.querySelector('.field-price').addEventListener('input', (e) => this._onUpdate(insumo.id, 'precoCusto', e.target.value));
    div.querySelector('.btn-delete').addEventListener('click', () => this._onDelete(insumo.id));

    return div;
  }

  _getIcon(insumo) {
    const n = insumo.nome.toLowerCase();
    if (n.includes('farinha') || n.includes('trigo')) return 'wheat';
    if (n.includes('leite') || n.includes('água')) return 'droplets';
    if (n.includes('açúcar')) return 'zap';
    return 'package';
  }

  onAddInsumo(cb) {
    this.addInsumoBtn.addEventListener('click', cb);
    this.addGhostBtn.addEventListener('click', cb);
  }

  onUpdateInsumo(cb) { this._onUpdate = cb; }
  onDeleteInsumo(cb) { this._onDelete = cb; }

  onSearch(cb) {
    this.searchInput.addEventListener('input', (e) => cb(e.target.value));
  }

  onSaveAll(cb) {
    this.saveAllBtn.addEventListener('click', cb);
  }

  onUndoDelete(cb) {
    this.undoBtn.addEventListener('click', cb);
  }

  updateStatusBar(isDirty, count = 0) {
    if (isDirty) {
      this.statusBar.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-100');
      this.statusBar.classList.remove('bg-emerald-50', 'text-emerald-600', 'border-emerald-100');
      this.statusText.textContent = `${count} alteração(ões) pendente(s)...`;
      this.saveAllBtn.classList.remove('hidden');
      this.saveAllBtn.classList.add('flex');
    } else {
      this.statusBar.classList.remove('bg-amber-50', 'text-amber-700', 'border-amber-100');
      this.statusBar.classList.add('bg-emerald-50', 'text-emerald-600', 'border-emerald-100');
      this.statusText.textContent = `Todas as alterações salvas`;
      this.saveAllBtn.classList.add('hidden');
    }
  }

  showSaveToast() {
    this.saveToast.classList.add('show');
    setTimeout(() => this.saveToast.classList.remove('show'), 2500);
  }

  showUndoToast(text) {
    this.undoText.textContent = text;
    this.undoToast.classList.remove('hidden');
    this.undoToast.classList.add('flex');
  }

  hideUndoToast() {
    this.undoToast.classList.add('hidden');
  }

  focusNewRow(id) {
    const row = this.tableBody.querySelector(`[data-id="${id}"]`);
    if (row) row.querySelector('.field-name').focus();
  }

  // --- Navegação por Teclado ---
  setupKeyboardNavigation() {
    this.tableBody.addEventListener('keydown', (e) => {
      const target = e.target;
      if (!target.classList.contains('field-name') && 
          !target.classList.contains('field-qty') && 
          !target.classList.contains('field-price') &&
          !target.tagName !== 'SELECT') return;

      const row = target.closest('.row');
      const cells = Array.from(row.querySelectorAll('input, select'));
      const index = cells.indexOf(target);

      if (e.key === 'Enter') {
        e.preventDefault();
        this._moveFocus(row, index, 'down');
      } else if (e.key === 'ArrowDown') {
        this._moveFocus(row, index, 'down');
      } else if (e.key === 'ArrowUp') {
        this._moveFocus(row, index, 'up');
      } else if (e.key === 'ArrowRight' && target.selectionEnd === target.value.length) {
        if (index < cells.length - 1) cells[index + 1].focus();
      } else if (e.key === 'ArrowLeft' && target.selectionStart === 0) {
        if (index > 0) cells[index - 1].focus();
      } else if (e.key === 'Escape') {
        target.blur();
      }
    });
  }

  _moveFocus(currentRow, cellIndex, direction) {
    const nextRow = direction === 'down' ? currentRow.nextElementSibling : currentRow.previousElementSibling;
    if (nextRow && nextRow.classList.contains('row')) {
      const nextCells = Array.from(nextRow.querySelectorAll('input, select'));
      if (nextCells[cellIndex]) {
        nextCells[cellIndex].focus();
        if (nextCells[cellIndex].select) nextCells[cellIndex].select();
      }
    } else if (direction === 'down') {
      // Se for a última linha e apertar Enter/Down, tenta adicionar nova linha?
      // Ou apenas foca o botão de adicionar.
    }
  }
}

