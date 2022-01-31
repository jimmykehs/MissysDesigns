const { pool } = require("./index.js");
const { seedUsers, seedProducts } = require("./seedData");
const { createUser } = require("./Users/userDBFunctions.js");
const { createProduct } = require("./Products/productDBFunctions.js");

async function dropTables(client) {
  try {
    await client.query(`
        DROP TABLE IF EXISTS ordered_products CASCADE;
        DROP TABLE IF EXISTS orders CASCADE;
        DROP TABLE IF EXISTS cart_products CASCADE;
        DROP TABLE IF EXISTS carts CASCADE;
        DROP TABLE IF EXISTS products CASCADE;
        DROP TABLE IF EXISTS users CASCADE;
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
            price NUMERIC(5,2) NOT NULL,
            active BOOLEAN DEFAULT TRUE,
            image_url VARCHAR(255)
        );
        CREATE TABLE carts(
            cart_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
            UNIQUE (cart_id, user_id)
        );
        CREATE TABLE cart_products(
            cart_id INTEGER REFERENCES carts(cart_id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL DEFAULT 1,
            UNIQUE (cart_id, product_id)
        );
        CREATE TABLE orders(
            order_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
            email VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(50) NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(5) NOT NULL,
            status VARCHAR(255) DEFAULT 'Processing'
        );
        CREATE TABLE ordered_products(
          order_id INTEGER REFERENCES orders(order_id),
            product_id INTEGER REFERENCES products(product_id),
            quantity INTEGER NOT NULL,
            name VARCHAR(255) NOT NULL,
            price NUMERIC(5,2) NOT NULL,
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
    await Promise.all(seedProducts.map(createProduct));
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
