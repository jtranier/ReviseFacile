/**
 * Model to store Moodle Quiz
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
          type: Sequelize.TEXT,
          allowNull: false,
        },

        'name': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      // {
      //   timestamps: false,
      // }
      );
};