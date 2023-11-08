const { createUser } = require("./createUser");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("contacts").del();
  await knex("contacts").insert(Array(100).fill().map(createUser));
};
