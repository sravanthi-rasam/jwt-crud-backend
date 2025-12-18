const express = require("express");
const path = require("path");          // 🔥 ADD THIS
const authRoutes = require("./routes/authRoutes");
const crudRoutes = require("./routes/crudRoutes");

const app = express();

// JSON middleware
app.use(express.json());

// 🔥 SERVE FRONTEND FILES
app.use(express.static(path.join(__dirname, "frontend")));

// APIs
app.use("/api/auth", authRoutes);
app.use("/api/data", crudRoutes);

// Optional home route
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
