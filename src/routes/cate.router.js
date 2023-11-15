const express = require("express");
const drinksController = require("../controllers/drinks.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const router = express.Router();

router
  .route("/")
  .get(drinksController.getDrinksByFilter)
  .post(drinksController.createDrink)
  .all(methodNotAllowed);

router
  .route("/:id")
  .delete(drinksController.deleteCategories)
  .all(methodNotAllowed);

module.exports = router;