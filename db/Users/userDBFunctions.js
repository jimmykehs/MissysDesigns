const { pool } = require("../index.js");
const format = require("pg-format");
const { createSetString, createValueString } = require("../index.js");
const {
  createCart,
  getUserCartProducts,
} = require("../Cart/cartDBFunctions.js");

async function createUser(user) {
  try {
    const sql = format(
      "INSERT INTO users(%s) VALUES(%s) RETURNING *;",
      Object.keys(user).join(","),
      createValueString(user)
    );
    const {
      rows: [newUser],
    } = await pool.query(sql, Object.values(user));
    newUser.cart = await createCart(newUser.user_id);
    console.log("NEW USER CREATED: ", newUser);
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  const sql = format(`SELECT * FROM users WHERE user_id = %L`, userId);
  try {
    const {
      rows: [user],
    } = await pool.query(sql);
    if (user) {
      user.cart = await getUserCartProducts(userId);
      console.log(user);
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function updateUser(updateData, userId) {
  const sql = format(
    `UPDATE users SET %s WHERE user_id = %s RETURNING *;`,
    createSetString(updateData),
    userId
  );
  try {
    const { rows } = await pool.query(sql, Object.values(updateData));
    delete rows[0].password;
    console.log("USER UPDATED", rows);
    return rows;
  } catch (error) {}
}

async function deleteUser(userId) {
  const sql = format(
    `DELETE FROM users WHERE user_id = %s RETURNING *;`,
    userId
  );
  try {
    const { rows } = await pool.query(sql);
    console.log(`USER DELETED`, rows);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    pool.release();
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
