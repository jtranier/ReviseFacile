/**
 * Model to store Moodle Quiz
 */
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('moodleQuiz',
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT(11),
        },
        'teacherId': {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        'name': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'questionsSpecification': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      });
};