/**
 * Value Object para Insumo.
 * Segue as regras definidas em gestao-de-produtos-mvp.md e cadastrar-insumo.md.
 */
export default class Insumo {
  constructor({
    id = null,
    nome = '',
    quantidadeCompra = 0,
    unidadeMedida = 'un',
    precoCusto = 0,
  } = {}) {
    this.id = id;
    this.nome = nome;
    this.quantidadeCompra = Number(quantidadeCompra);
    this.unidadeMedida = unidadeMedida;
    this.precoCusto = Number(precoCusto);
  }

  /**
   * Calcula o preço unitário (Preço de Custo / Quantidade de Compra).
   * @returns {number}
   */
  get precoUnitario() {
    if (this.quantidadeCompra <= 0) return 0;
    return this.precoCusto / this.quantidadeCompra;
  }

  /**
   * Retorna uma string formatada para exibição (ex: "R$ 3,60/kg").
   * @returns {string}
   */
  get precoUnitarioFormatado() {
    const formatador = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return `${formatador.format(this.precoUnitario)}/${this.unidadeMedida}`;
  }

  static fromObject(obj) {
    return new Insumo(obj);
  }
}
