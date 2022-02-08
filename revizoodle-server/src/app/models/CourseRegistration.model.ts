/**
 * Course <=> Learner association
 * It stores the list of learners registered to a course
 */
import {CreationOptional, DataTypes, Model, Sequelize} from 'sequelize'
import {Model as RevizoodleModel} from './index'
import Course from "./Course.model"

export default class CourseRegistration extends Model {
  declare learnerUuid: string;
  declare courseId: number;
  declare course: Course;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static setup(sequelize: Sequelize): typeof CourseRegistration {
    return CourseRegistration.init({
        'learnerUuid': {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
    },
      {
        tableName: 'courseRegistration',
        modelName: 'courseRegistration',
        sequelize
    })
  }

  static associate(model: typeof RevizoodleModel): void {
    CourseRegistration.belongsTo(model.Course, {foreignKey: 'courseId'});
  }
}