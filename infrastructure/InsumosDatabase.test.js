import { describe, it, expect, beforeEach } from 'vitest';
import InsumosDatabase from './InsumosDatabase.js';
import Insumo from '../logic/values/Insumo.js';
import { indexedDB, IDBKeyRange } from 'fake-indexeddb';

describe('InsumosDatabase (Infrastructure)', () => {
  let db;

  beforeEach(async () => {
    // Usamos createNull injetando o fake-indexeddb para isolamento total
    db = InsumosDatabase.createNull({ indexedDB, IDBKeyRange });
    await db.clear();
  });

  it('deve salvar e recuperar um insumo', async () => {
    const insumo = new Insumo({
      nome: 'Farinha',
      quantidadeCompra: 5,
      unidadeMedida: 'kg',
      precoCusto: 20
    });

    const id = await db.save(insumo);
    expect(id).toBeDefined();

    const insumos = await db.getAll();
    expect(insumos).toHaveLength(1);
    expect(insumos[0].nome).toBe('Farinha');
    expect(insumos[0].precoUnitario).toBe(4);
  });

  it('deve atualizar um insumo existente', async () => {
    const insumo = new Insumo({ nome: 'Açúcar', precoCusto: 10 });
    const id = await db.save(insumo);

    const paraAtualizar = new Insumo({ id, nome: 'Açúcar Mascavo', precoCusto: 15 });
    await db.save(paraAtualizar);

    const insumos = await db.getAll();
    expect(insumos).toHaveLength(1);
    expect(insumos[0].nome).toBe('Açúcar Mascavo');
    expect(insumos[0].precoCusto).toBe(15);
  });

  it('deve deletar um insumo', async () => {
    const id = await db.save(new Insumo({ nome: 'Sal' }));
    await db.delete(id);

    const insumos = await db.getAll();
    expect(insumos).toHaveLength(0);
  });
});
