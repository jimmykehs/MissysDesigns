const { Pool } = require("pg");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/missys_designs";
const pool = new Pool({ connectionString });

function createSetString(queryObject) {
  const setString = Object.keys(queryObject)
    .map((key, index) => `${key}=$${index + 1}`)
    .join(", ");
  console.log(setString);
  return setString;
}

function createValueString(queryObject) {
  const valueString = Object.keys(queryObject)
    .map((key, index) => `$${index + 1}`)
    .join(", ");
  return valueString;
}

module.exports = {
  createSetString,
  createValueString,
  pool,
};
