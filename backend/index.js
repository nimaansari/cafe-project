const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./models/database");

const app = express();

app.use(cors());


app.use(express.json());

app.use("/api/v1/menu", require("./routes/menuRoutes"));
app.use("/api/v1/orders", require("./routes/orderRoutes"));

const PORT = process.env.PORT;

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    });
}).catch(error => {
    console.error("Database connection failed:", error);
});