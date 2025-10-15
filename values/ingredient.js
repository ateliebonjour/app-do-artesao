// Value object para Ingredient
export default class Ingredient {
    constructor({ nome = '', preco = '', unidade = '', quantidade = '' } = {}) {
        this.nome = nome;
        this.preco = preco;
        this.unidade = unidade;
        this.quantidade = quantidade;
    }

    static fromObject(obj) {
        return new Ingredient({
            nome: obj.nome || '',
            preco: obj.preco || '',
            unidade: obj.unidade || '',
            quantidade: obj.quantidade || ''
        });
    }
}
