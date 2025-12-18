const express = require("express");
const authRoutes = require("./routes/authRoutes");
const crudRoutes = require("./routes/crudRoutes");

const app = express();

// ✅ Correct JSON middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/data", crudRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    endpoints: {
      login: "POST /api/auth/login",
      items: "GET/POST/PUT/DELETE /api/data (Protected)"
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
