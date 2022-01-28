const { createValueString, pool } = require("../index");
const format = require("pg-format");

async function insertQuery(tableName, item) {
  const client = await pool.connect();
  const sql = format(
    "INSERT INTO %I(%s) VALUES(%s) RETURNING *",
    tableName,
    Object.keys(item).join(","),
    createValueString(item)
  );

  try {
    const { rows } = await client.query(sql, Object.values(item));
    console.log(`${tableName.toUpperCase()} CREATED`, rows);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function selectAllQuery(tableName) {
  const client = await pool.connect();
  const sql = format(`SELECT * FROM %I`, tableName);
  try {
    const { rows } = await client.query(sql);
    console.log(`ALL ${tableName}`, rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertQuery,
  selectAllQuery,
};
