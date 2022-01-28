const { pool } = require("../index.js");
const format = require("pg-format");
const { createSetString } = require("../index.js");

async function updateProduct(updateData, productId) {
  const client = await pool.connect();
  const sql = format(
    `UPDATE users SET %s WHERE user_id = %s RETURNING *;`,
    createSetString(updateData),
    productId
  );
  try {
    const { rows } = await client.query(sql, Object.values(updateData));
    console.log("PRODUCT UPDATED", rows);
    return rows;
  } catch (error) {
  } finally {
    client.release();
  }
}

async function deleteProduct(productId) {
  const client = await pool.connect();
  const sql = format(
    `DELETE FROM users WHERE user_id = %s RETURNING *;`,
    productId
  );
  try {
    const { rows } = await client.query(sql);
    console.log(`PRODUCT DELETED`, rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  updateProduct,
  deleteProduct,
};
