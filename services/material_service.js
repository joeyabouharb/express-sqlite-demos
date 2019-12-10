const { workshopDBConnection } = require('./database_service');

class MaterialService {
  /**
 * @param {String} connection
 */
  #db;

  constructor() {
    this.#db = workshopDBConnection();
  }

  /**
  * @param {MaterialSchema} params
  */
  create(params) {
    const sql = `
    INSERT INTO materials(supplier, cost, description, stock)
    VALUES ($supplier, $cost, $description, $stock)
    `;
    return this.#db.WRITE(sql, params)
      .then((id) => { process.stdout.write(`material with ${id} Written Successfully`); return id; });
  }

  getAll() {
    const sql = `
      SELECT *
      FROM materials
    `;
    return this.#db.READ(sql, []);
  }
  /**
   *
   * @typedef {Object} $id
   * @property {Number} $id
   */

  /**
   *
   * @param {$id} params
   */
  findById(params) {
    const sql = `
    SELECT *
    FROM materials
    WHERE material_id = $material_id
    `;
    return this.#db.READ(sql, params);
  }
}

module.exports = MaterialService;
