/**
 * A course is a collection of quizzes, owned by a teacher, on which learners
 * may register
 */
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('course',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.BIGINT(11),
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
};