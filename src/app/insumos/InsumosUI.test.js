import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import InsumosController from './InsumosController.js';
import InsumosView from './InsumosView.js';
import InsumosLogic from '../../logic/InsumosLogic.js';
import Insumo from '../../logic/values/Insumo.js';
import InsumosDatabase from '../../infrastructure/InsumosDatabase.js';
import { indexedDB, IDBKeyRange } from 'fake-indexeddb';

describe('Insumos UI Controller/View Tests (Nullable DB)', () => {
  let db, logic, view, controller;

  beforeEach(async () => {
    document.body.innerHTML = `
      <header>
        <div id="status-bar" class="hidden"><span id="status-text"></span></div>
        <button id="save-all-btn" class="hidden">Salvar Tudo</button>
        <button id="add-insumo-btn">Adicionar Insumo</button>
      </header>
      <input type="text" placeholder="Buscar insumo..." id="search-input">
      <div id="insumos-table-body"></div>
      <div id="add-row-ghost">Adicionar Nova Linha</div>
      <div id="save-toast" class=""></div>
      <div id="undo-toast" class="hidden">
        <span id="undo-text"></span>
        <button id="undo-btn">Desfazer</button>
      </div>
    `;

    // Utilizando o Embedded Stub (Testing Without Mocks)
    db = InsumosDatabase.createNull({ indexedDB, IDBKeyRange });
    await db.clear();

    logic = new InsumosLogic();
    view = new InsumosView();
    controller = new InsumosController(view, db, logic);
    
    vi.stubGlobal('confirm', () => true);
    
    await controller.start();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('deve adicionar uma nova linha e focar o nome', async () => {
    const addBtn = screen.getByText('Adicionar Insumo');
    fireEvent.click(addBtn);
    expect(document.querySelectorAll('.row')).toHaveLength(1);
    expect(document.activeElement.placeholder).toBe('Nome do insumo...');
  });

  it('deve marcar linha como dirty ao digitar', async () => {
    const addBtn = screen.getByText('Adicionar Insumo');
    fireEvent.click(addBtn);

    const nameInput = screen.getByPlaceholderText('Nome do insumo...');
    await userEvent.type(nameInput, 'Farinha');

    const row = document.querySelector('.row');
    expect(row.className).toContain('row-dirty');
  });

  it('deve ser capaz de salvar alterações manualmente via Controller (State-based test)', async () => {
    const addBtn = screen.getByText('Adicionar Insumo');
    fireEvent.click(addBtn);

    const nameInput = screen.getByPlaceholderText('Nome do insumo...');
    fireEvent.input(nameInput, { target: { value: 'Trigo' } });
    fireEvent.input(screen.getByPlaceholderText('0'), { target: { value: '10' } });
    fireEvent.input(screen.getByPlaceholderText('0,00'), { target: { value: '50' } });

    // Em vez de esperar o debounce (que falha no JSDOM), chamamos o salvamento manualmente
    await controller._saveAll();

    // State-Based Verification: checamos o estado no banco de dados "Nulado"
    const saved = await db.getAll();
    expect(saved).toHaveLength(1);
    expect(saved[0].nome).toBe('Trigo');
    expect(saved[0].quantidadeCompra).toBe(10);
    expect(saved[0].precoCusto).toBe(50);
    
    expect(document.querySelector('.row').className).not.toContain('row-dirty');
  });

  it('deve deletar item e permitir undo (State-based test)', async () => {
    // Configura os dados iniciais do banco
    const item = new Insumo({ nome: 'Sal', quantidadeCompra: 1, unidadeMedida: 'un', precoCusto: 10 });
    const id = await db.save(item);
    
    // Reinicia o controller para ler esses dados
    await controller.start();

    const deleteBtn = document.querySelector('.btn-delete');
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      // Confirma que sumiu da View
      return document.querySelectorAll('.row').length === 0;
    });

    // Confirma que sumiu do Banco
    let dbState = await db.getAll();
    expect(dbState).toHaveLength(0);

    const undoBtn = screen.getByText('Desfazer');
    fireEvent.click(undoBtn);

    await waitFor(() => {
      // Confirma que voltou para a View
      return document.querySelectorAll('.row').length === 1;
    });
    
    // Confirma que voltou para o Banco
    dbState = await db.getAll();
    expect(dbState).toHaveLength(1);
    expect(dbState[0].nome).toBe('Sal');
  });
});
