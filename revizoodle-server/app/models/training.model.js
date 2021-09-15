/**
 * Model to store trainings (learner answers to a quiz)
 */
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('training',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.BIGINT(11),
        },
        'learner_uuid': {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        score: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
        'answers': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      });
};