// Teste unitário para EditableTable usando Vitest
// Certifique-se de instalar o vitest e jsdom: npm install --save-dev vitest jsdom

import { describe, it, expect, beforeEach, vi } from 'vitest';
import EditableTable from '../public/editable_table.js';

// Mock do DOM para jsdom
document.body.innerHTML = `
  <table id="test-table">
    <thead>
      <tr><th>Nome</th><th>Valor</th></tr>
    </thead>
    <tbody></tbody>
  </table>
`;

describe('EditableTable', () => {
  let table, instance;
  beforeEach(() => {
    table = document.getElementById('test-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    instance = new EditableTable({
      table,
      columns: [
        { name: 'nome', label: 'Nome', get: row => row.nome, set: (row, v) => row.nome = v },
        { name: 'valor', label: 'Valor', get: row => row.valor, set: (row, v) => row.valor = v }
      ],
      data: [ { nome: 'Arroz', valor: '10' } ],
      onChange: vi.fn()
    });
  });

  it('deve renderizar linhas iniciais', () => {
    expect(table.querySelectorAll('tr').length).toBeGreaterThan(0);
    expect(table.querySelector('input.nome').value).toBe('Arroz');
  });

  it('deve adicionar linha vazia ao final', () => {
    const rows = table.querySelectorAll('tr');
    const lastInputs = rows[rows.length-1].querySelectorAll('input');
    expect(Array.from(lastInputs).every(input => input.value === '')).toBe(true);
  });

  it('deve chamar onChange ao editar', () => {
    const input = table.querySelector('input.nome');
    input.value = 'Feijão';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(instance.options.onChange).toHaveBeenCalled();
  });
});
