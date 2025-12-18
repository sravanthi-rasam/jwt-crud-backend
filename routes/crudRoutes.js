const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();
let data = [];

router.post("/", authenticateToken, (req, res) => {
  data.push(req.body);
  res.json({ message: "Data created", data: data });
});

router.get("/", authenticateToken, (req, res) => {
  res.json(data);
});

router.put("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  data[id] = req.body;
  res.json({ message: "Data updated", data: data });
});

router.delete("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  data.splice(id, 1);
  res.json({ message: "Data deleted", data: data });
});

module.exports = router;
