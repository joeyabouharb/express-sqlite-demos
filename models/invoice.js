/* eslint-disable camelcase */
const faker = require('faker');

class InvoiceSchema {
  constructor(properties, $id) {
    this.$properties = properties;
    this.$id = $id;
  }

  static createMock(materialCount, jobsCount) {
    const $material_id = Math.ceil(Math.random() * materialCount);
    const $job_id = Math.ceil(Math.random() * jobsCount);
    return new InvoiceSchema({
      $material_id,
      $job_id,
      $quantity: faker.random.number(100),
    });
  }
}

module.exports = InvoiceSchema;
