/* eslint-disable camelcase */
const faker = require('faker');

class JobSchema {
  /**
   *
   * @param {Number} $customer_id
   * @param {Number} $quote
   * @param {String} $status
   * @param {String | Date} $completion_date
   */
  constructor(properties, $job_id = null) {
    this.$job_id = $job_id;
    this.$properties = properties;
  }

  static createMock($customer_id) {
    const random = Math.floor(Math.random() * 3);
    const $status = () => {
      switch (random) {
        case 2:
          return 'In Progress';
        case 1:
          return 'Cancelled';
        default:
          return 'Completed';
      }
    };
    return new JobSchema({
      $customer_id,
      $status: $status(),
      $quote: faker.random.number({ min: 0, precision: 2 }),
      $completion_date: faker.date.future(1).toLocaleDateString('en-AU'),
    });
  }
}

module.exports = JobSchema;
