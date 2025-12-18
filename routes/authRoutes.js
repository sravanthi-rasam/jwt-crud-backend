const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET_KEY = "myStaticSecretKey";

const user = {
  username: "admin",
  password: "admin123"
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username: username }, SECRET_KEY);
    res.json({ message: "Login successful", token: token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
