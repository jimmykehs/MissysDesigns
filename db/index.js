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

module.exports = {
  createSetString,
  pool,
};
