const routes = require("express").Router();

const userRoutes = require("./routes/user.routes");

routes.use("/user", userRoutes);

module.exports = routes;