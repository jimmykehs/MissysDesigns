const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./api/utils.js");
const apiRouter = require("./api/index.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ id: user.id });
    res.send({ accessToken });
  });
});

app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log("App is up!");
});
