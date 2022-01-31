const { pool } = require("../index");
const format = require("pg-format");

async function createCart(userId) {
  try {
    const sql = format("INSERT INTO carts(user_id) VALUES(%L);", userId);
    await pool.query(sql);
    return [];
  } catch (error) {
    throw error;
  }
}

async function getUserCartId(userId) {
  try {
    const sql = format("SELECT cart_id FROM carts WHERE user_id = %L", userId);
    const {
      rows: [{ cart_id }],
    } = await pool.query(sql);
    return cart_id;
  } catch (error) {
    throw error;
  }
}

async function addProductToCart(userId, productId, quantity = 1) {
  try {
    const cartId = await getUserCartId(userId);
    const sql = format(
      "INSERT INTO cart_products(cart_id, product_id, quantity) VALUES (%L, %L, %L) ON CONFLICT (cart_id,product_id) DO NOTHING;",
      cartId,
      productId,
      quantity
    );
    await pool.query(sql);
  } catch (error) {
    throw error;
  }
}

async function getUserCartProducts(userId) {
  try {
    const cartId = await getUserCartId(userId);
    const sql = format(
      "SELECT name, price, image_url, quantity FROM products JOIN cart_products ON cart_products.product_id = products.product_id WHERE cart_id = %L",
      cartId
    );
    const { rows } = await pool.query(sql);
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateProductQuantity(userId, productId, quantity) {
  try {
    if (quantity < 1) {
      throw new Error("Quantity cannot be less than 1!");
    }
    const cartId = await getUserCartId(userId);
    const sql = format(
      "UPDATE cart_products SET quantity=%L WHERE product_id = %L AND cart_id = %L RETURNING *;",
      quantity,
      productId,
      cartId
    );

    console.log(sql);
    const { rows } = await pool.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function removeProductFromCart(userId, productId) {
  try {
    const cartId = await getUserCartId(userId);
    const sql = format(
      "DELETE FROM cart_products WHERE cart_id = %L AND product_id = %L RETURNING *;",
      cartId,
      productId
    );
    const { rows } = await pool.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addProductToCart,
  createCart,
  getUserCartId,
  getUserCartProducts,
  removeProductFromCart,
  updateProductQuantity,
};
