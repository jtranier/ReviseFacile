/**
 * ORM (Sequelize) configuration
 *
 * it exposes the `db` object defining the server entities and theirs
 * relationships
 */
import Course from "./Course.model"
import Quiz from "./Quiz.model"
import Training from "./Training.model"
import CourseRegistration from "./CourseRegistration.model"
import CourseQuiz from "./CourseQuiz.model"

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
  Quiz: Quiz.setup(sequelize),
  Course: Course.setup(sequelize),
  CourseQuiz: CourseQuiz.setup(sequelize),
  CourseRegistration: CourseRegistration.setup(sequelize),
  Training: Training.setup(sequelize),
}

// Setup relationships
Course.associate(Model);
Quiz.associate(Model);
Training.associate(Model);
CourseRegistration.associate(Model);