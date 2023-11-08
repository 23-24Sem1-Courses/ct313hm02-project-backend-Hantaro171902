const { faker } = require("@faker-js/faker");

function createUser() {
  return {
    firstname: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.cityAddress(),
    phone: faker.phone.number("09########"),
    role: faker.number.int({
      min: 0,
      max: 1,
    }),
  };
}
exports.createUser = createUser;
