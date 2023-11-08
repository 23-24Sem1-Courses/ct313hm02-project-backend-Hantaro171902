const { faker } = require("@faker-js/faker");

function createUser() {
  return {
    name: faker.person.findName(),
    role: faker.random.number({
      min: 0,
      max: 1,
    }),
    password: faker.internet.password(),
    firstname: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.address.city(),
    phone: faker.phone.phoneNumber("09########"),
    email: faker.internet.email(),
  };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("cf_user").del();
  await knex("cf_user").insert(Array(10).fill().map(createUser));
};
