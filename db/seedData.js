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
    image_url: "../Images/DawnFM.jpeg",
  },
  {
    name: "#1",
    price: 15.0,
  },
  {
    name: "#2",
    price: 15.0,
  },
  {
    name: "#3",
    price: 15.0,
  },
  {
    name: "#4",
    price: 15.0,
  },
  {
    name: "#5",
    price: 15.0,
  },
];

module.exports = { seedUsers, seedProducts };
