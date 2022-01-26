const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log("App is up!");
});
