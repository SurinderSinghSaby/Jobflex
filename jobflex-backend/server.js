const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path"); // For resolving file paths
const HttpError = require("./errors/http-error");

const app = express();

// Importing routes
const jobRoutes = require("./routes/job-route");
const userRoutes = require("./routes/user-route");

// Parse incoming JSON requests
app.use(bodyParser.json());

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all domains
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Allow these headers
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // Allow these methods
  next();
});

// API Routes
app.use("/api/jobs", jobRoutes); // => /api/jobs
app.use("/api/user", userRoutes); // => /api/users

// Serve React static files
const buildPath = path.join(__dirname,"frontend", "build"); // Adjust the folder path if needed
app.use(express.static(buildPath));

// Catch-all route for serving React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(buildPath, "index.html"));
});

// Error handling
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// Connect to MongoDB and start the server
mongoose
  .connect(
    "mongodb+srv://developer:surinder@cluster0.guf8k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running on port", process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
