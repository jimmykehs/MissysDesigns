const { pool } = require("../index.js");
const format = require("pg-format");
const { createSetString } = require("../index.js");
const { getUserCart } = require("../Cart/cartDBFunctions.js");

async function getUserById(userId) {
  const client = await pool.connect();
  const sql = format(`SELECT * FROM users WHERE user_id = %L`, userId);
  try {
    const {
      rows: [user],
    } = await client.query(sql);
    if (user) {
      user.cart = await getUserCart(userId);
      console.log(user);
      return user;
    }
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function updateUser(updateData, userId) {
  const client = await pool.connect();
  const sql = format(
    `UPDATE users SET %s WHERE user_id = %s RETURNING *;`,
    createSetString(updateData),
    userId
  );
  try {
    const { rows } = await client.query(sql, Object.values(updateData));
    delete rows[0].password;
    console.log("USER UPDATED", rows);
    return rows;
  } catch (error) {
  } finally {
    client.release();
  }
}

async function deleteUser(userId) {
  const client = await pool.connect();
  const sql = format(
    `DELETE FROM users WHERE user_id = %s RETURNING *;`,
    userId
  );
  try {
    const { rows } = await client.query(sql);
    console.log(`USER DELETED`, rows);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
