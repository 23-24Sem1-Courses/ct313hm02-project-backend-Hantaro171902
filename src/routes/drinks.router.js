const express = require("express");
const drinksController = require("../controllers/drinks.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router
  .route("/")
  .get(drinksController.getDrinksByFilter)
  .post(drinksController.createDrink)
  .delete(drinksController.deleteAllDrinks)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(drinksController.getDrink)
  .put(drinksController.updateDrink)
  .delete(drinksController.deleteDrink)
  .all(methodNotAllowed);

module.exports = router;