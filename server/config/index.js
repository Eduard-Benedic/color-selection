// require("dotenv").config();

process.env.DB_USERNAME = -;
process.env.DB_PASSWORD = -;
process.env.DB_NAME = -;
process.env.JWT_SECRET = -;
module.exports = {
  getDbConnectionString: function () {
    // return `mongodb+srv://${config.username}:${config.password}@cluster0-snmef.mongodb.net/clarifai-colors`;
    return `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-snmef.mongodb.net/${process.env.DB_NAME}`;
  },
};
