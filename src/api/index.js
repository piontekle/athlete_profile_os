module.exports = {
  init(app){
    const profileRoutes = require("./profile/profile.routes");

    app.use(profileRoutes);
  }
}
