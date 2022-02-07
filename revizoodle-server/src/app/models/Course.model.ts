/**
 * A course is a collection of quizzes, owned by a teacher, on which learners
 * may register
 */
import {DataTypes} from 'sequelize'

module.exports = (sequelize) => {
  const Course = sequelize.define('course',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT({length: 11}),
      },
      'teacherUuid': {
        type: DataTypes.STRING(40),
        allowNull: false,
      },

      'name': {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
  );

  Course.associate = function (models) {
    Course.hasMany(models.CourseRegistration, {foreignKey: 'courseId'});
    Course.belongsToMany(models.Quiz, {through: models.CourseQuiz}); // TODO hasMany

  }

  return Course;
};