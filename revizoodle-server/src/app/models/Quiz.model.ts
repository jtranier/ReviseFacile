/*
 * Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
 *
 * contributor(s) :
 * - Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
 * - John Tranier (john.tranier@ticetime.com)
 *
 * This software is governed by the CeCILL-B license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the CeCILL-B
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-B license and that you accept its terms.
 */

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