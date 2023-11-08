//const { createContact } = require('../controllers/contacts.controller');
const knex = require('../database/knex');

function makeContactsService() {
    // define functions for accessing the database
    function readContact(payload) {
        const contacts = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undefined fields
        Object.keys(contacts).forEach(
            (key) => contacts[key] === undefined && delete contacts[key]
        );
        return contacts;
    }

    async function createContact(payload) {
        const contact = readContact(payload);
        const [id] = await knex('contacts').insert(contact);
        return { id, ...contact };
    }

    async function getManyContacts(query) {
        const { name, favorite } = query;
        return knex('contacts')
            .where((builder) => {
                if (name) {
                    builder.where('name', 'like', `%${name}%`);
                }
                if (favorite !== undefined) {
                    builder.where('favorite', 1);
                }
            })
            .select('*');
        }
 
    async function getContactById(id) {
        return knex('contacts').where('id', id).select('*').first();
    }

    async function updateContact(id, payload) {
        const update = readContact(payload);
        return knex('contacts').where('id', id).update(update);
    }

    async function deleteContact(id) {
        return knex('contacts').where('id', id).del();
    }

    async function deleteAllContacts() {
        return knex('contacts').del();
    }

    return{
        createContact,
        getManyContacts,
        getContactById,
        updateContact,
        deleteContact,
        deleteAllContacts,
    };
}

module.exports = makeContactsService;