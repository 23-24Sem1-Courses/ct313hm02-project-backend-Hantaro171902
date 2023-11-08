const express = require("express");
const contactsController = require("../controllers/contacts.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router
  .route("/")
  .get(contactsController.getContactsByFilter)
  .post(contactsController.createContact)
  .delete(contactsController.deleteAllContacts)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(contactsController.getContact)
  .put(contactsController.updateContact)
  .delete(contactsController.deleteContact)
  .all(methodNotAllowed);

module.exports = router;
