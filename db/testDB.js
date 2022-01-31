const {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
} = require("./Cart/cartDBFunctions");
const { getUserById } = require("./Users/userDBFunctions");

const update = async () => {
  await addProductToCart(1, 1, 5);
  await addProductToCart(1, 2);
  await getUserById(1);
  await updateProductQuantity(1, 1, 10);
  await getUserById(1);
  await removeProductFromCart(1, 1);
  await getUserById(1);
};

update();
