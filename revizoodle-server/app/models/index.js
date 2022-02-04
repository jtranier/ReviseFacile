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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Entities
db.quiz = require("./quiz.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.courseQuiz = require("./courseQuiz.model")(sequelize, Sequelize);
db.courseRegistration = require("./courseRegistration")(sequelize, Sequelize);
db.training = require("./training.model")(sequelize, Sequelize);

db.course.belongsToMany(db.quiz, {through: db.courseQuiz});
// TODO hasMany

db.quiz.belongsToMany(db.course, {through: db.courseQuiz});
// TODO hasMany


db.courseRegistration.belongsTo(db.course, {foreignKey: 'courseId'});
db.course.hasMany(db.courseRegistration, {foreignKey: 'courseId'});

db.training.belongsTo(db.quiz, { foreignKey: 'quizId' });
db.quiz.hasMany(db.training, { foreignKey: 'quizId' });


module.exports = db;