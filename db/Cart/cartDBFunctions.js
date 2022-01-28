const { pool } = require("../index");
const format = require("pg-format");

async function getUserCart(userId) {
  const client = await pool.connect();
  const getCartSQL = format("SELECT * FROM carts WHERE user_id = %L", userId);
  try {
    const userCart = await client.query(getCartSQL);

    if (userCart.rows.length === 0) {
      const createCartSQL = format(
        "INSERT INTO carts(user_id) VALUES(%L)",
        userId
      );
      await client.query(createCartSQL);
      return [];
    }

    const cartProducts = await client.query();
  } catch (error) {
  } finally {
    client.release();
  }
}

async function createCart() {
  const client = await pool.connect();
  try {
  } catch (error) {
  } finally {
    client.release();
  }
}

async function addProductToCart(userId, productId) {
  const client = await pool.connect();
  try {
  } catch (error) {
  } finally {
    client.release();
  }
}

module.exports = {
  addProductToCart,
  createCart,
  getUserCart,
};
