/**
 * A course is a collection of quizzes, owned by a teacher, on which learners
 * may register
 */
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('course',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.BIGINT(11),
        },
        'teacherUuid': {
          type: Sequelize.Sequelize.STRING(40),
          allowNull: false,
        },

        'name': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
  );
};