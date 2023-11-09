const { faker } = require("@faker-js/faker");

function createUser() {
  return {
    u_name: faker.internet.userName(), // Generate a user name
    u_role: faker.number.int({
      min: 0,
      max: 1,
    }),
    u_password: faker.internet.password(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    u_address: faker.location.city(),
    u_telephone: faker.phone.number(),
    u_email: faker.internet.email(),
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
npm;
