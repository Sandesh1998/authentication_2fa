const express = require("express");
const app = express();
const morgan = require("morgan");

require("dotenv").config();
require("./config/dbConfig");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// Routes
const routers = require("./main.route");
app.use("/2fa/api", routers);

const port = process.env.Port || 5000;
if (process.env.NODE_ENV !== "test")
  app.listen(port, () => console.log(`Node server started at port ${port}`));

module.exports = { app };