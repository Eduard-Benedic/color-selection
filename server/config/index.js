// require("dotenv").config();

process.env.DB_USERNAME = "eduard";
process.env.DB_PASSWORD = "3dLIaPIdB3n3d1c";
process.env.DB_NAME = "clarifai-colors";
process.env.JWT_SECRET = "keepitsecret";
module.exports = {
  getDbConnectionString: function () {
    // return `mongodb+srv://${config.username}:${config.password}@cluster0-snmef.mongodb.net/clarifai-colors`;
    return `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-snmef.mongodb.net/${process.env.DB_NAME}`;
  },
};
