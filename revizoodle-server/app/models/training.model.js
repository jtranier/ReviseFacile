/**
 * A Training is one execution of a Quiz by a Learner
 * It stores its progression, provided answers and obtained score.
 */
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('training',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.BIGINT(11),
        },
        'learnerUuid': {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        score: {
          type: DataTypes.TINYINT,
          allowNull: true,
        },
        currentQuestion: { // null if the training is not started
          type: DataTypes.TINYINT,
          allowNull: true,
          default: null,
        },
        'answers': {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      });
};