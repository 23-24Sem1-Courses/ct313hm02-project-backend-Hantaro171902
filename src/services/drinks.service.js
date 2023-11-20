const knex = require("../database/knex");
const Paginator = require("./paginator");

function makeDrinksService() {
    function readDrink(payload) {
        const drink = {
            dr_name: payload.dr_name,
            dr_price: payload.dr_price,
            dr_img: payload.dr_img,
            cate_id: payload.cate_id,
        };
        Object.keys(drink).forEach(
            (key) => drink[key] === undefined && delete drink[key]
        );
        return drink;
    }

    function readCategories(payload) {
        const cate_drink = {
            cate_id: payload.cate_id,
            cate_name: payload.cate_name,
        };

        Object.keys(cate_drink).forEach(
            (key) => cate_drink[key] === undefined && delete cate_drink[key]
        );
        return cate_drink;
    }

    async function createDrink(payload) {
        const drink = readDrink(payload);
        const [id] = await knex("cf_drinks").insert(drink);
        return { id, ...drink };
    }

    async function createCategory(payload) {
        const cate_drink = readCategories(payload);
        const [id] = await knex("cf_categories").insert(cate_drink);
        return { id, ...cate_drink };
    }

    async function getManyDrinks(query) {
        const { dr_name, page = 1, limit = 10 } = query;
        const paginator = new Paginator(page, limit);
        let results = await knex("cf_drinks")
            .join("cf_categories", "cf_drinks.cate_id", "=", "cf_categories.cate_id")
            .where((builder) => {
                if (dr_name) {
                    builder.where("dr_name", "like", `%${dr_name}%`);
                }
            })
            .select(
                knex.raw("count(dr_id) OVER() AS recordsCount"),
                "dr_id",
                "dr_name",
                "dr_price",
                "dr_img",
                "cf_categories.cate_name"
            )
            .limit(paginator.limit)
            .offset(paginator.offset);
        let totalRecords = 0;
        results = results.map((result) => {
            totalRecords = result.recordsCount;
            delete result.recordsCount;
            return result;
        });
        return {
            metadata: paginator.getMetadata(totalRecords),
            drink: results,
        };
    }

    async function getManyCategories() {
        return knex("cf_categories").select("*");
    }

    async function getDrinkById(id) {
        return knex("cf_drinks").where("dr_id", id).select("*").first();
    }

    async function updateDrink(id, payload) {
        const update = readDrink(payload);
        return knex("cf_drinks").where("dr_id", id).update(update);
    }

    async function deleteDrink(id) {
        return knex("cf_drinks").where("dr_id", id).del();
    }

    async function deleteCategory(id) {
        return knex("cf_categories").where("cate_id", id).del();
    }

    async function deleteAllDrinks() {
        return knex("cf_drinks").del();
    }

    return {
        createDrink,
        getManyDrinks,
        getDrinkById,
        updateDrink,
        deleteDrink,
        deleteAllDrinks,
        createCategory,
        getManyCategories,
        deleteCategory,
    };
}
module.exports = makeDrinksService;
