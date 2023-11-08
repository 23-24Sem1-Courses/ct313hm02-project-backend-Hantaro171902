const { faker } = require("@faker-js/faker");

function createUser() {
  return {
    firstname: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    phone: faker.phone.number("09########"),
    favorite: faker.number.int({
      min: 0,
      max: 1,
    }),
  };
}
exports.createUser = createUser;
