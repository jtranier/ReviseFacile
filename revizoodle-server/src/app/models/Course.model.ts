/**
 * A course is a collection of quizzes, owned by a teacher, on which learners
 * may register
 */
import {CreationOptional, DataTypes, Model, Sequelize} from 'sequelize'
import {Model as RevizoodleModel} from './index'
import CourseRegistration from "./CourseRegistration.model"
import Quiz from "./Quiz.model"

export default class Course extends Model {
  declare id: number;
  declare teacherUuid: string;
  declare name: string;
  declare courseRegistrations: CourseRegistration[];
  declare quizzes: Quiz[];
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static setup(sequelize: Sequelize): typeof Course {
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