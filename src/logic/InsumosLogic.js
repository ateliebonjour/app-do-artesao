import Insumo from './values/Insumo.js';

/**
 * Camada de Lógica pura (Business Rules).
 * Não possui dependências de infraestrutura.
 */
export default class InsumosLogic {
  /**
   * Valida se um insumo pode ser salvo.
   * @param {Insumo} insumo 
   * @returns {Object} { valido: boolean, erros: Object }
   */
  validar(insumo) {
    const erros = {};
    if (!insumo.nome || insumo.nome.trim() === '') {
      erros.nome = 'O nome é obrigatório.';
    }
    if (insumo.quantidadeCompra <= 0) {
      erros.quantidadeCompra = 'A quantidade deve ser maior que zero.';
    }
    if (insumo.precoCusto < 0) {
      erros.precoCusto = 'O preço não pode ser negativo.';
    }
    return {
      valido: Object.keys(erros).length === 0,
      erros
    };
  }

  /**
   * Filtra uma lista de insumos pelo nome.
   * @param {Array<Insumo>} insumos 
   * @param {string} busca 
   * @returns {Array<Insumo>}
   */
  filtrar(insumos, busca) {
    if (!busca) return insumos;
    const b = busca.toLowerCase();
    return insumos.filter(i => i.nome.toLowerCase().includes(b));
  }
}
