const { createSetString, pool } = require("./index");

async function createUser(user) {
  const client = await pool.connect();
  const userKeys = Object.keys(user).join(",");
  console.log(userKeys);
  const userValues = Object.values(user);
  console.log(userValues);
  try {
    const { rows } = await client.query(
      `
        INSERT INTO users(${userKeys})
        VALUES (${createSetString(user)})
        RETURNING *;
    `,
      userValues
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createUser,
};
