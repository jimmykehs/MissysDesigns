const format = require("pg-format");
const { pool, createValueString } = require("../index");
const { getProductById } = require("../Products/productDBFunctions");

async function createOrder(contactInfo, products, userId = null) {
  try {
    const sql = format(
      "INSERT INTO orders(user_id, %s) VALUES(%L, %s) RETURNING *;",
      Object.keys(contactInfo).join(","),
      userId,
      createValueString(contactInfo)
    );
    const {
      rows: [newOrder],
    } = await pool.query(sql, Object.values(contactInfo));

    await addProductsToOrder(newOrder.order_id, products);
  } catch (error) {
    throw error;
  }
}

async function addProductsToOrder(orderId, products) {
  try {
    for (const product of products) {
      const productDetails = await getProductById(product.product_id);
      const { product_id, name, price, image_url } = productDetails;
      const sql = format(
        "INSERT INTO ordered_products(order_id, product_id, name, price, image_url, quantity) VALUES($1,$2,$3,$4,$5,$6);"
      );
      await pool.query(sql, [
        orderId,
        product_id,
        name,
        price,
        image_url,
        product.quantity,
      ]);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { createOrder };
