const seedUsers = [
  {
    email: "jamesekehs@gmail.com",
    password: "password",
    first_name: "James",
    last_name: "Kehs",
    address: "11000 Buddy Ellis Road",
    city: "Denham Springs",
    state: "LA",
    zip: "70726",
  },
  {
    first_name: "John",
    last_name: "Doe",
    email: "email@gmail.com",
    password: "password",
  },
  {
    first_name: "Post",
    last_name: "Malone",
    email: "posty@gmail.com",
    password: "password",
    address: "1234 Whitney Ave",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
  },
];

const seedProducts = [
  {
    name: "DAWN FM Vinyl",
    price: 50.75,
  },
  {
    name: "Pizza Rolls - 130 CT",
    price: 10.0,
  },
  {
    name: "Tesla Model S",
    price: 80000,
  },
];

module.exports = { seedUsers, seedProducts };
