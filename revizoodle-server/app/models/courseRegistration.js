module.exports = (sequelize, Sequelize) => {
  return sequelize.define('courseRegistration',
      {
        'learnerUuid': {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
  );
};