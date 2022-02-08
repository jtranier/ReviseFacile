/**
 * Course <=> Quiz association
 */
import {Model, Sequelize} from "sequelize"

export default class CourseQuiz extends Model {

 static setup(sequelize: Sequelize): typeof CourseQuiz {
   return CourseQuiz.init({}, {
     tableName: 'courseQuiz',
     modelName: 'courseQuiz',
     sequelize
   })
 }
}