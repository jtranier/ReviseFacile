/**
 * A course is a collection of quizzes, owned by a teacher, on which learners
 * may register
 */
import {DataTypes, Model} from 'sequelize'
import {Model as RevizoodleModel} from './index'

export default class Course extends Model {
  declare id: number;
  declare teacherUuid: string;
  declare name: string;

  static setup(sequelize): typeof Course {
    return Course.init({
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.BIGINT({length: 11}),
        },
        'teacherUuid': {
          type: DataTypes.STRING(40),
          allowNull: false,
        },

        'name': {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: 'course',
        modelName: 'course',
        sequelize,
      })
  }

  static associate(model: typeof RevizoodleModel): void {
    Course.hasMany(model.CourseRegistration, {foreignKey: 'courseId'});
    Course.belongsToMany(model.Quiz, {through: model.CourseQuiz}); // TODO hasMany
  }

}