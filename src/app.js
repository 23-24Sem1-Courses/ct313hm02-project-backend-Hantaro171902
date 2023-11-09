const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users.router");
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

module.exports = app;
