const { createUser } = require("./Users/create.js");
const { pool } = require("./index.js");
const { seedUsers, seedProducts } = require("./seedData");

async function dropTables(client) {
  try {
    await client.query(`
        DROP TABLE IF EXISTS ordered_products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
    `);
    console.log("Tables Dropped!");
  } catch (err) {
    console.log(err);
  }
}

async function buildTables(client) {
  try {
    await client.query(`
        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(500) NOT NULL,
            address VARCHAR(255),
            city VARCHAR(50),
            state VARCHAR(2),
            zip VARCHAR(5)
        );
        CREATE TABLE products(
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price NUMERIC(2) NOT NULL,
            active BOOLEAN DEFAULT TRUE,
            image_url VARCHAR(255)
        );
        CREATE TABLE carts(
            cart_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE
        );
        CREATE TABLE cart_products(
            cart_id INTEGER REFERENCES carts(cart_id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE
        );
        CREATE TABLE orders(
            order_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
        );
        CREATE TABLE ordered_products(
            product_id INTEGER REFERENCES products(product_id),
            order_id INTEGER REFERENCES orders(order_id),
            name VARCHAR(255) NOT NULL,
            price NUMERIC(2) NOT NULL,
            image_url VARCHAR(255)
        );
      `);
    console.log("Tables Built!");
  } catch (err) {
    console.log(err);
  }
}

async function seedData() {
  try {
    await Promise.all(seedUsers.map(createUser));
  } catch (err) {
    console.log(err);
  }
}

async function seedDB() {
  const client = await pool.connect();
  try {
    await dropTables(client);
    await buildTables(client);
    await seedData(client);
  } catch (error) {
  } finally {
    client.release();
  }
}

seedDB();
