/**
 * ORM (Sequelize) configuration
 *
 * it exposes the `db` object defining the server entities and theirs
 * relationships
 */
import * as CourseModel from "./Course.model"

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
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

// Load entities
export const Model = {
  Quiz: require("./Quiz.model")(sequelize),
  Course: CourseModel.init(sequelize),
  CourseQuiz: require("./CourseQuiz.model")(sequelize),
  CourseRegistration: require("./CourseRegistration.model")(sequelize),
  Training: require("./Training.model")(sequelize),
}

// Setup relationships
CourseModel.associate(Model)
Model.Training.associate(Model);
Model.Quiz.associate(Model);
Model.CourseRegistration.associate(Model);

export const Quiz = Model.Quiz
export const Course = Model.Course
export const CourseQuiz = Model.CourseQuiz
export const CourseRegistration = Model.CourseRegistration
export const Training = Model.Training