import { describe, it, expect } from 'vitest';
import Insumo from './Insumo.js';

describe('Insumo Value Object', () => {
  it('deve calcular o preço unitário corretamente', () => {
    const insumo = new Insumo({
      quantidadeCompra: 2,
      precoCusto: 50,
      unidadeMedida: 'kg'
    });
    expect(insumo.precoUnitario).toBe(25);
    expect(insumo.precoUnitarioFormatado).toContain('R$ 25,00/kg');
  });

  it('deve lidar com centavos e fracionados', () => {
    const insumo = new Insumo({
      quantidadeCompra: 500,
      precoCusto: 100,
      unidadeMedida: 'ml'
    });
    expect(insumo.precoUnitario).toBe(0.20);
    expect(insumo.precoUnitarioFormatado).toContain('R$ 0,20/ml');
  });

  it('deve retornar 0 se a quantidade for zero para evitar divisão por zero', () => {
    const insumo = new Insumo({
      quantidadeCompra: 0,
      precoCusto: 10,
      unidadeMedida: 'un'
    });
    expect(insumo.precoUnitario).toBe(0);
  });

  it('deve converter strings numéricas para Number', () => {
    const insumo = new Insumo({
      quantidadeCompra: '1.5',
      precoCusto: '30',
      unidadeMedida: 'm'
    });
    expect(insumo.precoUnitario).toBe(20);
    expect(insumo.quantidadeCompra).toBe(1.5);
    expect(insumo.precoCusto).toBe(30);
  });
});
