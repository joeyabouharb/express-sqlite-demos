const { workshopDBConnection } = require('./database_service');

class JobService {
  #db;

  constructor() {
    this.#db = workshopDBConnection();
  }

  create(params) {
    const sql = `
    INSERT INTO jobs(customer_id, status, quote, completion_date)
    VALUES ($customer_id, $status, $quote, $completion_date);
    `;
    return this.#db.WRITE(sql, params)
      .then((id) => {
        process.stdout.write(`Job With id ${id} created!\n`);
        return id;
      });
  }

  findById(params) {
    const sql = `
    SELECT *
    FROM jobs
    WHERE job_id = $job_id
    `;
    return this.#db.READ(sql, params);
  }

  getAll() {
    const sql = `
    SELECT *
    FROM jobs
    `;
    return this.#db.READ(sql, []);
  }
}

module.exports = JobService;
