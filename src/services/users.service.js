//const { createContact } = require('../controllers/cf_user.controller');
const knex = require("../database/knex");

function makeUsersService() {
  // define functions for accessing the database
  function readUser(payload) {
    const cf_user = {
      u_name: payload.username,
      u_password: payload.password,
      first_name: payload.firstname,
      last_name: payload.lastname,
      u_address: payload.address,
      u_telephone: payload.telephone,
      u_email: payload.email,
    };
    // Remove undefined fields
    Object.keys(cf_user).forEach(
      (key) => cf_user[key] === undefined && delete cf_user[key]
    );
    return cf_user;
  }

  async function createUser(payload) {
    const user = readUser(payload);
    const [u_id] = await knex("cf_user").insert(user);
    return { u_id, ...user };
  }

  async function getManyUsers(query) {
    const { u_name, u_role } = query;
    return knex("cf_user")
      .where((builder) => {
        if (u_name) {
          builder.where("u_name", "like", `%${u_name}%`);
        }
        if (u_role !== undefined) {
          builder.where("u_role", u_role);
        }
      })
      .select("*");
  }

  async function getUserById(u_id) {
    return knex("cf_user").where("u_id", u_id).select("*").first();
  }

  async function updateUser(u_id, payload) {
    const update = readUser(payload);
    return knex("cf_user").where("u_id", u_id).update(update);
  }

  async function deleteUser(u_id) {
    return knex("cf_user").where("u_id", u_id).del();
  }

  async function deleteAllUsers() {
    return knex("cf_user").del();
  }

  // Using for Login page
  async function getUserByCredentials(username, password) {
    return knex("cf_user")
      .where({ u_name: username, u_password: password })
      .select("*")
      .first();
  }

  return {
    createUser,
    getManyUsers,
    getUserById,
    updateUser,
    deleteUser,
    deleteAllUsers,
    getUserByCredentials,
  };
}

module.exports = makeUsersService;
