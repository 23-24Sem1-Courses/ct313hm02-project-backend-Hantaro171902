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
    u_telephone: faker.phone.number("09########"),
    u_email: faker.internet.email(),
  };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Disable foreign key constraints
  await knex.raw("SET foreign_key_checks = 0");

  // Delete rows from dependent tables first
  await knex("cf_shopping_session").del();

  // Deletes ALL existing entries
  await knex("cf_user").del();

  // Insert data
  await knex("cf_user").insert(Array(10).fill().map(createUser));

  // Re-enable foreign key constraints
  await knex.raw("SET foreign_key_checks = 1");
};
