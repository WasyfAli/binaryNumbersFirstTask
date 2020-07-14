let knexRoutes = require("@/routes/knexUserRoutes");
let newKnexRoutes = require("@/routes/NewKnexRoutes");

module.exports = (app) => {
  app.use("/", knexRoutes);
  app.use("/myApi/", newKnexRoutes); //SignUp..SignIn..SignOut
};
