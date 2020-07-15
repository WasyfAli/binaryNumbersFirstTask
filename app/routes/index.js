let knexRoutes = require("@/routes/knexUserRoutes");
let newKnexRoutes = require("@/routes/NewKnexRoutes");
let cityKnexRoutes = require("@/routes/CityKnexRoutes");
let designationRoutes = require("@/routes/DesignationRoutes");
let requestRoutes = require("@/routes/RequestRoutes");
module.exports = (app) => {
  app.use("/", knexRoutes);
  app.use("/v1/", cityKnexRoutes);
  app.use("/myApi/", newKnexRoutes); //SignUp..SignIn..SignOut
  app.use("/v1/", designationRoutes);
  app.use("/v1/", requestRoutes);
};
