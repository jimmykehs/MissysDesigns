const { getOrderById } = require("../db/Orders/orderDBFunctions");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOrderConfirmationEmail(orderId) {
  const order = await getOrderById(orderId);
  const { orderDetails, orderProducts } = order;
  function createProductHTML() {
    let productHTML = "";
    orderProducts.forEach((product) => {
      productHTML += `<p>${product.name} - ${product.price}</p>`;
    });
    return productHTML;
  }
  const msg = {
    to: orderDetails.email,
    from: "Missys Designs <missysdesigns71177@gmail.com>",
    subject: `Confirmation for Order #${orderDetails.order_id}`,
    html: `<h1>Thank you for choosing Missys Designs!</h1>
      <p>Here is a summary of you order:</p>
      ${createProductHTML()}
      <p>You can check the status of you order by using the following link: <a href="https://www.localhost:3000/orders/${
        orderDetails.order_id
      }">localhost:3000/orders/${orderDetails.order_id}</a></p>
      `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("EMAIL SENT");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { sendOrderConfirmationEmail };
