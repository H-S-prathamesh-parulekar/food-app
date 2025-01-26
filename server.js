const express = require("express");
const colours = require("colors"); // Ensure correct spelling of the "colors" package
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

//DB connection
connectDb();

// Middleware
app.use(cors()); // Call cors as a function
app.use(express.json());
app.use(morgan("dev"));

// Route
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food Server Stall</h1>");
});

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restuarantRoutes"));
app.use("/api/v1/category", require("./routes/catgeoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// PORT
const PORT = process.env.PORT;

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgBlue);
});
