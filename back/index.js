require('dotenv').config();
const express = require("express");
const app = express();
const chat_routes = require('./routes/chat.js')
const meal_routes = require('./routes/meal.js')

app.listen(5555);
app.use(express.json());

app.use("/api/chat", chat_routes);
app.use("/api/meal", meal_routes);
app.use("*", (req, res) => {
  res.status(404).json("mauvaise routes");
});

