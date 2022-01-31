const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const usersRouter = require("./api/Users/users.js");
const jwt = require("jsonwebtoken");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
// app.use("/products", productsRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log("App is up!");
});
