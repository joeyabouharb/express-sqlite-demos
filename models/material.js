/* eslint-disable camelcase */
const faker = require('faker');

class MaterialSchema {
  /**
   *
   * @param {String} $supplier
   * @param {Number} $cost
   * @param {String} $description
   * @param {Number} $stock
   */
  constructor($properties, $material_id = null) {
    this.$material_id = $material_id;
    this.$properties = $properties;
  }

  static createMock() {
    const $supplier = faker.random.words({ min: 1, max: 4 });
    const $cost = faker.random.number({ min: 1, max: 1000, precision: 3 });
    const $description = faker.random.words(10);
    const $stock = faker.random.number();
    return new MaterialSchema({
      $supplier, $cost, $description, $stock,
    });
  }
}

module.exports = MaterialSchema;
