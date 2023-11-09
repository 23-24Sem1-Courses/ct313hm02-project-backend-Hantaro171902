//const { createContact } = require('../controllers/cf_user.controller');
const knex = require("../database/knex");

function makeUsersService() {
  // define functions for accessing the database
  function readUser(payload) {
    const cf_user = {
      u_name: payload.u_name,
      u_role: payload.u_role,
      u_password: payload.u_password,
      first_name: payload.first_name,
      last_name: payload.last_name,
      u_address: payload.u_address,
      u_telephone: payload.u_telephone,
      u_email: payload.u_email,
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
