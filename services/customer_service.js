const { workshopDBConnection } = require('./database_service');

class CustomerService {
  #db;

  constructor() {
    this.#db = workshopDBConnection();
  }

  create(params) {
    const sql = `
    INSERT INTO customers(name, street_address, city, state, postcode, phone)
      VALUES ($name, $street_address, $city, $state, $postcode, $phone)
    `;
    return this.#db.WRITE(sql, params).then((id) => {
      process.stdout.write(`created customer with id ${id} created!\n`);
      return id;
    });
  }

  getAll() {
    const sql = `
    SELECT *
    FROM customers
    `;
    return this.#db.READ(sql, []);
  }

  findById(params) {
    const sql = `
    SELECT *
    FROM customers
    WHERE customer_id = $customer_id
    `;
    return this.#db.READ(sql, params);
  }
}

module.exports = CustomerService;
