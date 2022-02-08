/**
 * Course <=> Quiz association
 */
import {Model} from "sequelize"

export default class CourseQuiz extends Model {
 static setup(sequelize): typeof CourseQuiz {
   return CourseQuiz.init({}, {
     tableName: 'courseQuiz',
     modelName: 'courseQuiz',
     sequelize
   })
 }
}