const makeContactsService = require("../services/contacts.service");
const ApiError = require("../api-error");

// function createContact (req, res){
//     return res.send({ message: 'createContact handler'} );
// }

// Create and Save a new Contact
async function createContact(req, res, next) {
  if (!req.body?.name) {
    return next(new ApiError(404, "Name can not be empty"));
  }

  try {
    const ContactsService = makeContactsService();
    const contact = await ContactsService.createContact(req.body);
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
}

// Retrieve contacts of a user from the database
async function getContactsByFilter(req, res, next) {
  let contacts = [];

  try {
    const ContactsService = makeContactsService();
    contacts = await ContactsService.getManyContacts(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving contacts")
    );
  }

  return res.send(contacts);
}

async function getContact(req, res, next) {
  try {
    const contactsService = makeContactsService();
    const contact = await contactsService.getContactById(req.params.id);
    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
}

// function getContact(req, res) {
//     return res.send({ message: 'getContact handler' });
// }

async function updateContact(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const contactsService = makeContactsService();
    const updated = await contactsService.updateContact(
      req.params.id,
      req.body
    );
    if (!updated) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
}

// function updateContact(req, res) {
//     return res.send({ message: 'updateContact handler' });
// }

async function deleteContact(req, res, next) {
  try {
    const contactsService = new makeContactsService();
    const deleted = await contactsService.deleteContact(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Contact not delete contact with id=${req.params.id}`)
    );
  }
}

// function deleteContact(req, res) {
//     return res.send({ message: 'deleteContact handler' });
// }

// Delete all contacts of a user from the database
async function deleteAllContacts(req, res, next) {
  try {
    const contactsService = makeContactsService();
    const deleted = await contactsService.deleteAllContacts();
    return res.send({
      message: `${deleted} contacts were deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while removing all contacts")
    );
  }
}

// function deleteAllContacts(req, res) {
//     return res.send({ message: 'deleteAllContacts handler' });
// }

module.exports = {
  getContactsByFilter,
  deleteAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
