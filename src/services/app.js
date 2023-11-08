const express = require("express");
const cors = require("cors");
// const contactsRouter = require("./routes/contacts.router");
const {
  resourceNotFound,
  handlerError,
  methodNotAllowed,
} = require("./controllers/errors.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact shop application." });
});

app.use("/api/contacts", contactsRouter);

// Handler 404 response
app.use(resourceNotFound);

// Handler 405 response
app.use(methodNotAllowed);

// Define error-handling middleware last
app.use(handlerError);

module.exports = app;
