require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const parentRoutes = require("./src/routes/parentRoutes");
const childRoutes = require("./src/routes/childRoutes");
const vaccineRoutes = require("./src/routes/vaccineRoutes");
const scheduleRoutes = require("./src/routes/scheduleRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/children", childRoutes);
app.use("/api/vaccines", vaccineRoutes);
app.use("/api/schedules", scheduleRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found", status: 404 });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    status: err.status || 500,
  });
});

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
})();
