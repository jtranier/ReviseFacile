module.exports = (sequelize, Sequelize) => {
  return sequelize.define('course_registration',
      {
        'learner_uuid': {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
  );
};