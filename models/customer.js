/* eslint-disable camelcase */
const faker = require('faker');

class CustomerSchema {
  constructor(properties, $customer_id = null) {
    this.$properties = properties;
    this.$customer_id = $customer_id;
  }

  static createMock() {
    return new CustomerSchema({
      $name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      $street_address: faker.address.streetAddress(),
      $city: faker.address.city(),
      $state: faker.address.state(),
      $postcode: `${faker.address.zipCode()}`,
      $phone: faker.phone.phoneNumberFormat(),
    });
  }
}

module.exports = CustomerSchema;
