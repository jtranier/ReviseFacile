/**
 * A Training is one execution of a Quiz by a Learner
 * It stores its progression, provided answers and obtained score.
 */
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('training',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.BIGINT(11),
        },
        'learnerUuid': {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        score: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
        currentQuestion: { // null if the training is not started
          type: Sequelize.TINYINT,
          allowNull: true,
          default: null,
        },
        'answers': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      });
};