const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");

const fnConnectionDB = require("./connection/connectionDB");

const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api", productRoutes);
app.use("/cart", cartRoutes);
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);

// server
app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started Successfully on port 8000");
});

fnConnectionDB();

app.get("/", (req, res) => {
  res.send("Hello, World !");
});
