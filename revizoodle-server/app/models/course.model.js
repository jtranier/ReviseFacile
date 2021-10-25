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