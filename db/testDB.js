const {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
} = require("./Cart/cartDBFunctions");
const { createOrder } = require("./Orders/orderDBFunctions");
const { updateProduct } = require("./Products/productDBFunctions");
const { getUserById } = require("./Users/userDBFunctions");

const contactInfo = {
  email: "testorder@email.com",
  address: "1234 Telegraph Road",
  city: "Glen Burnie",
  state: "MD",
  zip: "11111",
};

const products = [
  { product_id: 1, quantity: 5 },
  { product_id: 2, quantity: 50 },
  { product_id: 3, quantity: 500 },
];

const update = async () => {
  await addProductToCart(1, 1, 5);
  await addProductToCart(1, 2);
  await getUserById(1);
  await updateProductQuantity(1, 1, 10);
  await getUserById(1);
  await removeProductFromCart(1, 1);
  await getUserById(1);

  await createOrder(contactInfo, products, 1);
  await createOrder(contactInfo, products);

  await updateProduct({ price: 799.0 }, 3);
};

update();
