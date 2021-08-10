const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    freezeTableName: true
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.question = require("./question.model.js")(sequelize, Sequelize);
db.questionnaire = require("./questionnaire.model.js")(sequelize, Sequelize);
db.questionnaire_question = require("./questionnaire_question.model.js")(sequelize, Sequelize);
db.diffusion = require("./diffusion.model.js")(sequelize, Sequelize);
db.diffusion_question = require("./diffusion_question.model.js")(sequelize, Sequelize);
db.reponse = require("./reponse.model.js")(sequelize, Sequelize);
db.reponses_questionnaire = require("./reponses_questionnaire.model.js")(sequelize, Sequelize);

module.exports = db;