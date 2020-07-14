let knexRoutes = require("@/routes/knexUserRoutes");
let newKnexRoutes = require("@/routes/NewKnexRoutes");
let cityKnexRoutes = require("@/routes/CityKnexRoutes");

module.exports = (app) => {
  app.use("/", knexRoutes);
  app.use("/v1/", cityKnexRoutes);
  app.use("/myApi/", newKnexRoutes); //SignUp..SignIn..SignOut
};
