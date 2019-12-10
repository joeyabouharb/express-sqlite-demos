/* eslint-disable camelcase */
const { workshopDBConnection } = require('./database_service');

class InvoiceService {
  #db;

  constructor() {
    this.#db = workshopDBConnection();
  }

  createNewInvoice(params) {
    const sql = `
    INSERT INTO job_materials(job_id, material_id, quantity)
      VALUES($job_id, $material_id, $quantity)
    `;
    return this.#db.WRITE(sql, params)
      .then((id) => { console.info(`Invoice created with id ${id}`); return id; });
  }

  getAllInvoices() {
    const sql = `
    SELECT DISTINCT(jm.job_id), c.name, i.quote, i.status, i.completion_date, SUM(m.cost * jm.quantity) as cost_price
    FROM jobs as i, materials as m
      JOIN customers as c
        ON i.customer_id = c.customer_id
      JOIN job_materials as jm
        ON jm.job_id = i.job_id AND m.material_id = jm.material_id
    GROUP BY c.customer_id
    `;
    return this.#db.READ(sql, []);
  }

  getInvoiceWithId(params) {
    const sql = `
    SELECT DISTINCT(jm.job_id), c.name, i.quote, i.status, i.completion_date, SUM(m.cost * jm.quantity) as cost_price
    FROM jobs as i, materials as m
      JOIN customers as c
        ON i.customer_id = c.customer_id
      JOIN job_materials as jm
        ON jm.job_id = i.job_id AND m.material_id = jm.material_id
      WHERE id = $id
    GROUP BY c.customer_id
    `;
    return this.#db.READ(sql, params);
  }

  getMaterialsUsed(params) {
    const sql = `
    SELECT m.description, jm.quantity
    FROM job_materials jm
    JOIN materials m
      ON jm.material_id = m.material_id
    WHERE jm.job_id = $job_id
    `;
    return this.#db.READ(sql, params);
  }

  getCount() {
    const sql = `
    SELECT 
    (SELECT COUNT(*) FROM materials),
    (SELECT COUNT(*) FROM jobs)
    `;
    return this.#db.READ(sql, [])
      .then(([result]) => Object.values(result));
  }

  async writeInvoice(params) {
    const sql = `
    INSERT INTO job_materials(job_id, material_id, quantity)
      VALUES($job_id, $material_id, $quantity)
    `;
    const { $job_id, $materials } = params;
    return Promise.all(
      $materials.map(
        (material) => (
          this.#db.WRITE(sql, { $job_id, ...material })
        ),
      ),
    ).then((_) => {
      process.stdout.write(`wrote Invoice for job id ${$job_id} successfully\n`);
      return true;
    });
  }
}

module.exports = InvoiceService;
