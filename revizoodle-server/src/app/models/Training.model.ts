/**
 * A Training is one execution of a Quiz by a Learner
 * It stores its progression, provided answers and obtained score.
 */
import {DataTypes, Model, Sequelize} from 'sequelize'
import {Model as RevizoodleModel} from './index'

export default class Training extends Model {
  declare id: number;
  declare learnerUuid: string;
  declare score?: number;
  declare currentQuestion?: number;
  declare answers: string;

  static setup(sequelize: Sequelize): typeof Training {
    return Training.init(
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.BIGINT({length: 11}),
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
        },
        'answers': {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: 'training',
        modelName: 'training',
        sequelize
      });
  }

  static associate(model: typeof RevizoodleModel): void {
    Training.belongsTo(model.Quiz, {foreignKey: 'quizId'});
  }
}