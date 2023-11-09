//const { createContact } = require('../controllers/users.controller');
const knex = require("../database/knex");

function makeUsersService() {
  // define functions for accessing the database
  function readUser(payload) {
    const users = {
      u_name: payload.u_name, // Generate a user name
      u_role: payload.u_role,
      u_password: payload.u_password,
      first_name: payload.first_name,
      last_name: payload.last_name,
      u_address: payload.u_address,
      u_telephone: payload.u_telephone,
      u_email: payload.u_email,
    };
    // Remove undefined fields
    Object.keys(users).forEach(
      (key) => users[key] === undefined && delete users[key]
    );
    return users;
  }

  async function createUser(payload) {
    const user = readUser(payload);
    const [id] = await knex("users").insert(user);
    return { id, ...user };
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

  async function getUserById(id) {
    return knex("users").where("id", id).select("*").first();
  }

  async function updateUser(id, payload) {
    const update = readUser(payload);
    return knex("users").where("id", id).update(update);
  }

  async function deleteUser(id) {
    return knex("users").where("id", id).del();
  }

  async function deleteAllUsers() {
    return knex("users").del();
  }

  return {
    createUser,
    getManyUsers,
    getUserById,
    updateUser,
    deleteUser,
    deleteAllUsers,
  };
}

module.exports = makeUsersService;
