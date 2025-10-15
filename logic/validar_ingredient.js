// Função de validação para Ingredient
// Retorna { valido: boolean, erros: {campo: mensagem} }
import Ingredient from '../values/ingredient.js';

export function validarIngredient(ingredient) {
    const erros = {};
    if (!ingredient.nome || ingredient.nome.trim() === '') {
        erros.nome = 'O nome é obrigatório.';
    }
    if (!ingredient.preco || ingredient.preco.trim() === '' || isNaN(Number(ingredient.preco))) {
        erros.preco = 'O preço é obrigatório e deve ser um número.';
    }
    if (!ingredient.unidade || ingredient.unidade.trim() === '') {
        erros.unidade = 'A unidade de medida é obrigatória.';
    }
    if (!ingredient.quantidade || ingredient.quantidade.trim() === '' || isNaN(Number(ingredient.quantidade))) {
        erros.quantidade = 'A quantidade é obrigatória e deve ser um número.';
    }
    return {
        valido: Object.keys(erros).length === 0,
        erros
    };
}
