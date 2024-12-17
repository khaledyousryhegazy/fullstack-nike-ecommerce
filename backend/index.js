const express = require("express");
const path = require("path");
const app = express();
const fnConnectionDB = require("./connection/connectionDB");
const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const usersRoutes = require("./routes/users.routes");
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", productRoutes);
app.use("/cart", cartRoutes);
app.use("/users", usersRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started Successfully on port 8000");
});

fnConnectionDB();

app.get("/", (req, res) => {
  res.send("Hello, World !");
});
