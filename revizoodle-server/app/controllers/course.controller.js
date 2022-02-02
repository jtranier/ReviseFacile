/*
 * Copyright [name of the author when individual or of the
 * legal entity when the software has been created under wage-earning status
 * adding underneath, if so required :" contributor(s) : [name of the
 * individuals] ([date of creation])
 *
 * [e-mail of the author(s)]
 *
 * This software is a computer program whose purpose is to [describe
 * functionalities and technical features of your software].
 *
 * This software is governed by the [CeCILL|CeCILL-B|CeCILL-C] license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the [CeCILL|CeCILL-B|CeCILL-C]
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

const db = require('../models');
const authenticationService = require('../services/AuthenticationService');

const Course = db.course;
const Quiz = db.quiz;
const CourseQuiz = db.courseQuiz;
const CourseRegistration = db.courseRegistration;

exports.get = (req, res) => {
  const id = req.params.id || -1;

  Course.findOne({
    where: {id},
    include: {
      model: Quiz,
      order: [['updatedAt', 'desc']],
    },
  }).then(data => {
    if (!data) {
      res.status(404).json({
        error: {
          message: `There is no course with id ${id}`,
        },
      });
    } else {
      res.json({
        id: data.id,
        name: data.name,
        updateAt: data.updateAt,
        quizList: data.quizzes.map(quiz => {

          return {
            id: quiz.id,
            name: quiz.name,
            updatedAt: quiz['courseQuiz'].updatedAt,
            nbQuestions: JSON.parse(quiz.questions).length,
          };
        }),
      });
    }
  }).catch(error => {
    console.error(error);
    res.status(500).json({error});
  });

};

exports.list = (req, res) => {

  Course.findAll({
    raw: true,
    order: [
      ['updatedAt', 'DESC'],
    ],
    where: {
      'teacherUuid': authenticationService.getUUID(req),
    },
  }).then(data => {
    res.json(data);
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};

exports.create = (req, res) => {

  Course.create({
    name: req.body.name, // TODO check validity
    teacherUuid: authenticationService.getUUID(req),
  }).then(course => {
    res.json(course['dataValues']);
  }).catch(error => {
    res.status(500).json(error);
  });

};

exports.addQuiz = (req, res) => {
  const courseId = req.params.courseId;
  const quizId = req.body.quizId;

  CourseQuiz.create({
    courseId: courseId,
    quizId: quizId,
  }).then(() => {
    res.json({
      success: true,
    });
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });

};

exports.register = (req, res) => {
  const courseId = req.params.courseId || -1;
  const learnerUuid = authenticationService.getUUID(req);

  Course.findByPk(courseId, {
    include: {
      model: CourseRegistration,
      where: {
        'learnerUuid': learnerUuid,
      },
      required: false,
    },
  }).then(course => {
    if (course === null) {
      res.status(404).
          json({error: {message: `There is no course with id ${courseId}`}});
    } else if (course['courseRegistrations'].length > 0) {
      res.json({success: true}); // Already registered

    } else {
      CourseRegistration.create({
        'learnerUuid': learnerUuid,
        courseId: courseId,
      }).then(() => {
        res.json({success: true});
      }).catch(error => {
        console.error(error);
        res.status(500).json(error);
      });

    }
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });

};