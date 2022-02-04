/**
 * A Quiz is a list of Questions
 * The questions are specified by a JSON array of objects
 */
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Quiz = sequelize.define('quiz',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.BIGINT(11),
        },
        teacherUuid: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },

        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        nbQuestions: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        questions: {
          type: DataTypes.TEXT('medium'), // JSON up to 16 Mb (for base64 images)
          allowNull: false,
        },
      });

  Quiz.associate = function(models) {
    Quiz.belongsToMany(models.Course, {through: models.CourseQuiz}); // TODO hasMany
    Quiz.hasMany(models.Training, { foreignKey: 'quizId' });
  }

  return Quiz;
};