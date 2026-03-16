import { describe, it, expect } from 'vitest';
import InsumosLogic from './InsumosLogic.js';
import Insumo from './values/Insumo.js';

describe('InsumosLogic', () => {
  const logic = new InsumosLogic();

  it('deve validar insumo com sucesso', () => {
    const insumo = new Insumo({ nome: 'Trigo', quantidadeCompra: 1, precoCusto: 10 });
    const resultado = logic.validar(insumo);
    expect(resultado.valido).toBe(true);
  });

  it('deve falhar se o nome for vazio', () => {
    const insumo = new Insumo({ nome: '', quantidadeCompra: 1, precoCusto: 10 });
    const resultado = logic.validar(insumo);
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.nome).toBeDefined();
  });

  it('deve falhar se a quantidade for zero ou negativa', () => {
    const insumo = new Insumo({ nome: 'Trigo', quantidadeCompra: 0, precoCusto: 10 });
    const resultado = logic.validar(insumo);
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.quantidadeCompra).toBeDefined();
  });

  it('deve filtrar insumos pelo nome', () => {
    const lista = [
      new Insumo({ nome: 'Farinha' }),
      new Insumo({ nome: 'Açúcar' }),
      new Insumo({ nome: 'Fio de Malha' })
    ];
    
    expect(logic.filtrar(lista, 'far')).toHaveLength(1);
    expect(logic.filtrar(lista, 'f')).toHaveLength(2);
    expect(logic.filtrar(lista, '')).toHaveLength(3);
  });
});
