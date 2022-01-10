/**
 * Model to store Quiz
 */
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('quiz',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.BIGINT(11),
        },
        teacherUuid: {
          type: Sequelize.Sequelize.STRING(40),
          allowNull: false,
        },

        name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        nbQuestions: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        questions: {
          type: Sequelize.TEXT('medium'), // JSON up to 16 Mb (for base64 images)
          allowNull: false,
        },
      });
};