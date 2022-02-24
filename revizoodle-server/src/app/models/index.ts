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
 * ORM (Sequelize) configuration
 *
 * it exposes the `db` object defining the server entities and theirs
 * relationships
 */
import Course from "./Course.model"
import Quiz from "./Quiz.model"
import Training from "./Training.model"
import CourseRegistration from "./CourseRegistration.model"
import CourseQuiz from "./CourseQuiz.model"

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  define: {
    charset: 'utf8mb4',
    freezeTableName: true
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Load entities
export const Model = {
  Quiz: Quiz.setup(sequelize),
  Course: Course.setup(sequelize),
  CourseQuiz: CourseQuiz.setup(sequelize),
  CourseRegistration: CourseRegistration.setup(sequelize),
  Training: Training.setup(sequelize),
}

// Setup relationships
Course.associate(Model);
Quiz.associate(Model);
Training.associate(Model);
CourseRegistration.associate(Model);