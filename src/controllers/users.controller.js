const makeUsersService = require("../services/users.service");
const ApiError = require("../api-error");

// Create and Save a new User
async function createUser(req, res, next) {
  if (!req.body?.u_name) {
    return next(new ApiError(404, "Name can not be empty"));
  }

  try {
    const UsersService = makeUsersService();
    const user = await UsersService.createUser(req.body);
    return res.send(user);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
}

// Retrieve users of a user from the database
async function getUsersByFilter(req, res, next) {
  let users = [];

  try {
    const UsersService = makeUsersService();
    users = await UsersService.getManyUsers(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while retrieving users"));
  }

  return res.send(users);
}

async function getUser(req, res, next) {
  try {
    const UsersService = makeUsersService();
    const user = await UsersService.getUserById(req.params.id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving user with id=${req.params.id}`)
    );
  }
}

async function updateUser(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const usersService = makeUsersService();
    const updated = await usersService.updateUser(req.params.id, req.body);
    if (!updated) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send({ message: "User was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating user with id=${req.params.id}`)
    );
  }
}

async function deleteUser(req, res, next) {
  try {
    const usersService = new makeUsersService();
    const deleted = await usersService.deleteUser(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send({ message: "User was deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error deleting user with id=${req.params.id}`)
    );
  }
}

// Delete all users of a user from the database
async function deleteAllUsers(req, res, next) {
  try {
    const usersService = makeUsersService();
    const deleted = await usersService.deleteAllUsers();
    return res.send({
      message: `${deleted} users were deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while removing all users")
    );
  }
}

// Login
async function login(req, res, next) {
  const { u_name, u_password } = req.body;

  try {
    const UsersService = makeUsersService();
    const user = await UsersService.getUserByCredentials(u_name, u_password);

    if (user) {
      // Successful login
      res.status(200).json({ message: "Login successful", user });
    } else {
      // Failed login
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    next(error); // Pass the error to the next middleware or error handler
  }
}

module.exports = {
  getUsersByFilter,
  deleteAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
};
