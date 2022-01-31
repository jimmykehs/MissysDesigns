const { pool } = require("../index.js");
const format = require("pg-format");
const { createSetString, createValueString } = require("../index.js");

async function createProduct(product) {
  try {
    const sql = format(
      "INSERT INTO products(%s) VALUES(%s) RETURNING *;",
      Object.keys(product).join(","),
      createValueString(product)
    );
    const {
      rows: [newProduct],
    } = await pool.query(sql, Object.values(product));
    console.log("NEW USER CREATED: ", newProduct);
    return newProduct;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(updateData, productId) {
  const sql = format(
    `UPDATE users SET %s WHERE user_id = %s RETURNING *;`,
    createSetString(updateData),
    productId
  );
  try {
    const { rows } = await pool.query(sql, Object.values(updateData));
    console.log("PRODUCT UPDATED", rows);
    return rows;
  } catch (error) {}
}

async function deleteProduct(productId) {
  const sql = format(
    `DELETE FROM users WHERE user_id = %s RETURNING *;`,
    productId
  );
  try {
    const { rows } = await pool.query(sql);
    console.log(`PRODUCT DELETED`, rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
