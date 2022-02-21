const jwt = require("jsonwebtoken");

async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401);
      next({ message: "Invalid Headers" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      next({ message: "Invalid Credentials" });
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user) {
      res.status(401);
      next({ message: "Invalid Credentials" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkForUser(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader === undefined) {
      next({ message: "Invalid Headers" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      next({ message: "Invalid Credentials" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        next({ message: "Invalid Credentials" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next();
  }
}

function generateAccessToken(user) {
  return jwt.sign({ id: user.user_id }, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
  authenticateUser,
  checkForUser,
  generateAccessToken,
};
