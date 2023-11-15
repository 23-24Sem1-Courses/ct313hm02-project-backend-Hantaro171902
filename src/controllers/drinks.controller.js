const makeDrinksService = require("../services/drinks.service");
const ApiError = require("../api-error");

async function createDrink(req, res, next) {
    if (!req.body ?.dr_name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const drinksService = makeDrinksService();
        const drink = await drinksService.createDrink(req.body);
        return res.send(drink);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the contanct")
        );
    }
}

async function createCategory(req, res, next) {
    if (!req.body?.cate_name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const drinksService  = makeDrinksService();
        const cate_drink = await drinksService.createCategory(req.body);
        return res.send(cate_drink);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the contanct")
        );
    }
}

async function getDrinksByFilter(req, res, next) {
    let cf_drinks = [];
    try {
        const drinksService = makeDrinksService();
        cf_drinks = await drinksService.getManyDrinks(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving contants")
        );
    }
    return res.send(cf_drinks);
}

async function getCategoriesByFilter(req, res, next) {
    let cf_categories = [];
    try {
        const drinksService = makeDrinksService();
        cf_categories = await drinksService.getManyCategories(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(cf_categories);
}

async function getDrink(req, res, next) {
    try {
        const drinksService = makeDrinksService();
        const drinks = await drinksService.getDrinkById(req.params.id);
        if (!drinks) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(drinks);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

async function updateDrink(req, res, next) {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const drinksService = makeDrinksService();
        const updated = await drinksService.updateDrink(req.params.id, req.body);
        if (!updated) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                " Error updating contact with id= ${req.params.id}"
            )
        );
    }
}

async function deleteDrink(req, res, next) {
    try {
        const drinksService = makeDrinksService();
        const deleted = await drinksService.deleteDrink(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, "Drink not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

async function deleteCategories(req, res, next) {
    try {
        const typesService = makeDrinksService();
        const deleted = await typesService.deletetype(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
}

async function deleteAllDrinks(req, res, next) {
    try {
        const drinksService = makeDrinksService();
        const deleted = await drinksService.deleteAllDrinks();
        return res.send({
            message: `${deleted} drinks were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
}

module.exports = {
    getDrinksByFilter,
    deleteAllDrinks,
    getDrink,
    createDrink,
    updateDrink,
    deleteDrink,
    createCategory,
    getCategoriesByFilter,
    deleteCategories,
};