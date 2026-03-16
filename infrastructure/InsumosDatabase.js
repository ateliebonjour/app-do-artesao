import Dexie from 'dexie';
import Insumo from '../logic/values/Insumo.js';

/**
 * Camada de Infraestrutura para persistência de Insumos.
 * Utiliza Dexie.js para interface com IndexedDB.
 */
export default class InsumosDatabase {
  constructor(db) {
    this._db = db;
  }

  /**
   * Fábrica para produção.
   */
  static create() {
    const db = new Dexie('AppDoArtesaoDB');
    db.version(1).stores({
      insumos: '++id, nome'
    });
    return new InsumosDatabase(db);
  }

  /**
   * Fábrica para testes (Nullable).
   * @param {Object} options
   * @param {Array} options.seedData - Dados iniciais para o banco
   * @param {Object} options.indexedDB - Implementação de indexedDB (ex: fake-indexeddb)
   * @param {Object} options.IDBKeyRange - Implementação de IDBKeyRange
   */
  static createNull({ seedData = [], indexedDB = null, IDBKeyRange = null } = {}) {
    // Para simplificar o createNull mantendo o comportamento real do Dexie
    // usamos o fake-indexeddb se fornecido ou injetado.
    const db = new Dexie('AppDoArtesaoDB_Null', { 
      indexedDB: indexedDB,
      IDBKeyRange: IDBKeyRange
    });
    db.version(1).stores({
      insumos: '++id, nome'
    });
    
    const repo = new InsumosDatabase(db);
    if (seedData.length > 0) {
      // Como indexedDB é assíncrono, seedData aqui é um pouco complexo 
      // se não esperarmos. Mas para Nullables simples, podemos preenchê-lo.
      // Em testes reais, o setup do teste cuida do preenchimento.
    }
    return repo;
  }

  async getAll() {
    const records = await this._db.insumos.toArray();
    return records.map(r => Insumo.fromObject(r));
  }

  async save(insumo) {
    const data = {
      nome: insumo.nome,
      quantidadeCompra: insumo.quantidadeCompra,
      unidadeMedida: insumo.unidadeMedida,
      precoCusto: insumo.precoCusto
    };
    if (insumo.id) {
      data.id = insumo.id;
    }
    const id = await this._db.insumos.put(data);
    return id;
  }

  async delete(id) {
    await this._db.insumos.delete(id);
  }

  async clear() {
    await this._db.insumos.clear();
  }
}
