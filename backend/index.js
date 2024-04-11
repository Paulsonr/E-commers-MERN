const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRoute = require("./routes/auth.route");
const ProductRoute = require("./routes/products.route");
const CartRoute = require("./routes/cart.route");
const app = express();
const PORT = 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/auth", AuthRoute);
app.use("/api/products", ProductRoute);
// app.use("/api/cart", CartRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>home page</h1>");
});

// databse connection
mongoose
  .connect("mongodb+srv://paulsonr07:mern123@cluster0.owhlbiu.mongodb.net/")
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((err) => console.log(err));
