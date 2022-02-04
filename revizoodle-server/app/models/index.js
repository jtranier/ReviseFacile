/**
 * ORM (Sequelize) configuration
 *
 * it exposes the `db` object defining the server entities and theirs
 * relationships
 */
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    charset: 'utf8mb4',
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

db.sequelize = sequelize;

// Load entities
db.Quiz = require("./quiz.model.js")(sequelize);
db.Course = require("./course.model.js")(sequelize);
db.CourseQuiz = require("./courseQuiz.model")(sequelize);
db.CourseRegistration = require("./courseRegistration.model")(sequelize);
db.Training = require("./training.model")(sequelize);

// Setup relationships
db.Course.associate(db)
db.Training.associate(db);
db.Quiz.associate(db);
db.CourseRegistration.associate(db);

module.exports = db;