// Infrastructure: leitura e escrita de ingredientes no localStorage
import Ingredient from '../values/ingredient.js';

const STORAGE_KEY = 'ingredientes';

export function salvarIngredientes(ingredientes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ingredientes));
}

export function carregarIngredientes() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
        const arr = JSON.parse(data);
        return arr.map(obj => Ingredient.fromObject(obj));
    } catch {
        return [];
    }
}
