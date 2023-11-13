const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users.router");

const makeUsersService = require("./services/users.service");

const {
  resourceNotFound,
  handlerError,
  methodNotAllowed,
} = require("./controllers/errors.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to coffee shop application." });
});

app.use("/api/users", usersRouter);

// Handler 404 response
app.use(resourceNotFound);

// Handler 405 response
app.use(methodNotAllowed);

// Define error-handling middleware last
app.use(handlerError);

const usersService = makeUsersService();

app.post("/api/login", async (req, res) => {
  const { u_name, u_password } = req.body;

  try {
    // Check credentials against your database using your service
    const user = await usersService.getUserByCredentials(u_name, u_password);

    if (user) {
      // Successful login
      res.status(200).json({ message: "Login successful", user });
    } else {
      // Failed login
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
