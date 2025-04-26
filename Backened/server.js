const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");

// config dot env file
dotenv.config();

// connect to database
connectDb();

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// CORS configuration allowing all origins
const corsOptions = {
  origin: "*",  // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
  credentials: true,  // Allow cookies if needed
};

app.use(cors(corsOptions));

// API routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transaction", require("./routes/transactionRoute"));

// root route
app.get("/", (req, res) => {
  res.send("Welcome to the app!");
});

// port
const PORT = process.env.PORT || 8080;

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.green.bold);
});
