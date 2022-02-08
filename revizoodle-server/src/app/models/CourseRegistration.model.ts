/**
 * Course <=> Learner association
 * It stores the list of learners registered to a course
 */
import {DataTypes, Model} from 'sequelize'
import {Model as RevizoodleModel} from './index'

export default class CourseRegistration extends Model {
  declare learnerUuid: string;

  static setup(sequelize): typeof CourseRegistration {
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