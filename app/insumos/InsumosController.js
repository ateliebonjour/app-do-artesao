import InsumosDatabase from '../../infrastructure/InsumosDatabase.js';
import InsumosLogic from '../../logic/InsumosLogic.js';
import Insumo from '../../logic/values/Insumo.js';

export default class InsumosController {
  constructor(view, db, logic) {
    this._view = view;
    this._db = db;
    this._logic = logic;
    this._insumos = [];
    this._dirtyIds = new Set();
    this._saveTimeout = null;
    this._lastDeleted = null;
    this._undoTimeout = null;
  }

  async start() {
    this._insumos = await this._db.getAll();
    this._view.setupKeyboardNavigation();
    this._render();
    this._setupListeners();
    this._view.updateStatusBar(false);
  }

  _render() {
    this._view.renderInsumos(this._insumos, this._dirtyIds);
  }

  _setupListeners() {
    this._view.onAddInsumo(() => this._addInsumo());
    this._view.onSearch((query) => this._filter(query));
    this._view.onSaveAll(() => this._saveAll());
    this._view.onUpdateInsumo((id, field, value) => this._updateInsumo(id, field, value));
    this._view.onDeleteInsumo((id) => this._deleteInsumo(id));
    this._view.onUndoDelete(() => this._undoDelete());
    
    // Ctrl+S
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this._saveAll();
      }
    });

    // BeforeUnload
    window.addEventListener('beforeunload', (e) => {
      if (this._dirtyIds.size > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }

  _addInsumo() {
    const novo = new Insumo({ nome: '' });
    // Usamos um ID temporário negativo para novos itens não salvos
    novo.id = `new-${Date.now()}`;
    this._insumos.push(novo);
    this._dirtyIds.add(novo.id);
    this._render();
    this._view.focusNewRow(novo.id);
    this._view.updateStatusBar(true, this._dirtyIds.size);
  }

  _updateInsumo(id, field, value) {
    const insumo = this._insumos.find(i => i.id === id);
    if (!insumo) return;

    insumo[field] = value;
    this._dirtyIds.add(id);
    
    // Recalcula preço unitário na view (ou re-renderiza a linha)
    this._render();
    this._view.updateStatusBar(true, this._dirtyIds.size);

    // Auto-save debounce
    clearTimeout(this._saveTimeout);
    this._saveTimeout = setTimeout(() => this._autoSave(id), 1500);
  }

  async _autoSave(id) {
    const insumo = this._insumos.find(i => i.id === id);
    if (!insumo) return;

    const { valido } = this._logic.validar(insumo);
    if (!valido) return; // Não salva se for inválido

    // Limpa ID temporário para o banco gerar um real se for novo
    const dataToSave = { ...insumo };
    if (String(id).startsWith('new-')) {
      delete dataToSave.id;
    }

    const realId = await this._db.save(dataToSave);
    insumo.id = realId;
    this._dirtyIds.delete(id);

    if (this._dirtyIds.size === 0) {
      this._view.updateStatusBar(false);
      this._view.showSaveToast();
    } else {
      this._view.updateStatusBar(true, this._dirtyIds.size);
    }
    this._render();
  }

  async _saveAll() {
    for (const id of Array.from(this._dirtyIds)) {
      await this._autoSave(id);
    }
  }

  async _deleteInsumo(id) {
    const index = this._insumos.findIndex(i => i.id === id);
    if (index === -1) return;

    this._lastDeleted = { insumo: this._insumos[index], index };
    this._insumos.splice(index, 1);
    this._dirtyIds.delete(id);

    if (!String(id).startsWith('new-')) {
      await this._db.delete(id);
    }

    this._render();
    this._view.showUndoToast(`"${this._lastDeleted.insumo.nome || 'Insumo'}" removido`);
    
    clearTimeout(this._undoTimeout);
    this._undoTimeout = setTimeout(() => {
      this._view.hideUndoToast();
      this._lastDeleted = null;
    }, 5000);
  }

  async _undoDelete() {
    if (!this._lastDeleted) return;
    const { insumo, index } = this._lastDeleted;
    
    this._insumos.splice(index, 0, insumo);
    if (!String(insumo.id).startsWith('new-')) {
      await this._db.save(insumo);
    }

    this._lastDeleted = null;
    this._view.hideUndoToast();
    this._render();
  }

  _filter(query) {
    const filtrados = this._logic.filtrar(this._insumos, query);
    this._view.renderInsumos(filtrados, this._dirtyIds);
  }
}
