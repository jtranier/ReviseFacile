/**
 * Course <=> Learner association
 * It stores the list of learners registered to a course
 */
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