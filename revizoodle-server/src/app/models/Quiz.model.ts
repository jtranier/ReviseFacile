/**
 * A Quiz is a list of Questions
 * The questions are specified by a JSON array of objects
 */
import {CreationOptional, DataTypes, Model, Sequelize} from 'sequelize'
import {Model as RevizoodleModel} from './index'
import Training from "./Training.model"

export default class Quiz extends Model {
  declare id?: number
  declare teacherUuid: string;
  declare name: string;
  declare nbQuestions: number;
  declare questions: string;
  declare courseQuiz: Quiz;
  declare trainings: Training[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;


  static setup(sequelize: Sequelize): typeof Quiz {
    return Quiz.init({
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.BIGINT({length: 11}),
        },
        teacherUuid: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },

        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        nbQuestions: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        questions: {
          // TODO : Experiment with DataTypes.JSON
          type: DataTypes.TEXT({length: 'medium'}), // JSON up to 16 Mb (for base64 images)
          allowNull: false,
        },
      },
      {
        tableName: 'quiz',
        modelName: 'quiz',
        sequelize
      })
  }

  static associate(model: typeof RevizoodleModel): void {
    Quiz.belongsToMany(model.Course, {through: model.CourseQuiz});
    Quiz.hasMany(model.Training, {foreignKey: 'quizId'});
  }
}