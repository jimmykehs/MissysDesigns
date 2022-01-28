const { getUserCart } = require("./Cart/cartDBFunctions");
const {
  deleteUser,
  updateUser,
  getUserById,
} = require("./Users/userDBFunctions");

const update = async () => {
  await updateUser(
    {
      address: `1234 Main Street`,
      city: `Baltimore`,
      state: "MD",
      zip: "12345",
    },
    2
  );

  await getUserById(1);
};

update();
