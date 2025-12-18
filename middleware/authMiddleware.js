const jwt = require("jsonwebtoken");

const SECRET_KEY = "myStaticSecretKey";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // 👈 FIX

  if (!token) {
    return res.status(401).json({ message: "Access Denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // optional but useful
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateToken;
