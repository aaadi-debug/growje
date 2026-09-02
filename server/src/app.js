const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes import
const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");
const serviceRoutes = require("./routes/service.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);


const multer = require("multer");

app.use((err, req, res, next) => {
  console.error("=== UPLOAD / GLOBAL ERROR ===");
  console.error(err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Cloudinary errors often have http_code
  const status = err.http_code || err.status || 500;

  return res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
    // optional: name: err.name
  });
});

module.exports = app;