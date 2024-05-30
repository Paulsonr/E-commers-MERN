require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./routes/auth.route");
const ProductRoute = require("./routes/products.route");
const CartRoute = require("./routes/cart.route");
const app = express();
const PORT = 4000;

//middleware
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/auth", AuthRoute);
app.use("/api/products", ProductRoute);
app.use("/api/cart", CartRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>home page</h1>");
});

// databse connection
mongoose
  .connect("mongodb+srv://paulsonr07:root123@cluster0.owhlbiu.mongodb.net/")
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((err) => console.log(err));
