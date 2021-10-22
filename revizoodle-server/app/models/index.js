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
db.moodleQuiz = require("./moodleQuiz.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.course_moodleQuiz = require("./course_moodleQuiz.model")(sequelize, Sequelize);
db.course_registration = require("./course_registration")(sequelize, Sequelize);
db.training = require("./training.model")(sequelize, Sequelize);

db.course.belongsToMany(db.moodleQuiz, {through: db.course_moodleQuiz});
// TODO hasMany

db.moodleQuiz.belongsToMany(db.course, {through: db.course_moodleQuiz});
// TODO hasMany


db.course_registration.belongsTo(db.course, {foreignKey: 'courseId'});
db.course.hasMany(db.course_registration, {foreignKey: 'courseId'});

db.training.belongsTo(db.moodleQuiz, { foreignKey: 'quizId' });
db.moodleQuiz.hasMany(db.training, { foreignKey: 'quizId' });


module.exports = db;