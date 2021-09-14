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

// Entities
db.question = require("./question.model.js")(sequelize, Sequelize);
db.questionnaire = require("./questionnaire.model.js")(sequelize, Sequelize);
db.questionnaire_question = require("./questionnaire_question.model.js")(sequelize, Sequelize);
db.diffusion = require("./diffusion.model.js")(sequelize, Sequelize);
db.diffusion_question = require("./diffusion_question.model.js")(sequelize, Sequelize);
db.reponse = require("./reponse.model.js")(sequelize, Sequelize);
db.reponses_questionnaire = require("./reponses_questionnaire.model.js")(sequelize, Sequelize);

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

db.training.belongsTo(db.moodleQuiz, { foreignKey: 'quizId' });
db.moodleQuiz.hasMany(db.training, { foreignKey: 'quizId' });

// Relations
db.questionnaire.belongsToMany(
    db.question,
    {
      through: 'questionnaire_question',
      foreignKey: 'questionnaire_id',
    }
);
db.question.belongsToMany(
    db.questionnaire,
    {
      through: 'questionnaire_question',
      foreignKey: 'question_id',
    }
);

module.exports = db;